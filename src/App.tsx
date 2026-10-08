import { useRef, type PointerEvent } from "react";
import Timeline from "@/components/ui/timeline";
import { journey } from "@/data/journey";
import { heroProofs } from "@/data/sport-profile";

export default function App() {
  const portraitRef = useRef<HTMLElement>(null);

  const positionReveal = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;

    const portrait = portraitRef.current;
    if (!portrait) return;

    const bounds = portrait.getBoundingClientRect();
    portrait.style.setProperty("--reveal-x", `${event.clientX - bounds.left}px`);
    portrait.style.setProperty("--reveal-y", `${event.clientY - bounds.top}px`);
    portrait.dataset.reveal = "open";
  };

  const closeReveal = () => {
    portraitRef.current?.removeAttribute("data-reveal");
  };

  const openCenteredReveal = () => {
    const portrait = portraitRef.current;
    if (!portrait) return;

    portrait.style.setProperty("--reveal-x", "50%");
    portrait.style.setProperty("--reveal-y", "50%");
    portrait.dataset.reveal = "open";
  };

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <nav className="hero__nav" aria-label="Navigation principale">
          <a className="wordmark" href="#accueil" aria-label="Grâce Charpy, accueil">
            GC<span>.</span>
          </a>
          <div className="hero__nav-links">
            <a href="#parcours">Parcours</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div id="accueil" className="hero__layout">
          <div className="hero__copy">
            <p className="eyebrow">Ancienne gymnaste internationale · Athlète N2</p>
            <h1 id="hero-title">
              Grâce
              <span>Charpy</span>
            </h1>
            <p className="hero__statement">
              De l’équipe de France de gymnastique aux pistes d’athlétisme. Une trajectoire
              construite avec la même précision, le même engagement et un nouvel élan.
            </p>
            <ul className="hero__proofs" aria-label="Repères sportifs vérifiés">
              {heroProofs.map((proof) => (
                <li key={proof.id}>
                  <a href={proof.sourceUrl} target="_blank" rel="noreferrer">
                    <span>{proof.label}</span>
                    <strong>{proof.value}</strong>
                    <small>{proof.detail}</small>
                  </a>
                </li>
              ))}
            </ul>
            <a className="contact-cta" href="#contact">
              <span>Me contacter</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <figure
            ref={portraitRef}
            className="portrait-pair"
            tabIndex={0}
            aria-label="Portrait interactif de Grâce Charpy, entre course et gymnastique"
            aria-describedby="portrait-instruction"
            onPointerEnter={positionReveal}
            onPointerMove={positionReveal}
            onPointerLeave={closeReveal}
            onFocus={openCenteredReveal}
            onBlur={closeReveal}
          >
            <div className="portrait-pair__runner">
              <img
                src="/images/grace-blocks-league.jpg"
                alt="Grâce Charpy en tenue de course noire lors d’un événement Blocks League"
              />
            </div>
            <div className="portrait-pair__gym" aria-hidden="true">
              <img src="/images/grace-gym.jpg" alt="" />
            </div>
            <figcaption className="portrait-pair__caption">
              <span id="portrait-instruction" className="portrait-pair__desktop-note">
                Déplacez le pointeur pour révéler
              </span>
              <span>Course / Gymnastique</span>
            </figcaption>
          </figure>
        </div>

        <p className="hero__index" aria-hidden="true">01 — Mouvement</p>
      </section>

      <Timeline
        id="parcours"
        title="Du praticable à la ligne de départ."
        periodLabel="2009 — aujourd’hui"
        items={journey}
        imageUrl="/images/grace-piste.jpg"
        imageAlt="Grâce Charpy en course sur une piste d’athlétisme"
      />

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <p className="eyebrow">Collaborations · Projets · Partenariats</p>
        <h2 id="contact-title">Construisons la prochaine ligne de départ.</h2>
        <p className="contact__placeholder">
          Les coordonnées de Grâce seront ajoutées ici dès qu’elles auront été confirmées.
        </p>
        <a href="#accueil">Retour en haut <span aria-hidden="true">↑</span></a>
      </section>
    </main>
  );
}
