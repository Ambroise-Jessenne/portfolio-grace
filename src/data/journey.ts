import type { EvidenceStatus } from "@/data/sport-profile";
import { officialProfiles } from "@/data/sport-profile";

export type JourneyItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  status: EvidenceStatus;
  sourceUrl?: string;
  corroboratingSourceUrl?: string;
  verificationNote?: string;
};

// Sélection éditoriale destinée à la future frise. Le composant existe,
// mais reste volontairement hors de la page tant que son intégration n’est pas demandée.
// `user-provided` signifie que le jalon doit encore être rapproché d’une archive publique.
export const journey: JourneyItem[] = [
  {
    id: "avenir-2009",
    label: "2009",
    title: "Un premier titre national",
    description:
      "Grâce remporte les Coupes nationales et devient championne de France Avenir.",
    status: "user-provided",
    verificationNote:
      "Palmarès communiqué directement par l’utilisateur ; archive publique encore à identifier.",
  },
  {
    id: "france-espoir-2011",
    label: "2011",
    title: "Première sélection tricolore",
    description:
      "Pour sa première sélection en équipe de France Espoir à Combs-la-Ville, elle termine deuxième en individuel et première par équipes.",
    status: "user-provided",
    verificationNote:
      "Palmarès communiqué directement par l’utilisateur ; archive publique encore à identifier.",
  },
  {
    id: "gymnasiades-2013",
    label: "2013",
    title: "Aux portes du podium mondial scolaire",
    description:
      "Grâce se classe quatrième aux Gymnasiades au Brésil et troisième au sol aux Championnats de France.",
    status: "user-provided",
    verificationNote:
      "Palmarès communiqué directement par l’utilisateur ; résultats publics détaillés encore à rapprocher.",
  },
  {
    id: "top-12-2017",
    label: "2017",
    title: "Championne de France par équipes",
    description:
      "Avec l’Indépendante Stéphanoise, elle remporte le Top 12 et prend la troisième place de la finale nationale au sol.",
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
    label: "2018",
    title: "L’argent avec les Bleues",
    description:
      "L’équipe de France féminine décroche la médaille d’argent aux Jeux méditerranéens de Tarragone.",
    status: "verified",
    sourceUrl:
      "https://auvergne-rhone-alpes.ffgym.fr/Actualites/Jeux-Mediterraneens-2018-une-competition-pleine-de-reussite-pour-les-Bleus",
    verificationNote:
      "Résultat corroboré par la Fédération Française de Gymnastique. Les titres universitaires 2018, fournis par l’utilisateur, restent conservés hors de cette sélection courte.",
  },
  {
    id: "dn1-elite-2019",
    label: "2019",
    title: "Un dernier chapitre national",
    description:
      "Championne de France DN1 par équipes, Grâce participe également aux Championnats de France Élite.",
    status: "user-provided",
    verificationNote:
      "Formulation volontairement limitée à une participation à France Élite. Palmarès communiqué directement par l’utilisateur.",
  },
  {
    id: "athletics-2021",
    label: "2021",
    title: "Une nouvelle discipline",
    description:
      "Grâce rejoint le Coquelicot 42 et engage sa reconversion vers le demi-fond et la course.",
    status: "verified",
    sourceUrl: officialProfiles.ffa,
  },
  {
    id: "run-in-lyon-2023",
    label: "2023",
    title: "Victoire à Lyon",
    description: "Elle remporte le 10 km du Run in Lyon en 35 min 49 s.",
    status: "verified",
    sourceUrl:
      "https://www.runinlyon.com/fr/actus/ambiance-sportive-et-festive-pour-la-13e-edition/20",
  },
  {
    id: "open-france-2025",
    label: "2025",
    title: "Premier Open de France",
    description: "Elle court le 5 000 m à Thonon-les-Bains en 17 min 03 s 73.",
    status: "verified",
    sourceUrl: officialProfiles.ffa,
    corroboratingSourceUrl:
      "https://worldathletics.org/competition/calendar-results/results/7226083",
    verificationNote:
      "Recoupement : la FFA confirme l’athlète, l’épreuve, la performance, la date et le lieu ; World Athletics confirme que l’événement des 26–27 juillet 2025 à Thonon-les-Bains est l’Open de France.",
  },
  {
    id: "open-france-2026",
    label: "2026",
    title: "Le cap N2",
    description:
      "Neuvième du 5 000 m à l’Open de France de Blois en 16 min 51 s 82, une performance classée N2.",
    status: "verified",
    sourceUrl: officialProfiles.ffa,
  },
];
