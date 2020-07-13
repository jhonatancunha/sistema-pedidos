// FIREBASE
import 'firebase/auth'
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyC9P49mv2FcKHHyJFbZL2VZGTZezv4NOXY',
  authDomain: 'sistema-pedidos-206f0.firebaseapp.com',
  databaseURL: 'https://sistema-pedidos-206f0.firebaseio.com',
  projectId: 'sistema-pedidos-206f0',
  storageBucket: 'sistema-pedidos-206f0.appspot.com',
  messagingSenderId: '164128812977',
  appId: '1:164128812977:web:b1f332b04f9ca3aac71790',
  measurementId: 'G-9CGTDRRF34',
}
firebase.initializeApp(firebaseConfig)

export default firebase
