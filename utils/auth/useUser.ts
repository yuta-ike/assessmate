import { useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from './initFirebase'
import { useRecoilState } from 'recoil'
import appUserAtom from '../../atoms/appUser'
import getLiff from '../liff/getLiff'
import encoding from 'encoding-japanese'

const useUser = () => {
  const [appUser, setAppUser] = useRecoilState(appUserAtom)

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    initFirebase()
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if(!process.browser) return
        
        console.log("TOKEN CHANGED", user)

        if (user) {
          const snapshot = await firebase.firestore().collection("users").doc("line-" + user.uid).get()
          const fbProfile = snapshot.data()

          const liff = await getLiff()
          const liffProfile = liff.getDecodedIDToken()

          if (liffProfile == null){
            setAppUser(null)
            return
          }

          const encodedDisplayName = encoding.convert(liffProfile.name, {
            to: 'UNICODE',
            type: 'string'
          })

          const idToken = await user.getIdToken()

          setAppUser({
            userId: user.uid,
            idToken,
            displayName: encodedDisplayName,
            pictureUrl: liffProfile.picture,
          })

          console.log("SET APPUSER", {
            userId: user.uid,
            idToken,
            displayName: encodedDisplayName,
            pictureUrl: liffProfile.picture,
          })

          
          if (encodedDisplayName !== fbProfile.displayName || liffProfile.picture !== fbProfile.pictureUrl){
            await firebase.firestore().collection("users").doc("line-" + user.uid).update({
              displayName: encodedDisplayName,
              pictureUrl: liffProfile.picture,
            })
          }
        } else {
          setAppUser(null)
        }
      })

    return cancelAuthListener
  }, [])

  return { appUser, logout }
}

export { useUser }
