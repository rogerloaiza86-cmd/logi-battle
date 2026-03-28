import { create } from 'zustand'

const STORAGE_KEY = 'custom_modules'

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveToStorage = (modules) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modules))
  } catch {
    // ignore storage errors
  }
}

export const useModuleStore = create((set, get) => ({
  customModules: [],
  isLoading: false,
  error: null,

  loadModules: () => {
    const modules = loadFromStorage()
    set({ customModules: modules })
  },

  saveModule: (module) => {
    const { customModules } = get()
    const now = Date.now()
    const existing = customModules.find((m) => m.id === module.id)

    let updated
    if (existing) {
      updated = customModules.map((m) =>
        m.id === module.id ? { ...module, updatedAt: now } : m
      )
    } else {
      const newModule = {
        ...module,
        id: module.id || `mod_${now}`,
        createdAt: now,
        updatedAt: now,
        isCustom: true,
      }
      updated = [...customModules, newModule]
    }

    saveToStorage(updated)
    set({ customModules: updated })
    return updated.find((m) => m.id === (module.id || `mod_${now}`))
  },

  deleteModule: (moduleId) => {
    const { customModules } = get()
    const updated = customModules.filter((m) => m.id !== moduleId)
    saveToStorage(updated)
    set({ customModules: updated })
  },

  publishModule: (moduleId) => {
    const { customModules } = get()
    const updated = customModules.map((m) =>
      m.id === moduleId ? { ...m, isPublished: true, updatedAt: Date.now() } : m
    )
    saveToStorage(updated)
    set({ customModules: updated })
  },

  unpublishModule: (moduleId) => {
    const { customModules } = get()
    const updated = customModules.map((m) =>
      m.id === moduleId ? { ...m, isPublished: false, updatedAt: Date.now() } : m
    )
    saveToStorage(updated)
    set({ customModules: updated })
  },

  getModuleById: (moduleId) => {
    return get().customModules.find((m) => m.id === moduleId) || null
  },

  getPublishedModules: () => {
    return get().customModules.filter((m) => m.isPublished)
  },

  getModulesByCreator: (creatorName) => {
    return get().customModules.filter((m) => m.createdBy?.name === creatorName)
  },
}))
