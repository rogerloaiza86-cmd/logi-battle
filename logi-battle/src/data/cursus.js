/** Voies, années et matières du lycée. La logistique reste le pôle professionnel déjà jouable. */

export const VOIES = [
  {
    id: 'generale',
    label: 'Voie générale',
    detail: 'Tronc commun. En première et en terminale, les mathématiques de cette banque sont celles de la spécialité.',
  },
  {
    id: 'technologique',
    label: 'Voie technologique',
    detail: 'Tronc commun des séries STMG, STI2D, STL, ST2S, STD2A et STHR. Les spécialités de série viennent ensuite.',
  },
  {
    id: 'professionnelle',
    label: 'Voie professionnelle',
    detail: 'Enseignement général commun du baccalauréat professionnel. Le bac pro métiers de la logistique garde ses modules.',
  },
]

export const ANNEES = ['seconde', 'premiere', 'terminale']

export const MATIERES = [
  { id: 'francais', label: 'Français', icon: 'menu_book' },
  { id: 'mathematiques', label: 'Mathématiques', icon: 'calculate' },
  { id: 'histoire', label: 'Histoire', icon: 'account_balance' },
  { id: 'geographie', label: 'Géographie', icon: 'public' },
  { id: 'anglais', label: 'Anglais', icon: 'translate' },
  { id: 'espagnol', label: 'Espagnol', icon: 'language' },
]

export const FILIERES = [
  {
    id: 'generale',
    voie: 'generale',
    label: 'Générale',
    statut: 'tronc-commun',
    detail: 'Français, histoire-géographie, langues, et spécialité mathématiques en cycle terminal.',
  },
  {
    id: 'stmg',
    voie: 'technologique',
    label: 'STMG',
    statut: 'tronc-commun',
    detail: 'Management, droit et économie restent à écrire. Le tronc commun est jouable.',
  },
  {
    id: 'sti2d',
    voie: 'technologique',
    label: 'STI2D',
    statut: 'tronc-commun',
    detail: 'Innovation technologique et ingénierie restent à écrire. Le tronc commun est jouable.',
  },
  {
    id: 'stl',
    voie: 'technologique',
    label: 'STL',
    statut: 'tronc-commun',
    detail: 'Les enseignements de laboratoire restent à écrire.',
  },
  {
    id: 'st2s',
    voie: 'technologique',
    label: 'ST2S',
    statut: 'tronc-commun',
    detail: 'Sciences et techniques sanitaires et sociales restent à écrire.',
  },
  {
    id: 'std2a',
    voie: 'technologique',
    label: 'STD2A',
    statut: 'tronc-commun',
    detail: 'Design et arts appliqués restent à écrire. En maths, l’algorithmique du tronc commun y est remplacée par des activités géométriques.',
  },
  {
    id: 'sthr',
    voie: 'technologique',
    label: 'STHR',
    statut: 'tronc-commun',
    detail: 'Hôtellerie et restauration restent à écrire.',
  },
  {
    id: 'bac-pro-enseignement-general',
    voie: 'professionnelle',
    label: 'Enseignement général du bac pro',
    statut: 'tronc-commun',
    detail: 'Français, mathématiques, histoire, géographie, anglais et espagnol, communs aux spécialités.',
  },
  {
    id: 'bac-pro-logistique',
    voie: 'professionnelle',
    label: 'Métiers de la logistique',
    statut: 'referentiel',
    detail: 'Référentiel du 8 janvier 2025, déjà branché sur les modules de l’arène.',
  },
]

export function codeCursus(voie, annee, matiere) {
  return `cursus:${voie}:${annee}:${matiere}`
}

export function parseCursusMode(mode) {
  if (typeof mode !== 'string' || !mode.startsWith('cursus:')) return null
  const [, voie, annee, matiere] = mode.split(':')
  if (!VOIES.some((item) => item.id === voie)) return null
  if (!ANNEES.includes(annee)) return null
  if (!MATIERES.some((item) => item.id === matiere)) return null
  return { voie, annee, matiere }
}

export function matiereParId(id) {
  return MATIERES.find((item) => item.id === id) || null
}

export function voieParId(id) {
  return VOIES.find((item) => item.id === id) || null
}
