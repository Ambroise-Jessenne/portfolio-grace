export type EvidenceStatus = "verified" | "user-provided" | "editorial";

export type SportFact = {
  id: string;
  label: string;
  value: string;
  detail: string;
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
    label: "Équipe de France",
    value: "Argent",
    detail: "Jeux méditerranéens 2018, concours par équipes",
    status: "verified",
    sourceLabel: "FFGym Auvergne–Rhône-Alpes",
    sourceUrl:
      "https://auvergne-rhone-alpes.ffgym.fr/Actualites/Jeux-Mediterraneens-2018-une-competition-pleine-de-reussite-pour-les-Bleus",
  },
  {
    id: "run-in-lyon-2023",
    label: "Run in Lyon",
    value: "1re",
    detail: "10 km 2023 en 35 min 49 s",
    status: "verified",
    sourceLabel: "Run in Lyon",
    sourceUrl:
      "https://www.runinlyon.com/fr/actus/ambiance-sportive-et-festive-pour-la-13e-edition/20",
  },
  {
    id: "ffa-5000-2026",
    label: "5 000 m",
    value: "16’51’’82",
    detail: "Niveau N2, Blois 2026",
    status: "verified",
    sourceLabel: "Fédération Française d’Athlétisme",
    sourceUrl: officialProfiles.ffa,
  },
  {
    id: "open-france-5000",
    label: "Open de France",
    value: "2 éditions",
    detail: "5 000 m à Thonon-les-Bains en 2025 et Blois en 2026",
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
    label: "Sainté City Run",
    value: "3 victoires",
    detail: "12 km, trois éditions consécutives de 2023 à 2025",
    status: "verified",
    sourceLabel: "Résultats Logicourse et organisateurs",
    sourceUrl:
      "https://www.logicourse.fr/images/newsite/manifestations/stecityrun/cityrun2023km12v2.pdf",
    note: "2024 et 2025 sont corroborées par les comptes rendus et classements publics correspondants.",
  },
  {
    id: "interclubs-n1b-2026",
    label: "Coquelicot 42",
    value: "N1B",
    detail: "Équipe maintenue en Nationale 1B aux Interclubs 2026",
    status: "verified",
    sourceLabel: "Coquelicot 42",
    sourceUrl:
      "https://coquelicot42.athle.fr/asp.net/espaces.news/news.aspx?id=369250",
  },
  {
    id: "paris-20k-2026",
    label: "20 km de Paris",
    value: "Invitation annoncée",
    detail: "Information communiquée pour octobre 2026, non corroborée publiquement",
    status: "user-provided",
    note: "Ne pas publier comme participation ou résultat sans confirmation officielle.",
  },
  {
    id: "road-ambitions",
    label: "Projection",
    value: "Semi-marathon & marathon",
    detail: "Ambition éditoriale à confirmer directement avec Grâce",
    status: "editorial",
    note: "La FFA confirme déjà un semi-marathon en 1 h 17 min 38 s à Feurs en 2026.",
  },
];

export const heroProofs = sportFacts.filter((fact) =>
  ["mediterranean-games-2018", "run-in-lyon-2023", "ffa-5000-2026"].includes(fact.id),
);
