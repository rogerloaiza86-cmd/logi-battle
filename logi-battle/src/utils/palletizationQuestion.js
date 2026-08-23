/**
 * Construit une question de palettisation dont l'énoncé, les données
 * et la réponse notée utilisent la même hauteur maximale.
 */
export const buildPalletizationQuestion = ({
  difficulty,
  boxLength,
  boxWidth,
  boxHeight,
  paletteLength,
  paletteWidth,
  maxHeight,
  explanation,
}) => {
  const tiLengthwise = Math.floor(paletteLength / boxLength)
  const tiWidthwise = Math.floor(paletteWidth / boxWidth)
  const ti = tiLengthwise * tiWidthwise
  const hi = Math.floor(maxHeight / boxHeight)
  const answer = ti * hi

  return {
    type: 'palettisation',
    difficulty,
    title: '📦 Palettisation',
    description: `Combien de colis de dimensions ${boxLength}×${boxWidth}×${boxHeight} cm pouvez-vous mettre sur une palette ${paletteLength}×${paletteWidth} cm (hauteur max: ${maxHeight} cm)?`,
    data: {
      boxLength,
      boxWidth,
      boxHeight,
      paletteLength,
      paletteWidth,
      maxHeight,
    },
    correctAnswer: answer,
    explanation,
    hints: [
      'Calculez le nombre de colis par couche (Ti)',
      'Calculez le nombre de couches (Hi)',
      'Multipliez Ti × Hi',
    ],
  }
}
