import firebase from 'firebase/app'
import "firebase/firestore"
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDbYErdUz2hz4pDm82jpY4k5hk4NE1frA8",
    authDomain: "ufcpickem-52c75.firebaseapp.com",
    databaseURL: "https://ufcpickem-52c75.firebaseio.com",
    projectId: "ufcpickem-52c75",
    storageBucket: "ufcpickem-52c75.appspot.com",
    messagingSenderId: "463228186129",
    appId: "1:463228186129:web:198bca043117f504304bb0"
  }
  firebase.initializeApp(firebaseConfig)

const googleProvider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()
const db = firebase.firestore()


export { googleProvider, auth, db}
export default firebase
