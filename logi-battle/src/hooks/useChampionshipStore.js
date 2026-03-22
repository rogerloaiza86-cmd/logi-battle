/**
 * Store Zustand pour la gestion du Championnat
 * Classes, Groupes/Trinômes, Champions et défis
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useChampionshipStore = create(
  persist(
    (set, get) => ({
      // ========== DONNÉES ==========
      classes: [], // Liste des classes
      currentClass: null, // Classe actuellement sélectionnée
      currentGroup: null, // Groupe actuellement en jeu
      
      // ========== ACTIONS CLASSES ==========
      
      // Créer une nouvelle classe
      createClass: (name, description = '') => {
        const newClass = {
          id: `class_${Date.now()}`,
          name,
          description,
          createdAt: new Date().toISOString(),
          groups: [], // Les groupes/trinômes
          matches: [], // Historique des matchs
          currentChampion: null, // ID du groupe champion actuel
          rankings: [], // Classement des groupes
        }
        set((state) => ({
          classes: [...state.classes, newClass],
          currentClass: newClass.id,
        }))
        return newClass.id
      },
      
      // Supprimer une classe
      deleteClass: (classId) => {
        set((state) => ({
          classes: state.classes.filter((c) => c.id !== classId),
          currentClass: state.currentClass === classId ? null : state.currentClass,
        }))
      },
      
      // Sélectionner une classe
      selectClass: (classId) => {
        set({ currentClass: classId })
      },
      
      // ========== ACTIONS GROUPES ==========
      
      // Créer un groupe/trinôme dans une classe
      createGroup: (classId, groupName, members) => {
        const newGroup = {
          id: `group_${Date.now()}`,
          name: groupName,
          members: members.slice(0, 3), // Maximum 3 membres (trinôme)
          classId,
          createdAt: new Date().toISOString(),
          stats: {
            wins: 0,
            losses: 0,
            draws: 0,
            totalMatches: 0,
            points: 0, // Points de championnat
            titleDefenses: 0, // Nombre de défenses du titre
          },
          isChampion: false,
          history: [], // Historique des matchs du groupe
        }
        
        set((state) => ({
          classes: state.classes.map((c) => {
            if (c.id === classId) {
              // Si c'est le premier groupe, il devient champion
              const isFirstGroup = c.groups.length === 0
              if (isFirstGroup) {
                newGroup.isChampion = true
                newGroup.stats.titleDefenses = 0
              }
              return {
                ...c,
                groups: [...c.groups, newGroup],
                currentChampion: isFirstGroup ? newGroup.id : c.currentChampion,
              }
            }
            return c
          }),
        }))
        return newGroup.id
      },
      
      // Supprimer un groupe
      deleteGroup: (classId, groupId) => {
        set((state) => ({
          classes: state.classes.map((c) => {
            if (c.id === classId) {
              const updatedGroups = c.groups.filter((g) => g.id !== groupId)
              // Si on supprime le champion, le premier groupe devient champion
              const wasChampion = c.currentChampion === groupId
              const newChampion = wasChampion && updatedGroups.length > 0
                ? updatedGroups[0].id
                : c.currentChampion

              const finalGroups = updatedGroups.map((g) => ({
                ...g,
                isChampion: g.id === newChampion,
              }))

              return {
                ...c,
                groups: finalGroups,
                currentChampion: newChampion,
              }
            }
            return c
          }),
        }))
      },
      
      // Sélectionner un groupe pour jouer
      selectGroup: (groupId) => {
        set({ currentGroup: groupId })
      },
      
      // ========== ACTIONS CHAMPIONNAT ==========
      
      // Enregistrer un match et mettre à jour les classements
      recordMatch: (classId, challengerId, championId, winner, matchData) => {
        const match = {
          id: `match_${Date.now()}`,
          classId,
          challengerId,
          championId,
          winner, // 'challenger', 'champion', 'draw'
          date: new Date().toISOString(),
          score: matchData.score,
          duration: matchData.duration,
          rounds: matchData.rounds,
        }
        
        set((state) => ({
          classes: state.classes.map((c) => {
            if (c.id === classId) {
              const updatedGroups = c.groups.map((g) => {
                // Mettre à jour le challenger
                if (g.id === challengerId) {
                  const newStats = { ...g.stats }
                  newStats.totalMatches++
                  if (winner === 'challenger') {
                    newStats.wins++
                    newStats.points += 3
                  } else if (winner === 'champion') {
                    newStats.losses++
                  } else {
                    newStats.draws++
                    newStats.points += 1
                  }
                  return { ...g, stats: newStats, history: [...g.history, match] }
                }
                // Mettre à jour le champion
                if (g.id === championId) {
                  const newStats = { ...g.stats }
                  newStats.totalMatches++
                  if (winner === 'champion') {
                    newStats.wins++
                    newStats.points += 3
                    newStats.titleDefenses++
                  } else if (winner === 'challenger') {
                    newStats.losses++
                  } else {
                    newStats.draws++
                    newStats.points += 1
                  }
                  return { ...g, stats: newStats, history: [...g.history, match] }
                }
                return g
              })
              
              // Si le challenger gagne, il devient champion
              const newChampion = winner === 'challenger' ? challengerId : c.currentChampion
              
              // Mettre à jour les statuts isChampion
              const finalGroups = updatedGroups.map((g) => ({
                ...g,
                isChampion: g.id === newChampion,
              }))
              
              return {
                ...c,
                groups: finalGroups,
                currentChampion: newChampion,
                matches: [...c.matches, match],
              }
            }
            return c
          }),
        }))
        
        return match
      },
      
      // Réinitialiser le championnat d'une classe
      resetChampionship: (classId) => {
        set((state) => ({
          classes: state.classes.map((c) => {
            if (c.id === classId) {
              const resetGroups = c.groups.map((g, index) => ({
                ...g,
                stats: {
                  wins: 0,
                  losses: 0,
                  draws: 0,
                  totalMatches: 0,
                  points: 0,
                  titleDefenses: 0,
                },
                isChampion: index === 0, // Premier groupe devient champion
                history: [],
              }))
              return {
                ...c,
                groups: resetGroups,
                currentChampion: resetGroups.length > 0 ? resetGroups[0].id : null,
                matches: [],
              }
            }
            return c
          }),
        }))
      },
      
      // ========== GETTERS ==========
      
      // Obtenir une classe par ID
      getClass: (classId) => {
        return get().classes.find((c) => c.id === classId)
      },
      
      // Obtenir un groupe par ID
      getGroup: (classId, groupId) => {
        const cls = get().classes.find((c) => c.id === classId)
        return cls?.groups.find((g) => g.id === groupId)
      },
      
      // Obtenir le champion actuel
      getCurrentChampion: (classId) => {
        const cls = get().classes.find((c) => c.id === classId)
        if (!cls || !cls.currentChampion) return null
        return cls.groups.find((g) => g.id === cls.currentChampion)
      },
      
      // Obtenir le classement des groupes
      getRankings: (classId) => {
        const cls = get().classes.find((c) => c.id === classId)
        if (!cls) return []
        
        return [...cls.groups]
          .sort((a, b) => {
            // Trier par points, puis par victoires, puis par défenses de titre
            if (b.stats.points !== a.stats.points) {
              return b.stats.points - a.stats.points
            }
            if (b.stats.wins !== a.stats.wins) {
              return b.stats.wins - a.stats.wins
            }
            return b.stats.titleDefenses - a.stats.titleDefenses
          })
          .map((g, index) => ({ ...g, rank: index + 1 }))
      },
      
      // Obtenir les groupes pouvant défier (tous sauf le champion)
      getChallengers: (classId) => {
        const cls = get().classes.find((c) => c.id === classId)
        if (!cls) return []
        return cls.groups.filter((g) => g.id !== cls.currentChampion)
      },
      
      // Obtenir l'historique des matchs d'une classe
      getMatchHistory: (classId) => {
        const cls = get().classes.find((c) => c.id === classId)
        return cls?.matches || []
      },
    }),
    {
      name: 'championship-storage', // Clé localStorage
      version: 1,
    }
  )
)
