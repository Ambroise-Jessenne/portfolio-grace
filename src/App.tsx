import { useRef } from "react";
import Timeline from "@/components/ui/timeline";
import { useMistReveal } from "@/components/ui/use-mist-reveal";
import { journey } from "@/data/journey";
import { heroProofs } from "@/data/sport-profile";
import { audienceStats, partners } from "@/data/partners";

// Rayons des couloirs de la piste dessinée en fond du haut de page.
const TRACK_LANES = [330, 390, 450, 510, 570, 630, 690, 750];

const gymImage = `${import.meta.env.BASE_URL}images/grace-gym.jpg`;

export default function App() {
  const portraitRef = useRef<HTMLElement>(null);
  const mistRef = useRef<HTMLCanvasElement>(null);
  const mistHandlers = useMistReveal(portraitRef, mistRef, { imageSrc: gymImage, mode: "couloirs" });

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <svg
          className="hero__track"
          viewBox="-1200 -800 2400 1600"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <g transform="translate(140 60) rotate(-16)">
            {TRACK_LANES.map((radius, index) => (
              <path
                key={radius}
                d={`M -560 ${-radius} H 560 A ${radius} ${radius} 0 0 1 560 ${radius} H -560 A ${radius} ${radius} 0 0 1 -560 ${-radius} Z`}
                pathLength={1}
                style={{ animationDelay: `${index * 0.12}s` }}
              />
            ))}
          </g>
        </svg>

        <nav className="hero__nav" aria-label="Navigation principale">
          <div className="hero__nav-links">
            <a href="#parcours">Parcours</a>
            <a href="#partenariats">Partenariats</a>
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
      />

      <section id="partenariats" className="partners" aria-labelledby="partners-title">
        <div className="partners__head">
          <div>
            <p className="eyebrow">Partenariats · Visibilité</p>
            <h2 id="partners-title">Ils ont couru avec Grâce.</h2>
          </div>
          <p className="partners__intro">
            Des marques de sport, de nutrition et des courses de la Loire lui ont déjà confié
            leur image, sur la piste comme sur Instagram.
          </p>
        </div>

        <a
          className="partners__stats"
          href="https://www.instagram.com/grace_charpy/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Audience Instagram de Grâce Charpy (ouvre Instagram dans un nouvel onglet)"
        >
          {audienceStats.map((stat) => (
            <span key={stat.id} className="partners__stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </span>
          ))}
          <span className="partners__stat-source">@grace_charpy <span aria-hidden="true">↗</span></span>
        </a>

        <ul className="partners__grid" aria-label="Marques et événements partenaires">
          {partners.map((partner) => {
            const content = (
              <>
                <span className="partners__logo" data-shape={partner.shape ?? "medium"}>
                  {partner.logo ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${partner.logo}`}
                      alt={partner.name}
                      loading="lazy"
                      data-colored={partner.colored ? "true" : undefined}
                    />
                  ) : (
                    <span className="partners__wordmark">{partner.name}</span>
                  )}
                </span>
                <span className="partners__meta">
                  <span>{partner.category}</span>
                  {partner.url && <span aria-hidden="true">↗</span>}
                </span>
              </>
            );
            return (
              <li key={partner.id}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${partner.name} — ouvrir le site (nouvel onglet)`}
                  >
                    {content}
                  </a>
                ) : (
                  <div className="partners__card">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <p className="eyebrow">Collaborations · Projets · Partenariats</p>
        <h2 id="contact-title">Me contacter pour vos projets.</h2>
        <div className="contact__links" aria-label="Coordonnées de Grâce Charpy">
          <a href="mailto:gracecharpypro@gmail.com">
            <svg className="contact__icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="m3.5 6 8.5 7 8.5-7" />
            </svg>
            <span>E-mail</span>
            <strong>gracecharpypro@gmail.com</strong>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.instagram.com/grace_charpy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="contact__icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
            </svg>
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
