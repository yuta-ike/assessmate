/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useEffect } from 'react'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import appUserAtom from '../atoms/appUser'
import firebase from 'firebase'
import initFirebase from '../utils/auth/initFirebase'
import { useUser } from '../utils/auth/useUser'
import getLiff from '../utils/liff/getLiff'
import { useUnAuthRoute } from '../utils/auth/routes'
import { useRouter } from 'next/dist/client/router'

const Auth = () => {
  useUnAuthRoute()
  useUser()

  const appUser = useRecoilValue(appUserAtom)
  const router = useRouter()

  useEffect(() => {
    if (process.browser && appUser == null){
      (async () => {
        const liff = await getLiff()
        
        if (!liff.isLoggedIn()) {
          liff.login()
          return
        }

        const accessToken = liff.getAccessToken();
        
        const res = await axios.post('/api/auth/login', {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
        const token = res.data.token

        initFirebase()
        const credential = await firebase.auth().signInWithCustomToken(token)
        console.log("LOGIN FIN")
      })()
    }else{
      router.push("/")
    }
  }, [])

  const user = useUser()
  console.log(user)

  return (
    <div>
      <p>Sign in</p>
      <div>
        {/* <FirebaseAuth /> */}
      </div>
    </div>
  )
}

export default Auth
