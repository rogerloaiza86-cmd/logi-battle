export const getAppBasePath = () => {
  const base = import.meta.env?.BASE_URL || '/'
  return base.endsWith('/') ? base : `${base}/`
}

export const normalizeAppPath = (pathname, basePath = getAppBasePath()) => {
  const path = pathname || '/'
  let base = basePath || '/'

  if (!base.startsWith('/')) {
    base = `/${base}`
  }
  if (!base.endsWith('/')) {
    base = `${base}/`
  }

  if (base !== '/') {
    const baseWithoutTrailingSlash = base.slice(0, -1)
    if (path === baseWithoutTrailingSlash) {
      return '/'
    }
    if (path.startsWith(base)) {
      return path.slice(baseWithoutTrailingSlash.length) || '/'
    }
  }

  return path
}

export const isJoinRoute = (pathname, search = '', basePath = getAppBasePath()) => {
  if (normalizeAppPath(pathname, basePath) === '/join') {
    return true
  }

  return new URLSearchParams(search).has('game')
}

export const createJoinUrl = (origin, gameId, basePath = getAppBasePath()) => {
  const appBaseUrl = new URL(basePath, origin)
  const joinUrl = new URL('join', appBaseUrl)

  if (gameId) {
    joinUrl.searchParams.set('game', gameId)
  }

  return joinUrl.toString()
}
