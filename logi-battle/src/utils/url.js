export const normalizeBasePath = (basePath = '/') => {
  if (!basePath || basePath === '/') return '/'

  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

export const stripAppBasePath = (pathname, basePath = '/') => {
  const normalizedBase = normalizeBasePath(basePath)

  if (normalizedBase === '/') return pathname
  if (!pathname.startsWith(normalizedBase)) return pathname

  const stripped = pathname.slice(normalizedBase.length - 1)
  return stripped || '/'
}

export const buildJoinUrl = (origin, gameId, basePath = '/') => {
  const normalizedBase = normalizeBasePath(basePath)
  const encodedGameId = encodeURIComponent(gameId)

  return `${origin}${normalizedBase}join?game=${encodedGameId}`
}
