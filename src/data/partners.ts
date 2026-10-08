import type { Localized } from "@/i18n";

// Marques et événements qui ont déjà travaillé avec Grâce.
// Pour ajouter un partenaire : déposer son logo dans public/images/partenaires/
// puis ajouter une ligne ci-dessous.

export type PartnerCategory = "Équipement" | "Nutrition" | "Événement" | "Partenaire";

/** Traduction des catégories affichées sous chaque logo. */
export const categoryLabels: Record<PartnerCategory, Localized> = {
  Équipement: { fr: "Équipement", en: "Equipment", de: "Ausrüstung" },
  Nutrition: { fr: "Nutrition", en: "Nutrition", de: "Ernährung" },
  Événement: { fr: "Événement", en: "Event", de: "Event" },
  Partenaire: { fr: "Partenaire", en: "Partner", de: "Partner" },
};

export type Partner = {
  id: string;
  name: string;
  category: PartnerCategory;
  /** Site officiel ouvert au clic (null = pas encore de lien). */
  url: string | null;
  /** Chemin du logo dans public/ (null = nom affiché en texte). */
  logo: string | null;
  /** Format du logo : "wide" (bandeau), "medium", "square" (badge). */
  shape?: "wide" | "medium" | "square";
  /** true = logo en couleurs (badge illustré), sinon logo monochrome. */
  colored?: boolean;
};

export const partners: Partner[] = [
  { id: "nike", name: "Nike", category: "Équipement", url: "https://www.nike.com/fr/", logo: "images/partenaires/nike.svg", shape: "medium" },
  { id: "bv-sport", name: "BV Sport", category: "Équipement", url: "https://www.bvsport.com/fr/", logo: "images/partenaires/bv-sport.webp", shape: "medium" },
  { id: "fabletics", name: "Fabletics", category: "Équipement", url: "https://www.fabletics.fr/", logo: "images/partenaires/fabletics.webp", shape: "wide" },
  { id: "oceansapart", name: "Oceansapart", category: "Équipement", url: "https://www.oceansapart.com/fr-fr", logo: "images/partenaires/oceansapart.svg", shape: "wide" },
  { id: "terre-de-gymnaste", name: "Terre de Gymnaste", category: "Équipement", url: "https://www.terredegymnaste.fr/", logo: "images/partenaires/terre-de-gymnaste.webp", shape: "wide" },
  { id: "prozis", name: "Prozis", category: "Nutrition", url: "https://www.prozis.com/fr/fr", logo: "images/partenaires/prozis.webp", shape: "wide" },
  { id: "bonjour", name: "Bonjour", category: "Nutrition", url: "https://bonjourdrink.co/", logo: "images/partenaires/bonjour.webp", shape: "wide" },
  { id: "reload", name: "Reload", category: "Partenaire", url: "https://reloadstore.sumupstore.com/", logo: "images/partenaires/reload.webp", shape: "wide" },
  { id: "blocks-league", name: "Blocks League", category: "Événement", url: "https://blocks-league.com/", logo: "images/partenaires/blocks-league.webp", shape: "wide" },
  { id: "marathon-de-la-biere", name: "Marathon de la Bière", category: "Événement", url: "https://lemarathondelabiere.com/", logo: "images/partenaires/marathon-de-la-biere.webp", shape: "square" },
  { id: "foulees-de-noel", name: "Les Foulées de Noël", category: "Événement", url: "https://lesfouleesdenoel.fr/", logo: "images/partenaires/foulees-de-noel.webp", shape: "square" },
  { id: "course-des-babets", name: "La Course des Babets", category: "Événement", url: "https://lacoursedesbabets.fr/", logo: "images/partenaires/course-des-babets.webp", shape: "square", colored: true },
];

// Chiffres du compte Instagram @grace_charpy (à mettre à jour régulièrement).
export const audienceStats: Array<{ id: string; value: Localized; label: Localized }> = [
  { id: "followers", value: { fr: "14,5k", en: "14.5k", de: "14,5k" }, label: { fr: "Abonnés Instagram", en: "Instagram followers", de: "Instagram-Follower" } },
  { id: "views", value: { fr: "70k", en: "70k", de: "70k" }, label: { fr: "Vues en 1 mois", en: "Views in 1 month", de: "Aufrufe in 1 Monat" } },
];
