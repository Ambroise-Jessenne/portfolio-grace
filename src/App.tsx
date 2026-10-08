import { useRef, useState, type KeyboardEvent } from "react";
import LegalFooter from "@/components/ui/legal-footer";
import Timeline from "@/components/ui/timeline";
import { useMistReveal } from "@/components/ui/use-mist-reveal";
import { journey } from "@/data/journey";
import { heroProofs } from "@/data/sport-profile";
import { audienceStats, categoryLabels, partners } from "@/data/partners";
import { LangSwitch, ui, useLang } from "@/i18n";

// Rayons des couloirs de la piste dessinée en fond du haut de page.
const TRACK_LANES = [330, 390, 450, 510, 570, 630, 690, 750];

const gymImage = `${import.meta.env.BASE_URL}images/grace-gym.jpg`;

export default function App() {
  const { t } = useLang();
  const portraitRef = useRef<HTMLElement>(null);
  const mistRef = useRef<HTMLCanvasElement>(null);
  const mistHandlers = useMistReveal(portraitRef, mistRef, { imageSrc: gymImage, mode: "couloirs" });

  // Sur mobile : toucher la photo la retourne pour dévoiler la photo de gym.
  const [flipped, setFlipped] = useState(false);
  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
  const togglePortrait = () => {
    if (isMobile()) setFlipped((value) => !value);
  };
  const onPortraitKey = (event: KeyboardEvent<HTMLElement>) => {
    if ((event.key === "Enter" || event.key === " ") && isMobile()) {
      event.preventDefault();
      setFlipped((value) => !value);
    }
  };

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

        <nav className="hero__nav" aria-label={t(ui.navLabel)}>
          <LangSwitch />
          <div className="hero__nav-links">
            <a href="#parcours">{t(ui.navJourney)}</a>
            <a href="#partenariats">{t(ui.navPartners)}</a>
            <a href="#contact">{t(ui.navContact)}</a>
          </div>
        </nav>

        <div id="accueil" className="hero__layout">
          <div className="hero__copy">
            <p className="eyebrow">{t(ui.heroEyebrow)}</p>
            <h1 id="hero-title">
              Grâce
              <span>Charpy</span>
            </h1>
            <p className="hero__statement">{t(ui.heroStatement)}</p>
            <a
              className="contact-cta"
              href="mailto:gracecharpypro@gmail.com"
              aria-label={t(ui.ctaContactLabel)}
            >
              <span>{t(ui.ctaContact)}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <figure
            ref={portraitRef}
            className={flipped ? "portrait-pair is-flipped" : "portrait-pair"}
            tabIndex={0}
            onClick={togglePortrait}
            onKeyDown={onPortraitKey}
            aria-label={t(ui.portraitLabel)}
            aria-describedby="portrait-instruction"
            {...mistHandlers}
          >
            <div className="portrait-pair__runner">
              <img
                src={`${import.meta.env.BASE_URL}images/grace-blocks-league.jpg`}
                alt={t(ui.portraitAlt)}
              />
            </div>
            <div className="portrait-pair__gym" aria-hidden="true">
              <img src={gymImage} alt="" />
            </div>
            <canvas ref={mistRef} className="portrait-pair__mist" aria-hidden="true" />
            <figcaption className="portrait-pair__caption">
              <span id="portrait-instruction" className="portrait-pair__desktop-note">
                {t(ui.portraitDesktop)}
              </span>
              <span className="portrait-pair__mobile-note">
                <span aria-hidden="true">↻</span> {flipped ? t(ui.portraitBack) : t(ui.portraitFlip)}
              </span>
              <span>{t(ui.portraitCaption)}</span>
            </figcaption>
          </figure>

          <aside className="hero__performances" aria-labelledby="performances-title">
            <p id="performances-title" className="eyebrow">{t(ui.performances)}</p>
            <ul className="hero__proofs" aria-label={t(ui.performancesLabel)}>
              {heroProofs.map((proof) => (
                <li key={proof.id}>
                  <a href={proof.sourceUrl} target="_blank" rel="noreferrer">
                    <span>{t(proof.label)}</span>
                    <strong>{t(proof.value)}</strong>
                    <small>{t(proof.detail)}</small>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <p className="hero__index" aria-hidden="true">{t(ui.heroIndex)}</p>

        <a className="scroll-cue" href="#parcours" aria-label={t(ui.scrollLabel)}>
          <span className="scroll-cue__label">{t(ui.scroll)}</span>
          <svg className="scroll-cue__arrow" viewBox="0 0 16 32" aria-hidden="true">
            <path d="M8 1v29M2 24l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>
      </section>

      <Timeline
        id="parcours"
        title={t(ui.timelineTitle)}
        periodLabel={t(ui.timelinePeriod)}
        items={journey}
      />

      <section id="partenariats" className="partners" aria-labelledby="partners-title">
        <div className="partners__head">
          <div>
            <p className="eyebrow">{t(ui.partnersEyebrow)}</p>
            <h2 id="partners-title">{t(ui.partnersTitle)}</h2>
          </div>
          <p className="partners__intro">{t(ui.partnersIntro)}</p>
        </div>

        <a
          className="partners__stats"
          href="https://www.instagram.com/grace_charpy/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(ui.statsLabel)}
        >
          {audienceStats.map((stat) => (
            <span key={stat.id} className="partners__stat">
              <strong>{t(stat.value)}</strong>
              <span>{t(stat.label)}</span>
            </span>
          ))}
          <span className="partners__stat-source">
            <svg className="partners__ig" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
            </svg>
            <span>@grace_charpy <span aria-hidden="true">↗</span></span>
          </span>
        </a>

        <ul className="partners__grid" aria-label={t(ui.partnersGridLabel)}>
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
                  <span>{t(categoryLabels[partner.category])}</span>
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
                    aria-label={`${partner.name} — ${t(ui.openSite)}`}
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
        <p className="eyebrow">{t(ui.contactEyebrow)}</p>
        <h2 id="contact-title">{t(ui.contactTitle)}</h2>
        <div className="contact__links" aria-label={t(ui.contactLinksLabel)}>
          <a href="mailto:gracecharpypro@gmail.com">
            <svg className="contact__icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="m3.5 6 8.5 7 8.5-7" />
            </svg>
            <span>{t(ui.email)}</span>
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
          {t(ui.backToTop)} <span aria-hidden="true">↑</span>
        </a>
      </section>
      <LegalFooter />
    </main>
  );
}
