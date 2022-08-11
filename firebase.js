import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC8rFs920UQsLruSJg8ea7ZkLi_9e0ak-w",
    authDomain: "signal-clone-44b97.firebaseapp.com",
    projectId: "signal-clone-44b97",
    storageBucket: "signal-clone-44b97.appspot.com",
    messagingSenderId: "743106108210",
    appId: "1:743106108210:web:b5b7913b1e1ddf8523952b"
};

let app

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }