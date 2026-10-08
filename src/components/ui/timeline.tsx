import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { JourneyItem } from "@/data/journey";

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

export default function Timeline({
  id = "parcours",
  title,
  periodLabel,
  items,
  imageUrl,
  imageAlt = "",
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
            },
          });

          gsap.utils.toArray<HTMLElement>("[data-milestone]", section).forEach((card) => {
            gsap.fromTo(
              card,
              { autoAlpha: 0.35, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left 82%",
                  end: "left 58%",
                  scrub: true,
                },
              },
            );
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
  }, [items]);

  return (
    <section ref={sectionRef} id={id} className="timeline" aria-labelledby={`${id}-title`}>
      <div className="timeline__track" ref={trackRef}>
        <header className="timeline__intro">
          <p className="eyebrow">Parcours sportif</p>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{periodLabel}</p>
          {imageUrl ? (
            <img className="timeline__image" src={imageUrl} alt={imageAlt} loading="lazy" />
          ) : null}
        </header>

        <div className="timeline__line" aria-hidden="true" />

        <ol className="timeline__list">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={index % 2 === 0 ? "milestone milestone--top" : "milestone milestone--bottom"}
              data-milestone
            >
              <span className="milestone__dot" aria-hidden="true" />
              <article>
                <p className="milestone__label">
                  {item.label}
                </p>
                <h3>{item.title}</h3>
                <p className="milestone__copy">{item.description}</p>
              </article>
            </li>
          ))}
        </ol>

        <div className="timeline__outro" aria-hidden="true">
          <span>La suite</span>
          <span className="timeline__arrow">→</span>
        </div>
      </div>
    </section>
  );
}
