import firebase from 'firebase/app'
import 'firebase/firestore'


  export function initializeApplication () {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
   
  };
  
  if (!firebase.apps.length || firebase.apps.length === 0) {
    firebase.initializeApp(config)
  }
  return firebase
}
