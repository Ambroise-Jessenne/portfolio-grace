import type { Localized } from "@/i18n";

export type EvidenceStatus = "verified" | "user-provided" | "editorial";

export type SportFact = {
  id: string;
  label: Localized;
  value: Localized;
  detail: Localized;
  status: EvidenceStatus;
  sourceLabel?: string;
  sourceUrl?: string;
  corroboratingSources?: Array<{
    label: string;
    url: string;
    scope: string;
  }>;
  note?: string;
};

export const officialProfiles = {
  ffa: "https://www.athle.fr/athletes/2810256/resultats",
  club: "https://coquelicot42.athle.fr/",
} as const;

// Base éditoriale centralisée. Les éléments `user-provided` ou `editorial`
// ne doivent pas être présentés comme des résultats acquis sans nouvelle source.
export const sportFacts: SportFact[] = [
  {
    id: "mediterranean-games-2018",
    label: { fr: "Équipe de France", en: "Team France", de: "Nationalmannschaft" },
    value: { fr: "Argent", en: "Silver", de: "Silber" },
    detail: { fr: "Jeux méditerranéens 2018, concours par équipes", en: "2018 Mediterranean Games, team competition", de: "Mittelmeerspiele 2018, Mannschaftswettbewerb" },
    status: "verified",
    sourceLabel: "FFGym Auvergne–Rhône-Alpes",
    sourceUrl:
      "https://auvergne-rhone-alpes.ffgym.fr/Actualites/Jeux-Mediterraneens-2018-une-competition-pleine-de-reussite-pour-les-Bleus",
  },
  {
    id: "run-in-lyon-2023",
    label: { fr: "Run in Lyon", en: "Run in Lyon", de: "Run in Lyon" },
    value: { fr: "1re", en: "1st", de: "1." },
    detail: { fr: "10 km 2023 en 35 min 49 s", en: "10 km in 2023, in 35 min 49 s", de: "10 km 2023 in 35:49 min" },
    status: "verified",
    sourceLabel: "Run in Lyon",
    sourceUrl:
      "https://www.runinlyon.com/fr/actus/ambiance-sportive-et-festive-pour-la-13e-edition/20",
  },
  {
    id: "ffa-5000-2026",
    label: { fr: "5 000 m", en: "5,000 m", de: "5.000 m" },
    value: { fr: "16’51’’82", en: "16’51’’82", de: "16’51’’82" },
    detail: { fr: "Niveau N2, Blois 2026", en: "French national level (N2), Blois 2026", de: "Französisches Nationalniveau (N2), Blois 2026" },
    status: "verified",
    sourceLabel: "Fédération Française d’Athlétisme",
    sourceUrl: officialProfiles.ffa,
  },
  {
    id: "open-france-5000",
    label: { fr: "Open de France", en: "Open de France", de: "Open de France" },
    value: { fr: "2 éditions", en: "2 editions", de: "2 Ausgaben" },
    detail: { fr: "5 000 m à Thonon-les-Bains en 2025 et Blois en 2026", en: "5,000 m in Thonon-les-Bains (2025) and Blois (2026)", de: "5.000 m in Thonon-les-Bains (2025) und Blois (2026)" },
    status: "verified",
    sourceLabel: "Fédération Française d’Athlétisme",
    sourceUrl: officialProfiles.ffa,
    corroboratingSources: [
      {
        label: "World Athletics",
        url: "https://worldathletics.org/competition/calendar-results/results/7226083",
        scope: "Identifie l’Open de France des 26 et 27 juillet 2025 à Thonon-les-Bains.",
      },
    ],
    note:
      "Qualification obtenue par recoupement : la FFA attribue à Grâce Charpy le 5 000 m du 26 juillet 2025 à Thonon-les-Bains en 17’03’’73 ; World Athletics identifie l’événement organisé à ces date et lieu comme l’Open de France.",
  },
  {
    id: "sainte-city-run",
    label: { fr: "Sainté City Run", en: "Sainté City Run", de: "Sainté City Run" },
    value: { fr: "3 victoires", en: "3 wins", de: "3 Siege" },
    detail: { fr: "12 km, trois éditions consécutives de 2023 à 2025", en: "12 km, three editions in a row from 2023 to 2025", de: "12 km, drei Ausgaben in Folge von 2023 bis 2025" },
    status: "verified",
    sourceLabel: "Résultats Logicourse et organisateurs",
    sourceUrl:
      "https://www.logicourse.fr/images/newsite/manifestations/stecityrun/cityrun2023km12v2.pdf",
    note: "2024 et 2025 sont corroborées par les comptes rendus et classements publics correspondants.",
  },
  {
    id: "interclubs-n1b-2026",
    label: { fr: "Coquelicot 42", en: "Coquelicot 42", de: "Coquelicot 42" },
    value: { fr: "N1B", en: "N1B", de: "N1B" },
    detail: { fr: "Équipe maintenue en Nationale 1B aux Interclubs 2026", en: "Team kept its place in National 1B at the 2026 Interclubs", de: "Mannschaft hält 2026 bei den Interclubs die Nationale 1B" },
    status: "verified",
    sourceLabel: "Coquelicot 42",
    sourceUrl:
      "https://coquelicot42.athle.fr/asp.net/espaces.news/news.aspx?id=369250",
  },
  {
    id: "paris-20k-2026",
    label: { fr: "20 km de Paris", en: "20 km de Paris", de: "20 km de Paris" },
    value: { fr: "Invitation annoncée", en: "Invitation announced", de: "Einladung angekündigt" },
    detail: { fr: "Information communiquée pour octobre 2026, non corroborée publiquement", en: "Information provided for October 2026, not publicly confirmed", de: "Angabe für Oktober 2026, öffentlich nicht bestätigt" },
    status: "user-provided",
    note: "Ne pas publier comme participation ou résultat sans confirmation officielle.",
  },
  {
    id: "road-ambitions",
    label: { fr: "Projection", en: "Outlook", de: "Ausblick" },
    value: { fr: "Semi-marathon & marathon", en: "Half marathon & marathon", de: "Halbmarathon & Marathon" },
    detail: { fr: "Ambition éditoriale à confirmer directement avec Grâce", en: "Editorial ambition to be confirmed with Grâce", de: "Redaktionelles Ziel, mit Grâce abzustimmen" },
    status: "editorial",
    note: "La FFA confirme déjà un semi-marathon en 1 h 17 min 38 s à Feurs en 2026.",
  },
];

export const heroProofs = sportFacts.filter((fact) =>
  ["mediterranean-games-2018", "ffa-5000-2026", "run-in-lyon-2023", "sainte-city-run"].includes(fact.id),
);
