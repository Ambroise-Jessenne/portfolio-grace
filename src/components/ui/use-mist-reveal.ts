import { useEffect, useRef, type FocusEvent, type PointerEvent, type RefObject } from "react";

/**
 * Révélateur « nuée » : un petit nuage de brume suit le pointeur et laisse
 * apparaître la photo cachée, puis se dissipe doucement derrière lui.
 *
 * Principe : un calque invisible (le « masque ») reçoit des bouffées de brume
 * floues à chaque mouvement et s'efface un peu à chaque image. La photo de gym
 * n'est dessinée que là où ce masque est opaque.
 */
type Options = {
  imageSrc: string;
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
  { imageSrc, focusX = 0.47, focusY = 0.46, zoom = 1.02 }: Options,
) {
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
    const base = Math.min(w, h) * 0.09; // taille du nuage : petite et proportionnelle à la photo

    // 1. La brume existante se dissipe un peu.
    mctx.globalCompositeOperation = "destination-out";
    mctx.fillStyle = "rgba(0,0,0,0.045)";
    mctx.fillRect(0, 0, w, h);
    mctx.globalCompositeOperation = "source-over";

    // 2. Nouvelles bouffées autour du pointeur (et le long du trajet s'il va vite).
    if (s.active) {
      s.idleFrames = 0;
      const fromX = Number.isNaN(s.lastX) ? s.x : s.lastX;
      const fromY = Number.isNaN(s.lastY) ? s.y : s.lastY;
      const distance = Math.hypot(s.x - fromX, s.y - fromY);
      const steps = Math.max(1, Math.ceil(distance / (base * 0.5)));
      for (let i = 1; i <= steps; i += 1) {
        const px = fromX + ((s.x - fromX) * i) / steps;
        const py = fromY + ((s.y - fromY) * i) / steps;
        for (let k = 0; k < 3; k += 1) {
          const angle = Math.random() * Math.PI * 2;
          const spread = Math.random() * base * 0.9;
          puff(
            mctx,
            px + Math.cos(angle) * spread,
            py + Math.sin(angle) * spread,
            base * (0.55 + Math.random() * 0.8),
            0.3 + Math.random() * 0.25,
          );
        }
      }
      // Cœur du nuage, plus dense, sous le pointeur.
      puff(mctx, s.x, s.y, base * 1.05, 0.55);
      s.lastX = s.x;
      s.lastY = s.y;
    } else {
      s.idleFrames += 1;
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

    // La boucle s'arrête quand la brume a totalement disparu.
    if (!s.active && s.idleFrames > 110) {
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
