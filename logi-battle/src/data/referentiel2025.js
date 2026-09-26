/**
 * Rattachement des modules au bac pro « métiers de la logistique »
 * Arrêté du 8 janvier 2025 — première session 2028.
 */

export const REFERENTIEL = {
  intitule: 'Baccalauréat professionnel métiers de la logistique',
  arrete: '8 janvier 2025',
  source: 'docs/referentiel/Referentiel-Bac-Pro-Metiers-de-la-logistique-2025.pdf',
}

export const MODULE_REFERENTIEL = {
  supply_chain: { unite: 'U31', competence: 'C1.1', pole: 'Pôle 1', savoir: 'Supply chain, acteurs, flux et zones' },
  safety: { unite: 'U31', competence: 'C1.2', pole: 'Pôle 1', savoir: 'Prévention des risques, EPI, signalétique' },
  reception: { unite: 'U31', competence: 'C1.3', pole: 'Pôle 1', savoir: 'Réception, contrôles, litiges, déchets' },
  stock: { unite: 'U31', competence: 'C1.5', pole: 'Pôle 1', savoir: 'Mise en stock, inventaire, rotation' },
  palettisation: { unite: 'U21', competence: 'C2.2.3', pole: 'Pôle 2', savoir: 'Unité de charge et plan de palettisation' },
  jit: { unite: 'U21', competence: 'C2.3', pole: 'Pôle 2', savoir: 'Logistique industrielle et ligne de production' },
  route: { unite: 'U21', competence: 'C2.4', pole: 'Pôle 2', savoir: 'Tournée, itinéraire, compte propre' },
  loading_plan: { unite: 'U21', competence: 'C2.4.3', pole: 'Pôle 2', savoir: 'Plan de chargement' },
  cout_transport: { unite: 'U21', competence: 'C2.6', pole: 'Pôle 2', savoir: 'Prestataire de transport et coût d’envoi' },
  legal: { unite: 'U21', competence: 'C2.6', pole: 'Pôle 2', savoir: 'Contrat de transport et documents' },
  traceability: { unite: 'U22', competence: 'C3.2', pole: 'Pôle 3', savoir: 'Traçabilité et retours' },
  green: { unite: 'U22', competence: 'C3.3', pole: 'Pôle 3', savoir: 'RSE, gaspillages, déchets' },
  team_leader: { unite: 'U22', competence: 'C3.4', pole: 'Pôle 3', savoir: 'Coordination d’une petite équipe' },
  vocabulaire: { unite: 'U31', competence: 'C1.1', pole: 'Pôle 1', savoir: 'Vocabulaire des activités logistiques' },
  math: { unite: 'U12', competence: 'U12', pole: 'Maths', savoir: 'Volumes, conversions, taux' },
  culture: { unite: 'U31', competence: 'C1-C4', pole: 'Référentiel', savoir: 'Compétences du bac pro 2025' },
  decouverte: { unite: 'U31', competence: 'C1.1', pole: 'Pôle 1', savoir: 'Découverte de l’entrepôt et des acteurs' },
  all: { unite: 'U21-U32', competence: 'C1-C4', pole: 'Mixte', savoir: 'Ensemble des pôles' },
}

export function referentielFor(type) {
  return MODULE_REFERENTIEL[type] || MODULE_REFERENTIEL.all
}
