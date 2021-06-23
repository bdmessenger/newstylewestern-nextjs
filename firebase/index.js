import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_APP_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_APP_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_FIREBASE_APP_ID
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app(); // if already initialized, use that one
}

const firestore = firebase.firestore()
const auth = firebase.auth()

const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

export {
    firestore,
    createUserProfileDocument,
    auth
}