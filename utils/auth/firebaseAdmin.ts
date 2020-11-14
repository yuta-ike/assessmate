import * as admin from 'firebase-admin'
import initAdminFirebase from './initAdminFirebase'

export const verifyIdToken = async (token: string) => {
  // const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

  // if (!admin.apps.length) {
  //   admin.initializeApp({
  //     credential: admin.credential.cert({
  //       projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //       // https://stackoverflow.com/a/41044630/1332513
  //       privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
        
  //     }),
  //     databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  //     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  //   })
  // }

  initAdminFirebase()

  const idToken = await admin.auth().verifyIdToken(token)
  return idToken
}
