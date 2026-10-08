import { useRef } from "react";
import { useLang, type Localized } from "@/i18n";

// Crédit du site : mettre ici les adresses des profils (laisser "" pour masquer un lien).
const CREDIT = {
  name: "Ambroise Jessenne",
  linkedin: "",
  malt: "",
};

const EMAIL = "gracecharpypro@gmail.com";

const txt = {
  madeBy: { fr: "Site conçu et réalisé par", en: "Website designed and built by", de: "Website gestaltet und umgesetzt von" },
  legal: { fr: "Mentions légales", en: "Legal notice", de: "Impressum" },
  close: { fr: "Fermer", en: "Close", de: "Schließen" },
  publisherTitle: { fr: "Éditrice du site", en: "Site publisher", de: "Herausgeberin der Website" },
  publisher: {
    fr: "Grâce Charpy, responsable de la publication.",
    en: "Grâce Charpy, responsible for the content.",
    de: "Grâce Charpy, verantwortlich für den Inhalt.",
  },
  contact: { fr: "Contact :", en: "Contact:", de: "Kontakt:" },
  designTitle: { fr: "Conception et réalisation", en: "Design and development", de: "Gestaltung und Umsetzung" },
  hostTitle: { fr: "Hébergement", en: "Hosting", de: "Hosting" },
  ipTitle: { fr: "Propriété intellectuelle", en: "Intellectual property", de: "Urheberrecht" },
  ip: {
    fr: "Textes et photos : droits réservés. Toute reproduction sans autorisation préalable est interdite. Les logos des marques et événements appartiennent à leurs propriétaires respectifs.",
    en: "Texts and photos: all rights reserved. Any reproduction without prior permission is prohibited. Brand and event logos belong to their respective owners.",
    de: "Texte und Fotos: alle Rechte vorbehalten. Jede Vervielfältigung ohne vorherige Genehmigung ist untersagt. Die Logos der Marken und Veranstaltungen gehören ihren jeweiligen Inhabern.",
  },
  dataTitle: { fr: "Données personnelles", en: "Personal data", de: "Datenschutz" },
  data: {
    fr: "Ce site ne collecte aucune donnée personnelle, n’utilise pas de cookies et ne fait aucune mesure d’audience. Seul votre choix de langue est conservé dans votre navigateur.",
    en: "This website collects no personal data, uses no cookies and runs no audience tracking. Only your language choice is stored in your browser.",
    de: "Diese Website erhebt keine personenbezogenen Daten, verwendet keine Cookies und keine Reichweitenmessung. Nur Ihre Sprachwahl wird in Ihrem Browser gespeichert.",
  },
} satisfies Record<string, Localized>;

export default function LegalFooter() {
  const { t } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const creditLinks = [
    CREDIT.linkedin && { label: "LinkedIn", href: CREDIT.linkedin },
    CREDIT.malt && { label: "Malt", href: CREDIT.malt },
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  const credit = (
    <>
      {t(txt.madeBy)} <strong>{CREDIT.name}</strong>
      {creditLinks.map((link) => (
        <span key={link.label}>
          {" · "}
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} <span aria-hidden="true">↗</span>
          </a>
        </span>
      ))}
    </>
  );

  return (
    <footer className="site-footer">
      <p className="site-footer__credit">{credit}</p>
      <p className="site-footer__meta">
        <span>© {new Date().getFullYear()} Grâce Charpy</span>
        <button type="button" onClick={() => dialogRef.current?.showModal()}>
          {t(txt.legal)}
        </button>
      </p>

      <dialog
        ref={dialogRef}
        className="legal"
        aria-labelledby="legal-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="legal__inner">
          <header className="legal__head">
            <h2 id="legal-title">{t(txt.legal)}</h2>
            <button type="button" className="legal__close" onClick={() => dialogRef.current?.close()}>
              {t(txt.close)} <span aria-hidden="true">×</span>
            </button>
          </header>

          <h3>{t(txt.publisherTitle)}</h3>
          <p>
            {t(txt.publisher)}
            <br />
            {t(txt.contact)} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>

          <h3>{t(txt.designTitle)}</h3>
          <p>{credit}</p>

          <h3>{t(txt.hostTitle)}</h3>
          <p>
            GitHub, Inc. (GitHub Pages)
            <br />
            88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA
            <br />
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com</a>
          </p>

          <h3>{t(txt.ipTitle)}</h3>
          <p>{t(txt.ip)}</p>

          <h3>{t(txt.dataTitle)}</h3>
          <p>{t(txt.data)}</p>
        </div>
      </dialog>
    </footer>
  );
}
