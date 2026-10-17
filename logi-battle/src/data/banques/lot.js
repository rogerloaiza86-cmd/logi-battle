export function lot(programmeId, voies, annee, matiere, rows) {
  return rows.map((row, index) => {
    const shift = index % row.options.length
    const options = row.options.map((_, place) => row.options[(place - shift + row.options.length) % row.options.length])
    return {
      id: `${programmeId}-${index + 1}`,
      programmeId,
      voies,
      annee,
      matiere,
      theme: row.theme,
      question: row.question,
      options,
      correctOption: (row.correct + shift) % row.options.length,
      explanation: row.explanation,
    }
  })
}
