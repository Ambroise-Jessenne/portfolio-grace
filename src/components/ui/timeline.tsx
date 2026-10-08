import { Fragment, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { JourneyItem } from "@/data/journey";
import { ui, useLang } from "@/i18n";

type TimelineProps = {
  id?: string;
  title: string;
  periodLabel: string;
  items: JourneyItem[];
  imageUrl?: string;
  imageAlt?: string;
};

const DESKTOP_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";


const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export default function Timeline({
  id = "parcours",
  title,
  periodLabel,
  items,
  imageUrl,
  imageAlt = "",
}: TimelineProps) {
  const { lang, t } = useLang();
  const DISCIPLINE_LABEL: Record<JourneyItem["discipline"], string> = { gym: t(ui.gym), athle: t(ui.athle) };
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          desktop: DESKTOP_QUERY,
          reduceMotion: REDUCED_MOTION_QUERY,
        },
        (matchContext) => {
          const { desktop, reduceMotion } = matchContext.conditions ?? {};
          if (!desktop || reduceMotion) return;

          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

          const horizontalTween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                progressRef.current?.style.setProperty("--progress", self.progress.toFixed(4));
              },
            },
          });

          gsap.utils.toArray<HTMLElement>("[data-milestone]", section).forEach((card) => {
            const text = card.querySelector("article");
            const photos = card.querySelectorAll(".milestone__photo img");

            if (text) {
              gsap.fromTo(
                text,
                { autoAlpha: 0.25, y: 24 },
                {
                  autoAlpha: 1,
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: horizontalTween,
                    start: "left 98%",
                    end: "left 72%",
                    scrub: true,
                  },
                },
              );
            }

            if (photos.length) {
              gsap.fromTo(
                photos,
                { scale: 1.14 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: horizontalTween,
                    start: "left right",
                    end: "right 40%",
                    scrub: true,
                  },
                },
              );
            }
          });
        },
      );
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const images = Array.from(section.querySelectorAll("img"));
    images.forEach((image) => image.addEventListener("load", refresh, { once: true }));
    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(track);

    return () => {
      images.forEach((image) => image.removeEventListener("load", refresh));
      resizeObserver.disconnect();
      context.revert();
      media.revert();
    };
  }, [items, lang]);

  return (
    <section ref={sectionRef} id={id} className="timeline" aria-labelledby={`${id}-title`}>
      <div className="timeline__track" ref={trackRef}>
        <header className="timeline__intro">
          <div className="timeline__intro-copy">
            <p className="eyebrow">{t(ui.timelineEyebrow)}</p>
            <h2 id={`${id}-title`}>{title}</h2>
            <p className="timeline__period">{periodLabel}</p>
            <ul className="timeline__legend" aria-label={t(ui.disciplines)}>
              <li data-discipline="gym">{t(ui.gym)}</li>
              <li data-discipline="athle">{t(ui.athle)}</li>
            </ul>
          </div>
          {imageUrl ? (
            <figure className="timeline__intro-photo">
              <img src={imageUrl} alt={imageAlt} loading="lazy" decoding="async" />
            </figure>
          ) : null}
        </header>

        <div className="timeline__line" aria-hidden="true" />

        <ol className="timeline__list">
          {items.map((item, index) => {
            const previous = items[index - 1];
            const switchesDiscipline = previous && previous.discipline !== item.discipline;
            const photos = item.photos ?? [];

            return (
              <Fragment key={item.id}>
                {switchesDiscipline ? (
                  <li className="timeline__switch" aria-hidden="true">
                    <span>{DISCIPLINE_LABEL[previous.discipline]}</span>
                    <span className="timeline__switch-arrow">↓</span>
                    <strong>{DISCIPLINE_LABEL[item.discipline]}</strong>
                  </li>
                ) : null}

                <li
                  className={[
                    "milestone",
                    `milestone--${item.discipline}`,
                    index % 2 === 0 ? "milestone--tall" : "milestone--short",
                    photos.length > 1 ? "milestone--duo" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  data-milestone
                >
                  <div className="milestone__media">
                    {photos.map((photo, photoIndex) => (
                      <figure
                        key={photo.src}
                        className={
                          photoIndex === 0 ? "milestone__photo" : "milestone__photo milestone__photo--inset"
                        }
                      >
                        <img
                          src={asset(photo.src)}
                          alt={t(photo.alt)}
                          loading="lazy"
                          decoding="async"
                          style={photo.position ? { objectPosition: photo.position } : undefined}
                          onError={(event) => {
                            // Photo pas encore déposée : on affiche un cadre « Photo à venir ».
                            event.currentTarget.closest("figure")?.classList.add("is-missing");
                          }}
                        />
                      </figure>
                    ))}
                  </div>

                  <span className="milestone__dot" aria-hidden="true" />

                  <article>
                    <p className="milestone__label">
                      <span>{item.label}</span>
                      <span className="milestone__discipline">{DISCIPLINE_LABEL[item.discipline]}</span>
                    </p>
                    <h3>{t(item.title)}</h3>
                    <p className="milestone__copy">{t(item.description)}</p>
                  </article>
                </li>
              </Fragment>
            );
          })}
        </ol>

        <div className="timeline__outro">
          <span className="timeline__dash" aria-hidden="true" />
          <svg className="timeline__arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 12h19M14 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <div className="timeline__next">
            <p>{t(ui.next)}</p>
            <p className="timeline__next-goals">{t(ui.nextGoals)}</p>
          </div>
        </div>
      </div>

      <span ref={progressRef} className="timeline__progress" aria-hidden="true" />
    </section>
  );
}
