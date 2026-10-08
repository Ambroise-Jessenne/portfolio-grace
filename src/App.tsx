import { useRef } from "react";
import Timeline from "@/components/ui/timeline";
import { useMistReveal } from "@/components/ui/use-mist-reveal";
import { journey } from "@/data/journey";
import { heroProofs } from "@/data/sport-profile";

const gymImage = `${import.meta.env.BASE_URL}images/grace-gym.jpg`;

export default function App() {
  const portraitRef = useRef<HTMLElement>(null);
  const mistRef = useRef<HTMLCanvasElement>(null);
  const mistHandlers = useMistReveal(portraitRef, mistRef, { imageSrc: gymImage });

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
            <a
              className="contact-cta"
              href="mailto:gracecharpypro@gmail.com"
              aria-label="Envoyer un e-mail à Grâce Charpy"
            >
              <span>Écrire à Grâce</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <figure
            ref={portraitRef}
            className="portrait-pair"
            tabIndex={0}
            aria-label="Portrait interactif de Grâce Charpy, entre course et gymnastique"
            aria-describedby="portrait-instruction"
            {...mistHandlers}
          >
            <div className="portrait-pair__runner">
              <img
                src={`${import.meta.env.BASE_URL}images/grace-blocks-league.jpg`}
                alt="Grâce Charpy en tenue de course noire lors d’un événement Blocks League"
              />
            </div>
            <div className="portrait-pair__gym" aria-hidden="true">
              <img src={gymImage} alt="" />
            </div>
            <canvas ref={mistRef} className="portrait-pair__mist" aria-hidden="true" />
            <figcaption className="portrait-pair__caption">
              <span id="portrait-instruction" className="portrait-pair__desktop-note">
                Déplacez le pointeur pour révéler
              </span>
              <span>Course / Gymnastique</span>
            </figcaption>
          </figure>

          <aside className="hero__performances" aria-labelledby="performances-title">
            <p id="performances-title" className="eyebrow">Performances</p>
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
          </aside>
        </div>

        <p className="hero__index" aria-hidden="true">01 — Mouvement</p>

        <a className="scroll-cue" href="#parcours" aria-label="Descendre vers le parcours">
          <span className="scroll-cue__label">Défiler</span>
          <svg className="scroll-cue__arrow" viewBox="0 0 16 32" aria-hidden="true">
            <path d="M8 1v29M2 24l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>
      </section>

      <Timeline
        id="parcours"
        title="Du praticable à la ligne de départ."
        periodLabel="2009 — aujourd’hui"
        items={journey}
        imageUrl={`${import.meta.env.BASE_URL}images/parcours/veste-charpy.jpg`}
        imageAlt="Grâce Charpy de dos, veste blanche floquée CHARPY, avant le départ d’une course"
      />

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <p className="eyebrow">Collaborations · Projets · Partenariats</p>
        <h2 id="contact-title">Construisons la prochaine ligne de départ.</h2>
        <div className="contact__links" aria-label="Coordonnées de Grâce Charpy">
          <a href="mailto:gracecharpypro@gmail.com">
            <span>E-mail</span>
            <strong>gracecharpypro@gmail.com</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.instagram.com/grace_charpy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Instagram</span>
            <strong>@grace_charpy</strong>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <a className="contact__back" href="#accueil">
          Retour en haut <span aria-hidden="true">↑</span>
        </a>
      </section>
    </main>
  );
}
