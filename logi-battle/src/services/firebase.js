import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

function usableKey(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (trimmed.length < 20) return false
  return !/placeholder|your[_-]?api|xxx|changeme|todo/i.test(trimmed)
}

let db = null

if (usableKey(firebaseConfig.apiKey) && firebaseConfig.projectId) {
  try {
    const app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  } catch (error) {
    console.warn('Firebase initialization skipped:', error.message)
  }
}

export default db
