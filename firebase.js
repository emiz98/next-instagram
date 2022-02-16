// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcZydqeaKD91YiPvuogYmiGvZKCCWJVt0',
  authDomain: 'next-instagram-36d37.firebaseapp.com',
  projectId: 'next-instagram-36d37',
  storageBucket: 'next-instagram-36d37.appspot.com',
  messagingSenderId: '318743516528',
  appId: '1:318743516528:web:1cc152146b4d29ad69abb5',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
