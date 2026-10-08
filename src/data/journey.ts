import type { EvidenceStatus } from "@/data/sport-profile";
import type { Localized } from "@/i18n";
import { officialProfiles } from "@/data/sport-profile";

export type JourneyPhoto = {
  /** Chemin relatif au dossier public/ (ex. "images/parcours/xxx.jpg"). */
  src: string;
  alt: Localized;
  /** Cadrage CSS object-position, ex. "50% 30%". */
  position?: string;
};

export type JourneyItem = {
  id: string;
  discipline: "gym" | "athle";
  photos?: JourneyPhoto[];
  label: string;
  title: Localized;
  description: Localized;
  status: EvidenceStatus;
  sourceUrl?: string;
  corroboratingSourceUrl?: string;
  verificationNote?: string;
};

// Sélection éditoriale affichée dans la frise « Parcours ».
// Pour changer une photo : déposer le fichier dans public/images/parcours/ et modifier `photos`.
// `user-provided` signifie que le jalon doit encore être rapproché d’une archive publique.
export const journey: JourneyItem[] = [
  {
    id: "avenir-2009",
    discipline: "gym",
    photos: [
      { src: "images/parcours/gym-justaucorps.jpg", alt: { fr: "Grâce Charpy en justaucorps noir, assise sur un praticable", en: "Grâce Charpy in a black leotard, seated on the gymnastics floor", de: "Grâce Charpy in schwarzem Turnanzug, auf dem Turnboden sitzend" }, position: "50% 35%" },
    ],
    label: "2009",
    title: { fr: "Un premier titre national", en: "A first national title", de: "Ein erster nationaler Titel" },
    description: { fr: "Victoire aux Coupes nationales et titre de championne de France Avenir.", en: "Won the National Cups and the French championship title in the Avenir (youth) category.", de: "Sieg bei den nationalen Pokalwettbewerben und französischer Meistertitel in der Nachwuchskategorie Avenir." },
    status: "user-provided",
    verificationNote:
      "Palmarès communiqué directement par l’utilisateur ; archive publique encore à identifier.",
  },
  {
    id: "france-espoir-2011",
    discipline: "gym",
    photos: [
      { src: "images/parcours/gym-rouge.jpg", alt: { fr: "Grâce Charpy en justaucorps rouge, bras levé, en compétition", en: "Grâce Charpy in a red leotard, arm raised, in competition", de: "Grâce Charpy in rotem Turnanzug mit erhobenem Arm im Wettkampf" }, position: "50% 40%" },
    ],
    label: "2011",
    title: { fr: "Première sélection tricolore", en: "First call-up for France", de: "Erste Nominierung für Frankreich" },
    description: { fr: "Première sélection en équipe de France Espoir à Combs-la-Ville : deuxième place en individuel, victoire par équipes.", en: "First selection for the French Espoir (junior) team in Combs-la-Ville: second in the individual event, victory with the team.", de: "Erste Nominierung für die französische Nachwuchsmannschaft (Espoir) in Combs-la-Ville: Platz zwei im Einzel, Sieg mit dem Team." },
    status: "user-provided",
    verificationNote:
      "Palmarès communiqué directement par l’utilisateur ; archive publique encore à identifier.",
  },
  {
    id: "gymnasiades-2013",
    discipline: "gym",
    photos: [
      { src: "images/parcours/gym-sol-nb.jpg", alt: { fr: "Grâce Charpy en mouvement au sol, photo en noir et blanc", en: "Grâce Charpy during a floor routine, black and white photo", de: "Grâce Charpy bei einer Bodenübung, Schwarz-Weiß-Foto" }, position: "50% 40%" },
    ],
    label: "2013",
    title: { fr: "Aux portes du podium mondial scolaire", en: "Close to a world schools podium", de: "Knapp am Podest der Schul-Weltspiele" },
    description: { fr: "Quatrième place aux Gymnasiades au Brésil, troisième place au sol aux Championnats de France.", en: "Fourth at the Gymnasiade (World School Games) in Brazil, third on floor at the French Championships.", de: "Vierter Platz bei der Gymnasiade (Schul-Weltspiele) in Brasilien, dritter Platz am Boden bei den französischen Meisterschaften." },
    status: "user-provided",
    verificationNote:
      "Palmarès communiqué directement par l’utilisateur ; résultats publics détaillés encore à rapprocher.",
  },
  {
    id: "top-12-2017",
    discipline: "gym",
    photos: [
      { src: "images/parcours/gym-sol-scene.jpg", alt: { fr: "Grâce Charpy en position au sol, sous les projecteurs", en: "Grâce Charpy posing on the floor under the spotlights", de: "Grâce Charpy in Pose auf dem Turnboden im Scheinwerferlicht" }, position: "50% 40%" },
    ],
    label: "2017",
    title: { fr: "Championne de France par équipes", en: "French team champion", de: "Französische Mannschaftsmeisterin" },
    description: { fr: "Victoire au Top 12 avec l’Indépendante Stéphanoise et troisième place en finale nationale au sol.", en: "Won the Top 12 with L’Indépendante Stéphanoise and placed third in the national floor final.", de: "Sieg im Top 12 mit L’Indépendante Stéphanoise und dritter Platz im nationalen Bodenfinale." },
    status: "verified",
    sourceUrl:
      "https://www.ffgym.fr/content/2017_-_mars_-_g_a_f__t_o_p_12_g_a_f_s_a_i_n_t-e_t_i_e_n_n_e_c_h_a_m_p_i_o_n_m_e_a_u_x_s_e_u_l_e_m_e_n_t_4em_e",
    corroboratingSourceUrl:
      "https://www.ffgym.fr/content/2017_-_mai_-_g_a_m__g_a_f_-_championnat_de_france_elite_ponts_de_ce_-_finals_par_agres",
    verificationNote:
      "Les deux résultats sont corroborés par des publications de la Fédération Française de Gymnastique.",
  },
  {
    id: "mediterranean-2018",
    discipline: "gym",
    photos: [
      { src: "images/parcours/gym-barres.jpg", alt: { fr: "Grâce Charpy en lâcher aux barres asymétriques", en: "Grâce Charpy performing a release move on the uneven bars", de: "Grâce Charpy bei einem Flugelement am Stufenbarren" }, position: "55% 40%" },
    ],
    label: "2018",
    title: { fr: "L’argent avec les Bleues", en: "Silver with Team France", de: "Silber mit Frankreich" },
    description: { fr: "Médaille d’argent avec l’équipe de France féminine aux Jeux méditerranéens de Tarragone.", en: "Silver medal with the French women’s team at the Mediterranean Games in Tarragona.", de: "Silbermedaille mit der französischen Frauenmannschaft bei den Mittelmeerspielen in Tarragona." },
    status: "verified",
    sourceUrl:
      "https://auvergne-rhone-alpes.ffgym.fr/Actualites/Jeux-Mediterraneens-2018-une-competition-pleine-de-reussite-pour-les-Bleus",
    verificationNote:
      "Résultat corroboré par la Fédération Française de Gymnastique. Les titres universitaires 2018, fournis par l’utilisateur, restent conservés hors de cette sélection courte.",
  },
  {
    id: "dn1-elite-2019",
    discipline: "gym",
    photos: [
      { src: "images/parcours/gym-blanc-nb.jpg", alt: { fr: "Grâce Charpy de dos en justaucorps blanc, bras tendu, en noir et blanc", en: "Grâce Charpy from behind in a white leotard, arm extended, black and white", de: "Grâce Charpy von hinten in weißem Turnanzug mit ausgestrecktem Arm, Schwarz-Weiß" }, position: "50% 35%" },
    ],
    label: "2019",
    title: { fr: "Un dernier chapitre national", en: "A final national chapter", de: "Ein letztes nationales Kapitel" },
    description: { fr: "Titre de championne de France DN1 par équipes et participation aux Championnats de France Élite.", en: "French team champion in DN1, the top national division, and competed at the French Elite Championships.", de: "Französische Mannschaftsmeisterin in der DN1, der höchsten nationalen Liga, und Teilnahme an den französischen Elite-Meisterschaften." },
    status: "user-provided",
    verificationNote:
      "Formulation volontairement limitée à une participation à France Élite. Palmarès communiqué directement par l’utilisateur.",
  },
  {
    id: "athletics-2021",
    discipline: "athle",
    photos: [
      { src: "images/parcours/trail-lumiere.jpg", alt: { fr: "Grâce Charpy en course sur un sentier, à contre-jour", en: "Grâce Charpy running on a trail, backlit", de: "Grâce Charpy beim Laufen auf einem Pfad im Gegenlicht" }, position: "50% 45%" },
    ],
    label: "2021",
    title: { fr: "Une nouvelle discipline", en: "A new discipline", de: "Eine neue Disziplin" },
    description: { fr: "Arrivée au Coquelicot 42 et début de la reconversion vers le demi-fond et la course.", en: "Joined the Coquelicot 42 club and began her switch to middle-distance and road running.", de: "Wechsel zum Verein Coquelicot 42 und Beginn der Umstellung auf Mittelstrecke und Straßenlauf." },
    status: "verified",
    sourceUrl: officialProfiles.ffa,
  },
  {
    id: "run-in-lyon-2023",
    discipline: "athle",
    photos: [
      { src: "images/parcours/run-in-lyon-arrivee.jpg", alt: { fr: "Grâce Charpy franchit la ligne d’arrivée du Run in Lyon, bras levés", en: "Grâce Charpy crosses the Run in Lyon finish line, arms raised", de: "Grâce Charpy überquert mit erhobenen Armen die Ziellinie des Run in Lyon" }, position: "50% 30%" },
      { src: "images/parcours/run-in-lyon-course.jpg", alt: { fr: "Grâce Charpy en pleine course dans les rues de Lyon", en: "Grâce Charpy racing through the streets of Lyon", de: "Grâce Charpy im Rennen durch die Straßen von Lyon" }, position: "50% 30%" },
    ],
    label: "2023",
    title: { fr: "Victoire à Lyon", en: "Victory in Lyon", de: "Sieg in Lyon" },
    description: { fr: "Victoire pour une première participation au Run in Lyon : 10 km bouclés en 35 min 49 s.", en: "Won the Run in Lyon on her first appearance: 10 km in 35 min 49 s.", de: "Sieg bei der ersten Teilnahme am Run in Lyon: 10 km in 35:49 min." },
    status: "verified",
    sourceUrl:
      "https://www.runinlyon.com/fr/actus/ambiance-sportive-et-festive-pour-la-13e-edition/20",
  },
  {
    id: "nice-10k-2024",
    discipline: "athle",
    photos: [
      { src: "images/parcours/nice-10km.jpg", alt: { fr: "Grâce Charpy en course sur le 10 km de Nice", en: "Grâce Charpy racing the Nice 10K", de: "Grâce Charpy beim 10-km-Lauf in Nizza" }, position: "40% 25%" },
    ],
    label: "2024",
    title: { fr: "Sous les 35 minutes", en: "Under 35 minutes", de: "Unter 35 Minuten" },
    description: { fr: "10 km de Nice bouclés en 34 min 52 s, sa meilleure performance sur la distance.", en: "10 km in Nice in 34 min 52 s, her personal best over the distance.", de: "10 km in Nizza in 34:52 min, ihre Bestzeit über diese Distanz." },
    status: "verified",
    sourceUrl: officialProfiles.ffa,
    verificationNote: "Record personnel sur 10 km route daté du 7 janvier 2024 sur la fiche FFA.",
  },
  {
    id: "open-france-2025",
    discipline: "athle",
    photos: [
      { src: "images/parcours/piste-dossard-10.jpg", alt: { fr: "Grâce Charpy en course sur piste, dossard 10", en: "Grâce Charpy racing on the track, bib number 10", de: "Grâce Charpy beim Bahnrennen mit Startnummer 10" }, position: "50% 30%" },
    ],
    label: "2025",
    title: { fr: "Premier Open de France", en: "A first Open de France", de: "Erstes Open de France" },
    description: { fr: "Première participation à l’Open de France, sur 5 000 m à Thonon-les-Bains, en 17 min 03 s 73.", en: "First appearance at the Open de France, over 5,000 m in Thonon-les-Bains, in 17:03.73.", de: "Erste Teilnahme am Open de France über 5.000 m in Thonon-les-Bains in 17:03,73 min." },
    status: "verified",
    sourceUrl: officialProfiles.ffa,
    corroboratingSourceUrl:
      "https://worldathletics.org/competition/calendar-results/results/7226083",
    verificationNote:
      "Recoupement : la FFA confirme l’athlète, l’épreuve, la performance, la date et le lieu ; World Athletics confirme que l’événement des 26–27 juillet 2025 à Thonon-les-Bains est l’Open de France.",
  },
  {
    id: "feurs-semi-2026",
    discipline: "athle",
    photos: [
      { src: "images/parcours/feurs-semi.jpg", alt: { fr: "Grâce Charpy, médaille du semi-marathon de Feurs en main", en: "Grâce Charpy holding her Feurs Half Marathon medal", de: "Grâce Charpy mit ihrer Medaille vom Halbmarathon in Feurs" }, position: "50% 32%" },
    ],
    label: "2026",
    title: { fr: "Cap sur le semi", en: "Stepping up to the half", de: "Kurs auf den Halbmarathon" },
    description: { fr: "Semi-marathon de Feurs en 1 h 17 min 38 s, troisième au classement féminin.", en: "Feurs Half Marathon in 1:17:38, third woman overall.", de: "Halbmarathon in Feurs in 1:17:38 Std., drittschnellste Frau." },
    status: "verified",
    sourceUrl: officialProfiles.ffa,
    verificationNote: "Résultat du 22 mars 2026 sur la fiche FFA (3e féminine).",
  },
  {
    id: "open-france-2026",
    discipline: "athle",
    photos: [
      { src: "images/parcours/piste-foulee.jpg", alt: { fr: "Grâce Charpy en pleine foulée sur la piste", en: "Grâce Charpy in full stride on the track", de: "Grâce Charpy in vollem Schritt auf der Bahn" }, position: "50% 45%" },
    ],
    label: "2026",
    title: { fr: "Le cap N2", en: "Reaching N2", de: "Die N2-Marke" },
    description: { fr: "Neuvième place sur 5 000 m à l’Open de France de Blois en 16 min 51 s 82, une performance classée N2.", en: "Ninth over 5,000 m at the Open de France in Blois in 16:51.82, a time ranked at French national level (N2).", de: "Neunter Platz über 5.000 m beim Open de France in Blois in 16:51,82 min, eine Leistung auf französischem Nationalniveau (N2)." },
    status: "verified",
    sourceUrl: officialProfiles.ffa,
  },
];
