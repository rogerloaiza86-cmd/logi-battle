/**
 * Construit une question de coût de transport dont l'énoncé, les données
 * et la réponse notée utilisent les mêmes tarifs, remises et surcoûts.
 */
export const computeTransportCost = ({
  distance,
  weight,
  costPerKm,
  costPerTon,
  discount = 0,
  fuel = 0,
  toll = 0,
}) => {
  const baseCost = distance * costPerKm + weight * costPerTon + distance * fuel + toll
  const discountAmount = (baseCost * discount) / 100
  return baseCost - discountAmount
}

export const buildTransportCostQuestion = ({
  difficulty,
  distance,
  weight,
  costPerKm,
  costPerTon,
  discount = 0,
  fuel = 0,
  toll = 0,
  explanation,
}) => {
  const answer = computeTransportCost({
    distance,
    weight,
    costPerKm,
    costPerTon,
    discount,
    fuel,
    toll,
  })

  let description
  if (discount > 0) {
    description = `Pour un trajet de ${distance} km à ${costPerKm}€/km avec ${weight} tonnes à ${costPerTon}€/tonne, avec une remise de ${discount}%, quel est le coût total (en euros, arrondi à l'unité) ?`
  } else if (fuel > 0 || toll > 0) {
    description = `Pour un trajet de ${distance} km à ${costPerKm}€/km avec ${weight} tonnes à ${costPerTon}€/tonne, plus ${fuel}€/km de carburant et ${toll}€ de péages, quel est le coût total (en euros) ?`
  } else {
    description = `Pour un trajet de ${distance} km à ${costPerKm}€/km avec ${weight} tonnes à ${costPerTon}€/tonne, quel est le coût total (en euros) ?`
  }

  return {
    type: 'cout_transport',
    difficulty,
    title: '🚚 Coût de Transport',
    description,
    data: { distance, weight, costPerKm, costPerTon, discount, fuel, toll },
    correctAnswer: Math.round(answer),
    explanation,
    hints: ['Considérez la distance', 'Considérez le poids'],
  }
}
