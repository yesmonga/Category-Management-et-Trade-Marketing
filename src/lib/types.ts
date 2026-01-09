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
  { key: 'visibility', label: 'Visibilité à distance', question: 'La catégorie est-elle repérable de loin ?', hint: 'Place-toi au début de l\'allée centrale. Vois-tu la catégorie immédiatement ou est-elle noyée dans la masse ?' },
  { key: 'visualBreak', label: 'Rupture Visuelle', question: 'Éléments perturbant le regard (mode pilote auto OFF) ?', hint: 'Y a-t-il une couleur vive, une forme étrange ou un matériau différent qui "casse" la monotonie du rayon ?' },
  { key: 'curves', label: 'Courbes vs Lignes', question: 'Utilisation de formes courbes ?', hint: 'Les présentoirs utilisent-ils des arrondis ? (Les courbes attirent plus l\'attention que les angles droits).' },
  { key: 'movement', label: 'Mouvement', question: 'Mouvement physique ou implicite ?', hint: 'Y a-t-il quelque chose qui bouge ou un graphisme qui suggère la vitesse/action ?' },
  { key: 'visualHierarchy', label: 'Hiérarchie Visuelle', question: 'Couleurs/Formes > Texte ?', hint: 'Vois-tu d\'abord des Images/Couleurs/Formes (bon) ou es-tu agressé par du texte (mauvais) ?' },
] as const

export const CRITERIA_FINDIT = [
  { key: 'branding', label: 'Branding', question: 'Marque immédiatement reconnaissable ?', hint: 'Le logo est-il visible en moins d\'une seconde ? L\'identité visuelle est-elle simple (max 4 éléments) ?' },
  { key: 'segmentation', label: 'Segmentation', question: 'Claire (ex: code couleur) ou lecture nécessaire ?', hint: 'Le rayon est-il coupé en blocs logiques (couleur/usage) ? Si tu dois lire pour distinguer les sections, c\'est Non.' },
  { key: 'heroProducts', label: 'Produits Héros', question: 'Mis en avant (glorifiés) ?', hint: 'Les produits stars (Innovation ou Best-seller) sont-ils sur un piédestal ou un présentoir dédié ?' },
  { key: 'taxonomy', label: 'Taxonomie', question: 'Logique pour un non-expert ?', hint: 'Le rangement est-il logique pour ta grand-mère ? (Rappel : 32% des shoppers ne comprennent pas le rangement).' },
] as const

export const CRITERIA_CHOOSEIT = [
  { key: 'neuroEfficiency', label: 'Neuro-Efficacité', question: 'Image à Gauche / Texte à Droite ?', hint: 'Sur les supports, l\'image est-elle à GAUCHE et le texte à DROITE ? (Sens de traitement du cerveau).' },
  { key: 'simplicity', label: 'Simplicité', question: 'Vocabulaire simple (pas de jargon) ?', hint: 'Y a-t-il du jargon technique incompréhensible ? Le langage doit être accessible à tous.' },
  { key: 'conciseness', label: 'Concision', question: 'Messages < 10 mots ?', hint: 'Compte les mots sur l\'affiche principale. Y en a-t-il plus de 10 ? (Règle des 20 minutes).' },
  { key: 'choiceHelp', label: 'Aide au choix', question: 'Balisage aide-t-il à comparer ?', hint: 'Le balisage permet-il de différencier Produit A et Produit B sans prendre les boîtes en main ?' },
  { key: 'readingHierarchy', label: 'Hiérarchie de lecture', question: 'Logo > Variante > Bénéfice > Visuel déclencheur ?', hint: 'Ordre respecté ? 1. Logo/Icône -> 2. Variante -> 3. Bénéfice -> 4. "Nouveau".' },
] as const

export const CRITERIA_BUYIT = [
  { key: 'cta', label: 'Call To Action', question: 'Verbe d\'action clair ?', hint: 'Y a-t-il un verbe impératif ? (ex: "Essayez-moi", "Protégez-vous", "Découvrez").' },
  { key: 'visibleBenefit', label: 'Bénéfice Visible', question: 'Fonctionnel ou émotionnel ?', hint: 'Comprends-tu immédiatement ce que le produit va t\'apporter (Santé, Beauté, Gain de temps) ?' },
  { key: 'hotZone', label: 'Zone Chaude', question: 'Best-sellers à hauteur des yeux (1m-1m30) ?', hint: 'Les produits les plus rentables sont-ils entre 1m00 et 1m30 (hauteur des yeux/mains) ?' },
  { key: 'availability', label: 'Disponibilité', question: 'Pas de ruptures visibles ?', hint: 'Vois-tu des trous dans le rayon ? (Si la marque n\'est pas là, le shopper part).' },
  { key: 'price', label: 'Prix', question: 'Clairement affiché ?', hint: 'Le prix est-il clair ? L\'absence de prix est une barrière majeure (Valeur Perçue).' },
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
  { key: 'AWARENESS', label: 'Awareness', description: 'Je ne vous remarque pas en rayon.' },
  { key: 'COMPREHENSION', label: 'Compréhension', description: 'Je ne comprends pas les options (Trop de choix tue le choix).' },
  { key: 'PERTINENCE', label: 'Pertinence', description: 'Ce n\'est pas pour moi (Ciblage flou).' },
  { key: 'VALEUR_PERCUE', label: 'Valeur Perçue', description: 'Ça ne vaut pas ce prix-là.' },
  { key: 'USAGE', label: 'Usage', description: 'Je ne sais pas comment l\'utiliser.' },
] as const
