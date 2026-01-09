import { Evaluation, StoreType, WeatherType, Barrier, AuditStatus } from '@prisma/client'

export type { Evaluation, StoreType, WeatherType, Barrier, AuditStatus }

export interface CriterionData {
  eval: Evaluation | null
  comment: string | null
  photo: string | null
}

export interface AuditInfoData {
  auditorName?: string
  storeName?: string
  storeType?: StoreType
  categoryAnalyzed?: string
  weather?: WeatherType
}

export interface SeeItData {
  visibility?: CriterionData
  visualBreak?: CriterionData
  curves?: CriterionData
  movement?: CriterionData
  visualHierarchy?: CriterionData
}

export interface FindItData {
  branding?: CriterionData
  segmentation?: CriterionData
  heroProducts?: CriterionData
  taxonomy?: CriterionData
}

export interface ChooseItData {
  neuroEfficiency?: CriterionData
  simplicity?: CriterionData
  conciseness?: CriterionData
  choiceHelp?: CriterionData
  readingHierarchy?: CriterionData
}

export interface BuyItData {
  cta?: CriterionData
  visibleBenefit?: CriterionData
  hotZone?: CriterionData
  availability?: CriterionData
  price?: CriterionData
}

export interface GoldenRulesData {
  visualHierarchy?: boolean
  simplicity?: boolean
  writeRight?: boolean
  productHighlight?: boolean
  curves?: boolean
  movement?: boolean
  productInContext?: boolean
  shortMessage?: boolean
  effectiveCta?: boolean
  humanFaces?: boolean
}

export interface ExpertiseData {
  barriers?: Barrier[]
  mainObservation?: string
  pharmacistHelped?: boolean
}

export const WIZARD_STEPS = [
  { id: 0, name: 'Informations', shortName: 'Info' },
  { id: 1, name: 'See It', shortName: 'See' },
  { id: 2, name: 'Find It', shortName: 'Find' },
  { id: 3, name: 'Choose It', shortName: 'Choose' },
  { id: 4, name: 'Buy It', shortName: 'Buy' },
  { id: 5, name: 'Golden Rules', shortName: 'Rules' },
  { id: 6, name: 'Expertise', shortName: 'Expert' },
  { id: 7, name: 'Récapitulatif', shortName: 'Recap' },
] as const

export const CRITERIA_SEEIT = [
  { key: 'visibility', label: 'Visibilité à distance', question: 'La catégorie est-elle repérable de loin ?' },
  { key: 'visualBreak', label: 'Rupture Visuelle', question: 'Éléments perturbant le regard (mode pilote auto OFF) ?' },
  { key: 'curves', label: 'Courbes vs Lignes', question: 'Utilisation de formes courbes ?' },
  { key: 'movement', label: 'Mouvement', question: 'Mouvement physique ou implicite ?' },
  { key: 'visualHierarchy', label: 'Hiérarchie Visuelle', question: 'Couleurs/Formes > Texte ?' },
] as const

export const CRITERIA_FINDIT = [
  { key: 'branding', label: 'Branding', question: 'Marque immédiatement reconnaissable ?' },
  { key: 'segmentation', label: 'Segmentation', question: 'Claire (ex: code couleur) ou lecture nécessaire ?' },
  { key: 'heroProducts', label: 'Produits Héros', question: 'Mis en avant (glorifiés) ?' },
  { key: 'taxonomy', label: 'Taxonomie', question: 'Logique pour un non-expert ?' },
] as const

export const CRITERIA_CHOOSEIT = [
  { key: 'neuroEfficiency', label: 'Neuro-Efficacité', question: 'Image à Gauche / Texte à Droite ?' },
  { key: 'simplicity', label: 'Simplicité', question: 'Vocabulaire simple (pas de jargon) ?' },
  { key: 'conciseness', label: 'Concision', question: 'Messages < 10 mots ?' },
  { key: 'choiceHelp', label: 'Aide au choix', question: 'Balisage aide-t-il à comparer ?' },
  { key: 'readingHierarchy', label: 'Hiérarchie de lecture', question: 'Logo > Variante > Bénéfice > Visuel déclencheur ?' },
] as const

export const CRITERIA_BUYIT = [
  { key: 'cta', label: 'Call To Action', question: 'Verbe d\'action clair ?' },
  { key: 'visibleBenefit', label: 'Bénéfice Visible', question: 'Fonctionnel ou émotionnel ?' },
  { key: 'hotZone', label: 'Zone Chaude', question: 'Best-sellers à hauteur des yeux (1m-1m30) ?' },
  { key: 'availability', label: 'Disponibilité', question: 'Pas de ruptures visibles ?' },
  { key: 'price', label: 'Prix', question: 'Clairement affiché ?' },
] as const

export const GOLDEN_RULES_LIST = [
  { key: 'visualHierarchy', label: 'Respect hiérarchie visuelle' },
  { key: 'simplicity', label: 'Simplicité' },
  { key: 'writeRight', label: 'Écrire à droite' },
  { key: 'productHighlight', label: 'Mise en avant produit' },
  { key: 'curves', label: 'Courbes' },
  { key: 'movement', label: 'Mouvement' },
  { key: 'productInContext', label: 'Produit en situation' },
  { key: 'shortMessage', label: 'Message court' },
  { key: 'effectiveCta', label: 'CTA efficace' },
  { key: 'humanFaces', label: 'Visages humains' },
] as const

export const BARRIERS_LIST = [
  { key: 'AWARENESS', label: 'Awareness', description: 'Je ne connais pas' },
  { key: 'COMPREHENSION', label: 'Compréhension', description: 'Je ne comprends pas l\'offre' },
  { key: 'PERTINENCE', label: 'Pertinence', description: 'Pas pour moi' },
  { key: 'VALEUR_PERCUE', label: 'Valeur Perçue', description: 'Trop cher pour ce que c\'est' },
  { key: 'USAGE', label: 'Usage', description: 'Ne sait pas utiliser' },
] as const
