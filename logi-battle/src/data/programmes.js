/**
 * Programmes et référentiels utilisés pour aligner les questions.
 * Les mathématiques suivent les programmes de 2019 encore indiqués en vigueur
 * sur éduscol en juillet 2026. Les arrêtés du 26 février 2026 (BO n° 14 du
 * 2 avril 2026) sont à relire avant la prochaine vague.
 */

export const PROGRAMMES = {
  'fr-gt-2': {
    id: 'fr-gt-2',
    intitule: 'Français, seconde générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5793/programmes-et-ressources-en-francais-voie-gt',
  },
  'fr-gt-1': {
    id: 'fr-gt-1',
    intitule: 'Français, première générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5793/programmes-et-ressources-en-francais-voie-gt',
  },
  'fr-pro-2': {
    id: 'fr-pro-2',
    intitule: 'Français, seconde professionnelle',
    reference: 'Arrêté du 3 avril 2019',
    bulletin: 'BO spécial n° 5 du 11 avril 2019',
    source: 'https://eduscol.education.gouv.fr/sites/default/files/document/spe622annexe1105038pdf-85311.pdf',
  },
  'fr-pro-1': {
    id: 'fr-pro-1',
    intitule: 'Français, première professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOspe1_MENJ_1241433.pdf-255255.pdf',
  },
  'fr-pro-t': {
    id: 'fr-pro-t',
    intitule: 'Français, terminale professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOspe1_MENJ_1241433.pdf-255255.pdf',
  },
  'ma-gt-2': {
    id: 'ma-gt-2',
    intitule: 'Mathématiques, seconde générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5817/programmes-et-ressources-en-mathematiques-voie-gt',
  },
  'ma-gen-1': {
    id: 'ma-gen-1',
    intitule: 'Spécialité mathématiques, première générale',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5817/programmes-et-ressources-en-mathematiques-voie-gt',
  },
  'ma-gen-t': {
    id: 'ma-gen-t',
    intitule: 'Spécialité mathématiques, terminale générale',
    reference: 'Arrêté du 17 juillet 2019',
    bulletin: 'BO spécial n° 8 du 25 juillet 2019',
    source: 'https://eduscol.education.gouv.fr/5817/programmes-et-ressources-en-mathematiques-voie-gt',
  },
  'ma-tec-1': {
    id: 'ma-tec-1',
    intitule: 'Mathématiques, première technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5817/programmes-et-ressources-en-mathematiques-voie-gt',
  },
  'ma-tec-t': {
    id: 'ma-tec-t',
    intitule: 'Mathématiques, terminale technologique',
    reference: 'Arrêté du 17 juillet 2019',
    bulletin: 'BO spécial n° 8 du 25 juillet 2019',
    source: 'https://eduscol.education.gouv.fr/5817/programmes-et-ressources-en-mathematiques-voie-gt',
  },
  'ma-pro-2': {
    id: 'ma-pro-2',
    intitule: 'Mathématiques, seconde professionnelle',
    reference: 'Arrêté du 3 avril 2019',
    bulletin: 'BO spécial n° 5 du 11 avril 2019',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOSPE5_MENJ_1108488.pdf-233334.pdf',
  },
  'ma-pro-1': {
    id: 'ma-pro-1',
    intitule: 'Mathématiques, première professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOspe1_MENJ_1241433.pdf-255255.pdf',
  },
  'ma-pro-t': {
    id: 'ma-pro-t',
    intitule: 'Mathématiques, terminale professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOspe1_MENJ_1241433.pdf-255255.pdf',
  },
  'hi-gt-2': {
    id: 'hi-gt-2',
    intitule: 'Histoire, seconde générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'hi-gen-1': {
    id: 'hi-gen-1',
    intitule: 'Histoire, première générale',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'hi-gen-t': {
    id: 'hi-gen-t',
    intitule: 'Histoire, terminale générale',
    reference: 'Arrêté du 17 juillet 2019',
    bulletin: 'BO spécial n° 8 du 25 juillet 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'hi-tec-1': {
    id: 'hi-tec-1',
    intitule: 'Histoire, première technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'hi-tec-t': {
    id: 'hi-tec-t',
    intitule: 'Histoire, terminale technologique',
    reference: 'Arrêté du 17 juillet 2019',
    bulletin: 'BO spécial n° 8 du 25 juillet 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'hi-pro-2': {
    id: 'hi-pro-2',
    intitule: 'Histoire, seconde professionnelle',
    reference: 'Arrêté du 3 avril 2019',
    bulletin: 'BO spécial n° 5 du 11 avril 2019',
    source: 'https://eduscol.education.gouv.fr/5889/programmes-et-ressources-en-histoire-geographie-voie-professionnelle',
  },
  'hi-pro-1': {
    id: 'hi-pro-1',
    intitule: 'Histoire, première professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://eduscol.education.gouv.fr/5889/programmes-et-ressources-en-histoire-geographie-voie-professionnelle',
  },
  'hi-pro-t': {
    id: 'hi-pro-t',
    intitule: 'Histoire, terminale professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://eduscol.education.gouv.fr/5889/programmes-et-ressources-en-histoire-geographie-voie-professionnelle',
  },
  'ge-gt-2': {
    id: 'ge-gt-2',
    intitule: 'Géographie, seconde générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'ge-gen-1': {
    id: 'ge-gen-1',
    intitule: 'Géographie, première générale',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'ge-gen-t': {
    id: 'ge-gen-t',
    intitule: 'Géographie, terminale générale',
    reference: 'Arrêté du 17 juillet 2019',
    bulletin: 'BO spécial n° 8 du 25 juillet 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'ge-tec-1': {
    id: 'ge-tec-1',
    intitule: 'Géographie, première technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'ge-tec-t': {
    id: 'ge-tec-t',
    intitule: 'Géographie, terminale technologique',
    reference: 'Arrêté du 17 juillet 2019',
    bulletin: 'BO spécial n° 8 du 25 juillet 2019',
    source: 'https://eduscol.education.gouv.fr/5799/programmes-et-ressources-en-histoire-geographie-voie-gt',
  },
  'ge-pro-2': {
    id: 'ge-pro-2',
    intitule: 'Géographie, seconde professionnelle',
    reference: 'Arrêté du 3 avril 2019',
    bulletin: 'BO spécial n° 5 du 11 avril 2019',
    source: 'https://eduscol.education.gouv.fr/5889/programmes-et-ressources-en-histoire-geographie-voie-professionnelle',
  },
  'ge-pro-1': {
    id: 'ge-pro-1',
    intitule: 'Géographie, première professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://eduscol.education.gouv.fr/5889/programmes-et-ressources-en-histoire-geographie-voie-professionnelle',
  },
  'ge-pro-t': {
    id: 'ge-pro-t',
    intitule: 'Géographie, terminale professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://eduscol.education.gouv.fr/5889/programmes-et-ressources-en-histoire-geographie-voie-professionnelle',
  },
  'an-gt-2': {
    id: 'an-gt-2',
    intitule: 'Anglais, seconde générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://www.education.gouv.fr/bo/19/Special1/MENE1901585A.htm',
  },
  'an-gt-1': {
    id: 'an-gt-1',
    intitule: 'Anglais, première générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://www.education.gouv.fr/bo/19/Special1/MENE1901585A.htm',
  },
  'an-gt-t': {
    id: 'an-gt-t',
    intitule: 'Anglais, terminale générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://www.education.gouv.fr/bo/19/Special1/MENE1901585A.htm',
  },
  'an-pro-2': {
    id: 'an-pro-2',
    intitule: 'Anglais, seconde professionnelle',
    reference: 'Arrêté du 3 avril 2019',
    bulletin: 'BO spécial n° 5 du 11 avril 2019',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOSPE5_MENJ_1108488.pdf-233334.pdf',
  },
  'an-pro-1': {
    id: 'an-pro-1',
    intitule: 'Anglais, première professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOspe1_MENJ_1241433.pdf-255255.pdf',
  },
  'an-pro-t': {
    id: 'an-pro-t',
    intitule: 'Anglais, terminale professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOspe1_MENJ_1241433.pdf-255255.pdf',
  },
  'es-gt-2': {
    id: 'es-gt-2',
    intitule: 'Espagnol, seconde générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://www.education.gouv.fr/bo/19/Special1/MENE1901585A.htm',
  },
  'es-gt-1': {
    id: 'es-gt-1',
    intitule: 'Espagnol, première générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://www.education.gouv.fr/bo/19/Special1/MENE1901585A.htm',
  },
  'es-gt-t': {
    id: 'es-gt-t',
    intitule: 'Espagnol, terminale générale et technologique',
    reference: 'Arrêté du 17 janvier 2019',
    bulletin: 'BO spécial n° 1 du 22 janvier 2019',
    source: 'https://www.education.gouv.fr/bo/19/Special1/MENE1901585A.htm',
  },
  'es-pro-2': {
    id: 'es-pro-2',
    intitule: 'Espagnol, seconde professionnelle',
    reference: 'Arrêté du 3 avril 2019',
    bulletin: 'BO spécial n° 5 du 11 avril 2019',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOSPE5_MENJ_1108488.pdf-233334.pdf',
  },
  'es-pro-1': {
    id: 'es-pro-1',
    intitule: 'Espagnol, première professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOspe1_MENJ_1241433.pdf-255255.pdf',
  },
  'es-pro-t': {
    id: 'es-pro-t',
    intitule: 'Espagnol, terminale professionnelle',
    reference: 'Arrêté du 3 février 2020',
    bulletin: 'BO spécial n° 1 du 6 février 2020',
    source: 'https://www.education.gouv.fr/sites/default/files/document/BOspe1_MENJ_1241433.pdf-255255.pdf',
  },
}

const GT = ['generale', 'technologique']

/** Cellule voie|année|matière → identifiant de programme. L’absence est voulue. */
export const CELLULES = {
  'generale|seconde|francais': 'fr-gt-2',
  'technologique|seconde|francais': 'fr-gt-2',
  'generale|premiere|francais': 'fr-gt-1',
  'technologique|premiere|francais': 'fr-gt-1',
  'professionnelle|seconde|francais': 'fr-pro-2',
  'professionnelle|premiere|francais': 'fr-pro-1',
  'professionnelle|terminale|francais': 'fr-pro-t',

  'generale|seconde|mathematiques': 'ma-gt-2',
  'technologique|seconde|mathematiques': 'ma-gt-2',
  'generale|premiere|mathematiques': 'ma-gen-1',
  'generale|terminale|mathematiques': 'ma-gen-t',
  'technologique|premiere|mathematiques': 'ma-tec-1',
  'technologique|terminale|mathematiques': 'ma-tec-t',
  'professionnelle|seconde|mathematiques': 'ma-pro-2',
  'professionnelle|premiere|mathematiques': 'ma-pro-1',
  'professionnelle|terminale|mathematiques': 'ma-pro-t',

  'generale|seconde|histoire': 'hi-gt-2',
  'technologique|seconde|histoire': 'hi-gt-2',
  'generale|premiere|histoire': 'hi-gen-1',
  'generale|terminale|histoire': 'hi-gen-t',
  'technologique|premiere|histoire': 'hi-tec-1',
  'technologique|terminale|histoire': 'hi-tec-t',
  'professionnelle|seconde|histoire': 'hi-pro-2',
  'professionnelle|premiere|histoire': 'hi-pro-1',
  'professionnelle|terminale|histoire': 'hi-pro-t',

  'generale|seconde|geographie': 'ge-gt-2',
  'technologique|seconde|geographie': 'ge-gt-2',
  'generale|premiere|geographie': 'ge-gen-1',
  'generale|terminale|geographie': 'ge-gen-t',
  'technologique|premiere|geographie': 'ge-tec-1',
  'technologique|terminale|geographie': 'ge-tec-t',
  'professionnelle|seconde|geographie': 'ge-pro-2',
  'professionnelle|premiere|geographie': 'ge-pro-1',
  'professionnelle|terminale|geographie': 'ge-pro-t',

  'generale|seconde|anglais': 'an-gt-2',
  'technologique|seconde|anglais': 'an-gt-2',
  'generale|premiere|anglais': 'an-gt-1',
  'technologique|premiere|anglais': 'an-gt-1',
  'generale|terminale|anglais': 'an-gt-t',
  'technologique|terminale|anglais': 'an-gt-t',
  'professionnelle|seconde|anglais': 'an-pro-2',
  'professionnelle|premiere|anglais': 'an-pro-1',
  'professionnelle|terminale|anglais': 'an-pro-t',

  'generale|seconde|espagnol': 'es-gt-2',
  'technologique|seconde|espagnol': 'es-gt-2',
  'generale|premiere|espagnol': 'es-gt-1',
  'technologique|premiere|espagnol': 'es-gt-1',
  'generale|terminale|espagnol': 'es-gt-t',
  'technologique|terminale|espagnol': 'es-gt-t',
  'professionnelle|seconde|espagnol': 'es-pro-2',
  'professionnelle|premiere|espagnol': 'es-pro-1',
  'professionnelle|terminale|espagnol': 'es-pro-t',
}

export const VOIES_PARTAGEES = GT

export function cleCellule(voie, annee, matiere) {
  return `${voie}|${annee}|${matiere}`
}

export function programmeDe(voie, annee, matiere) {
  const id = CELLULES[cleCellule(voie, annee, matiere)]
  return id ? PROGRAMMES[id] : null
}

export function raisonFermee(voie, annee, matiere) {
  if (programmeDe(voie, annee, matiere)) return ''
  if (matiere === 'francais' && annee === 'terminale' && voie !== 'professionnelle') {
    return 'En terminale générale et technologique, le français s’arrête après les épreuves anticipées. Le tronc commun littéraire devient la philosophie.'
  }
  return 'Cette combinaison n’a pas encore de programme branché.'
}
