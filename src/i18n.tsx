import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Langues du site. Pour corriger une traduction : modifier le texte dans `ui` ci-dessous
// ou dans les fichiers de src/data/ (chaque texte y existe en fr / en / de).
export const LANGS = ["fr", "en", "de"] as const;
export type Lang = (typeof LANGS)[number];
export type Localized = Record<Lang, string>;

const STORAGE_KEY = "grace-lang";

/** Langue au premier affichage : ?lang= dans l'adresse, puis dernier choix, puis langue du navigateur, sinon français. */
function initialLang(): Lang {
  const isLang = (value: string | null | undefined): value is Lang => !!value && (LANGS as readonly string[]).includes(value);
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isLang(fromUrl)) return fromUrl;
  } catch {
    /* ignore */
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* ignore */
  }
  for (const browser of navigator.languages ?? [navigator.language]) {
    const code = browser.slice(0, 2).toLowerCase();
    if (isLang(code)) return code;
  }
  return "fr";
}

export const ui = {
  pageTitle: { fr: "Grâce Charpy — Athlète", en: "Grâce Charpy — Athlete", de: "Grâce Charpy — Athletin" },
  pageDescription: {
    fr: "Portfolio de Grâce Charpy, ancienne gymnaste de haut niveau et athlète de course.",
    en: "Portfolio of Grâce Charpy, former elite gymnast and runner.",
    de: "Portfolio von Grâce Charpy, ehemalige Leistungsturnerin und Läuferin.",
  },
  langSwitch: { fr: "Choisir la langue", en: "Choose language", de: "Sprache wählen" },

  navLabel: { fr: "Navigation principale", en: "Main navigation", de: "Hauptnavigation" },
  navJourney: { fr: "Parcours", en: "Journey", de: "Werdegang" },
  navPartners: { fr: "Partenariats", en: "Partnerships", de: "Partnerschaften" },
  navContact: { fr: "Contact", en: "Contact", de: "Kontakt" },

  heroEyebrow: {
    fr: "Ancienne gymnaste internationale · Athlète N2",
    en: "Former international gymnast · French national level athlete (N2)",
    de: "Ehemalige internationale Turnerin · Athletin auf französischem Nationalniveau (N2)",
  },
  heroStatement: {
    fr: "De l’équipe de France de gymnastique aux pistes d’athlétisme. Une trajectoire construite avec la même précision, le même engagement et un nouvel élan.",
    en: "From the French national gymnastics team to the athletics track. A path built with the same precision, the same commitment and a fresh momentum.",
    de: "Von der französischen Turn-Nationalmannschaft auf die Leichtathletikbahn. Ein Weg mit derselben Präzision, demselben Engagement und neuem Schwung.",
  },
  ctaContact: { fr: "Me contacter", en: "Get in touch", de: "Kontakt aufnehmen" },
  ctaContactLabel: {
    fr: "Contacter Grâce Charpy par e-mail",
    en: "Email Grâce Charpy",
    de: "Grâce Charpy per E-Mail kontaktieren",
  },
  portraitLabel: {
    fr: "Portrait interactif de Grâce Charpy, entre course et gymnastique",
    en: "Interactive portrait of Grâce Charpy, between running and gymnastics",
    de: "Interaktives Porträt von Grâce Charpy, zwischen Laufen und Turnen",
  },
  portraitAlt: {
    fr: "Grâce Charpy en tenue de course noire lors d’un événement Blocks League",
    en: "Grâce Charpy in black running kit at a Blocks League event",
    de: "Grâce Charpy in schwarzem Laufoutfit bei einem Blocks-League-Event",
  },
  portraitDesktop: {
    fr: "Déplacez le pointeur pour révéler",
    en: "Move your cursor to reveal",
    de: "Bewegen Sie den Mauszeiger, um mehr zu sehen",
  },
  portraitFlip: {
    fr: "Touchez la photo pour la retourner",
    en: "Tap the photo to flip it",
    de: "Tippen Sie auf das Foto, um es umzudrehen",
  },
  portraitBack: { fr: "Touchez pour revenir", en: "Tap to go back", de: "Tippen Sie, um zurückzukehren" },
  portraitCaption: { fr: "Course / Gymnastique", en: "Running / Gymnastics", de: "Laufen / Turnen" },
  performances: { fr: "Performances", en: "Performances", de: "Leistungen" },
  performancesLabel: {
    fr: "Repères sportifs vérifiés",
    en: "Verified sporting highlights",
    de: "Verifizierte sportliche Eckdaten",
  },
  heroIndex: { fr: "01 — Mouvement", en: "01 — Movement", de: "01 — Bewegung" },
  scroll: { fr: "Défiler", en: "Scroll", de: "Scrollen" },
  scrollLabel: {
    fr: "Descendre vers le parcours",
    en: "Scroll down to the journey",
    de: "Zum Werdegang scrollen",
  },

  timelineEyebrow: { fr: "Parcours sportif", en: "Sporting journey", de: "Sportlicher Werdegang" },
  timelineTitle: {
    fr: "Du praticable à la ligne de départ.",
    en: "From the gymnastics floor to the starting line.",
    de: "Vom Turnboden an die Startlinie.",
  },
  timelinePeriod: { fr: "2009 — aujourd’hui", en: "2009 — today", de: "2009 — heute" },
  disciplines: { fr: "Disciplines", en: "Disciplines", de: "Disziplinen" },
  gym: { fr: "Gymnastique", en: "Gymnastics", de: "Turnen" },
  athle: { fr: "Athlétisme", en: "Athletics", de: "Leichtathletik" },
  next: { fr: "À suivre…", en: "To be continued…", de: "Fortsetzung folgt…" },
  nextGoals: {
    fr: "des 10 km, des semis, des marathons",
    en: "10K races, half marathons, marathons",
    de: "10-km-Läufe, Halbmarathons, Marathons",
  },

  partnersEyebrow: { fr: "Partenariats · Visibilité", en: "Partnerships · Visibility", de: "Partnerschaften · Sichtbarkeit" },
  partnersTitle: { fr: "Ils ont couru avec Grâce.", en: "They ran with Grâce.", de: "Sie liefen mit Grâce." },
  partnersIntro: {
    fr: "Des marques de sport, de nutrition et des courses de la Loire lui ont déjà confié leur image, sur la piste comme sur Instagram.",
    en: "Sports and nutrition brands, as well as races across the Loire, have already trusted her with their image, on the track and on Instagram.",
    de: "Sport- und Ernährungsmarken sowie Laufveranstaltungen aus der Loire haben ihr bereits ihr Image anvertraut, auf der Bahn wie auf Instagram.",
  },
  statsLabel: {
    fr: "Audience Instagram de Grâce Charpy (ouvre Instagram dans un nouvel onglet)",
    en: "Grâce Charpy’s Instagram audience (opens Instagram in a new tab)",
    de: "Instagram-Reichweite von Grâce Charpy (öffnet Instagram in einem neuen Tab)",
  },
  partnersGridLabel: {
    fr: "Marques et événements partenaires",
    en: "Partner brands and events",
    de: "Partnermarken und -events",
  },
  openSite: {
    fr: "ouvrir le site (nouvel onglet)",
    en: "open website (new tab)",
    de: "Website öffnen (neuer Tab)",
  },

  contactEyebrow: {
    fr: "Collaborations · Projets · Partenariats",
    en: "Collaborations · Projects · Partnerships",
    de: "Kooperationen · Projekte · Partnerschaften",
  },
  contactTitle: {
    fr: "Me contacter pour vos projets.",
    en: "Get in touch about your projects.",
    de: "Kontaktieren Sie mich für Ihre Projekte.",
  },
  contactLinksLabel: {
    fr: "Coordonnées de Grâce Charpy",
    en: "Grâce Charpy’s contact details",
    de: "Kontaktdaten von Grâce Charpy",
  },
  email: { fr: "E-mail", en: "Email", de: "E-Mail" },
  backToTop: { fr: "Retour en haut", en: "Back to top", de: "Nach oben" },
} satisfies Record<string, Localized>;

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: (text: Localized) => string };

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = ui.pageTitle[lang];
    document.querySelector('meta[name="description"]')?.setAttribute("content", ui.pageDescription[lang]);
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    try {
      const url = new URL(window.location.href);
      if (next === "fr") url.searchParams.delete("lang");
      else url.searchParams.set("lang", next);
      window.history.replaceState(null, "", url);
    } catch {
      /* ignore */
    }
  };

  return <LangContext.Provider value={{ lang, setLang, t: (text) => text[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang doit être utilisé dans <LangProvider>");
  return value;
}

export function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-switch" role="group" aria-label={t(ui.langSwitch)}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          className={lang === code ? "is-active" : undefined}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
