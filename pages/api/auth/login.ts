import axios from 'axios'
import * as admin from 'firebase-admin'

const login = async (req, res) => {
  try {
    // LIFFアクセストークンを取得
    const [type, accessToken] = req.headers.authorization?.split(" ")

    if(type !== "Bearer" || accessToken === "") throw new Error("Access token is not set.")

    // LIFFアクセストークンを検証する
    const verifyRes = await axios.get("https://api.line.me/oauth2/v2.1/verify", { params: { access_token: accessToken } })

    if (verifyRes.data.client_id !== process.env.CHANNEL_ID) throw new Error("Channel ID is different")

    // アクセストークンからユーザーIDとプロフィールを取得する
    const profileRes = await axios.get("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })

    if(profileRes.data == null) throw new Error("Fetch profile miss")

    const { userId, /*displayName, pictureUrl*/ } = profileRes.data
    
    // Firebase Admin SDKを初期化
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // https://stackoverflow.com/a/41044630/1332513
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      })
    }

    // Firebase Auth でカスタムトークンを発行
    const firebaseToken = await admin.auth().createCustomToken(userId)

    // Firestoreにユーザーデータを格納
    // await admin.firestore().collection('users').doc("line-" + userId).set({
    //   userId, displayName, pictureUrl, provider: "line",
    // })

    return res.status(200).json({
      token: firebaseToken,
    })
  } catch (error) {
    console.error(error)
    return res.status(401).send('You are unauthorised')
  }
}

export default login
