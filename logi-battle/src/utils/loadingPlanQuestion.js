/**
 * Construit une question de plan de chargement dont l'énoncé, les données
 * et la réponse notée utilisent le même taux d'espace utilisable.
 */
export const computeLoadingPlanCount = ({ containerCapacity, packageSize, usableRatio = 1 }) => {
  const usableSpace = Math.floor(containerCapacity * usableRatio)
  return Math.floor(usableSpace / packageSize)
}

export const buildLoadingPlanQuestion = ({
  difficulty,
  containerCapacity,
  packageSize,
  usableRatio = 1,
  explanation,
}) => {
  const usableSpace = Math.floor(containerCapacity * usableRatio)
  const answer = computeLoadingPlanCount({ containerCapacity, packageSize, usableRatio })
  const percent = Math.round(usableRatio * 100)

  const description = usableRatio < 1
    ? `Conteneur capacité ${containerCapacity} unités (${percent}% utilisable). Combien de colis de ${packageSize} unités pouvez-vous charger ?`
    : `Conteneur capacité ${containerCapacity} unités. Combien de colis de ${packageSize} unités pouvez-vous charger ?`

  return {
    type: 'loading_plan',
    difficulty,
    title: '📊 Plan de Chargement',
    description,
    data: { containerCapacity, packageSize, usableRatio, usableSpace },
    correctAnswer: answer,
    explanation,
    hints: [
      'Divisez la capacité par la taille du colis',
      'Considérez les contraintes spatiales',
    ],
  }
}
