import { useEffect, useRef, type FocusEvent, type PointerEvent, type RefObject } from "react";

/**
 * Révélateur « nuée » : un petit nuage de brume suit le pointeur et laisse
 * apparaître la photo cachée, puis se dissipe doucement derrière lui.
 *
 * Principe : un calque invisible (le « masque ») reçoit des bouffées de brume
 * floues à chaque mouvement et s'efface un peu à chaque image. La photo de gym
 * n'est dessinée que là où ce masque est opaque.
 */
export type RevealMode = "brume" | "cercle" | "couloirs";

export const REVEAL_MODES: Array<{ id: RevealMode; label: string }> = [
  { id: "brume", label: "Brume" },
  { id: "cercle", label: "Cercle" },
  { id: "couloirs", label: "Couloirs" },
];

type Options = {
  imageSrc: string;
  /** Effet utilisé pour dévoiler la photo cachée. */
  mode?: RevealMode;
  /** Point de cadrage, comme object-position (0 → 1). */
  focusX?: number;
  focusY?: number;
  zoom?: number;
};

const ENABLED_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (min-width: 768px)";

export function useMistReveal(
  figureRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { imageSrc, mode = "brume", focusX = 0.47, focusY = 0.46, zoom = 1.02 }: Options,
) {
  const modeRef = useRef<RevealMode>(mode);
  modeRef.current = mode;
  const state = useRef({
    enabled: false,
    active: false,
    x: 0,
    y: 0,
    lastX: NaN,
    lastY: NaN,
    width: 0,
    height: 0,
    idleFrames: 0,
    raf: 0,
    image: null as HTMLImageElement | null,
    mask: null as HTMLCanvasElement | null,
    // Cercle : position lissée et taille animée.
    cx: 0,
    cy: 0,
    cr: 0,
    // Couloirs : ouverture de chaque couloir et vitesse du pointeur.
    lanes: [] as number[],
    speed: 0,
    lastMode: "brume" as RevealMode,
  });

  useEffect(() => {
    const figure = figureRef.current;
    const canvas = canvasRef.current;
    if (!figure || !canvas) return;

    const s = state.current;
    const media = window.matchMedia(ENABLED_QUERY);
    const syncEnabled = () => {
      s.enabled = media.matches;
    };
    syncEnabled();
    media.addEventListener("change", syncEnabled);

    const image = new Image();
    image.src = imageSrc;
    s.image = image;
    s.mask = document.createElement("canvas");

    const MASK_SCALE = 0.5; // masque basse définition = bords encore plus doux

    const resize = () => {
      const rect = figure.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.width = rect.width;
      s.height = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (s.mask) {
        s.mask.width = Math.max(1, Math.round(rect.width * MASK_SCALE));
        s.mask.height = Math.max(1, Math.round(rect.height * MASK_SCALE));
        s.mask.getContext("2d")?.setTransform(MASK_SCALE, 0, 0, MASK_SCALE, 0, 0);
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(figure);

    return () => {
      media.removeEventListener("change", syncEnabled);
      observer.disconnect();
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [figureRef, canvasRef, imageSrc]);

  const puff = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, alpha: number) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, `rgba(0,0,0,${alpha})`);
    g.addColorStop(0.45, `rgba(0,0,0,${alpha * 0.55})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const frame = () => {
    const s = state.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const mctx = s.mask?.getContext("2d");
    if (!canvas || !ctx || !mctx || !s.mask) {
      s.raf = 0;
      return;
    }

    const { width: w, height: h } = s;
    const mode = modeRef.current;
    if (mode !== s.lastMode) {
      mctx.clearRect(0, 0, w, h);
      s.lastMode = mode;
      s.cr = 0;
      s.lanes = [];
    }
    const fromX = Number.isNaN(s.lastX) ? s.x : s.lastX;
    const fromY = Number.isNaN(s.lastY) ? s.y : s.lastY;
    let settled = false;

    if (mode === "brume") {
      // Brume dense qui laisse une longue traînée derrière le pointeur.
      const base = Math.min(w, h) * 0.12;
      mctx.globalCompositeOperation = "destination-out";
      mctx.fillStyle = "rgba(0,0,0,0.016)";
      mctx.fillRect(0, 0, w, h);
      mctx.globalCompositeOperation = "source-over";
      if (s.active) {
        s.idleFrames = 0;
        const distance = Math.hypot(s.x - fromX, s.y - fromY);
        const steps = Math.max(1, Math.ceil(distance / (base * 0.35)));
        for (let i = 1; i <= steps; i += 1) {
          const px = fromX + ((s.x - fromX) * i) / steps;
          const py = fromY + ((s.y - fromY) * i) / steps;
          for (let k = 0; k < 4; k += 1) {
            const angle = Math.random() * Math.PI * 2;
            const spread = Math.random() * base * 1.1;
            puff(mctx, px + Math.cos(angle) * spread, py + Math.sin(angle) * spread, base * (0.6 + Math.random() * 0.9), 0.4 + Math.random() * 0.3);
          }
        }
        puff(mctx, s.x, s.y, base * 1.25, 0.75);
      } else {
        s.idleFrames += 1;
      }
      settled = !s.active && s.idleFrames > 320;
    } else if (mode === "cercle") {
      // Un disque net, de taille fixe, qui suit le pointeur avec un léger retard.
      const target = s.active ? Math.min(w, h) * 0.24 : 0;
      if (s.cr === 0) {
        s.cx = s.x;
        s.cy = s.y;
      }
      s.cx += (s.x - s.cx) * 0.18;
      s.cy += (s.y - s.cy) * 0.18;
      s.cr += (target - s.cr) * 0.14;
      if (s.cr < 0.5 && !s.active) s.cr = 0;
      mctx.clearRect(0, 0, w, h);
      if (s.cr > 0) {
        mctx.fillStyle = "#000";
        mctx.beginPath();
        mctx.arc(s.cx, s.cy, s.cr, 0, Math.PI * 2);
        mctx.fill();
      }
      settled = !s.active && s.cr === 0;
    } else {
      // Couloirs : la photo apparaît en bandes inclinées, comme les couloirs
      // de la piste en fond. Plus le pointeur va vite, plus les bandes s'étirent.
      const angle = (-16 * Math.PI) / 180;
      const lane = h / 10;
      const count = Math.ceil(Math.hypot(w, h) / lane) + 2;
      if (s.lanes.length !== count) s.lanes = new Array(count).fill(0);
      const move = Math.hypot(s.x - fromX, s.y - fromY);
      s.speed += (move - s.speed) * 0.2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      // Coordonnées du pointeur dans le repère incliné.
      const u = (s.x - w / 2) * cos + (s.y - h / 2) * sin;
      const v = -(s.x - w / 2) * sin + (s.y - h / 2) * cos;
      const reach = lane * 2.2;
      let open = 0;
      mctx.clearRect(0, 0, w, h);
      mctx.save();
      mctx.translate(w / 2, h / 2);
      mctx.rotate(angle);
      mctx.fillStyle = "#000";
      for (let i = 0; i < count; i += 1) {
        const center = (i - (count - 1) / 2) * lane;
        const target = s.active ? Math.exp(-((center - v) ** 2) / (2 * reach * reach)) : 0;
        const current = s.lanes[i];
        s.lanes[i] = current + (target - current) * (target > current ? 0.25 : 0.06);
        const a = s.lanes[i];
        if (a < 0.01) continue;
        open += a;
        const length = (Math.min(w, h) * 0.35 + s.speed * 9) * (0.4 + a * 0.8);
        const thickness = lane * 0.78 * a;
        mctx.beginPath();
        mctx.roundRect(u - length / 2, center - thickness / 2, length, thickness, thickness / 2);
        mctx.fill();
      }
      mctx.restore();
      settled = !s.active && open < 0.01;
    }

    if (s.active) {
      s.lastX = s.x;
      s.lastY = s.y;
    }

    // 3. Photo de gym, visible uniquement à travers la brume.
    ctx.clearRect(0, 0, w, h);
    const img = s.image;
    if (img && img.complete && img.naturalWidth) {
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (w - dw) * focusX, (h - dh) * focusY, dw, dh);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(s.mask, 0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    }

    // Cercle : fin liseré clair autour du disque.
    if (mode === "cercle" && s.cr > 1) {
      ctx.strokeStyle = "rgba(244, 239, 230, 0.85)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(s.cx, s.cy, s.cr, 0, Math.PI * 2);
      ctx.stroke();
    }

    // La boucle s'arrête quand plus rien n'est visible.
    if (settled) {
      mctx.clearRect(0, 0, w, h);
      ctx.clearRect(0, 0, w, h);
      s.raf = 0;
      return;
    }
    s.raf = requestAnimationFrame(frame);
  };

  const start = () => {
    const s = state.current;
    if (!s.raf) s.raf = requestAnimationFrame(frame);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const s = state.current;
    if (!s.enabled || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    s.x = event.clientX - rect.left;
    s.y = event.clientY - rect.top;
    if (!s.active) {
      s.lastX = NaN;
      s.lastY = NaN;
    }
    s.active = true;
    start();
  };

  const onPointerLeave = () => {
    state.current.active = false;
  };

  const onFocus = (_event: FocusEvent<HTMLElement>) => {
    const s = state.current;
    if (!s.enabled) return;
    s.x = s.width / 2;
    s.y = s.height / 2;
    s.lastX = NaN;
    s.active = true;
    start();
  };

  return {
    onPointerEnter: onPointerMove,
    onPointerMove,
    onPointerLeave,
    onFocus,
    onBlur: onPointerLeave,
  };
}
