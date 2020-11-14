/** @jsx jsx */
import { jsx } from '@emotion/react'
import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import { useAuthRoute } from '../utils/auth/routes'
import { useState } from 'react'
import axios from 'axios'
import formData from '../utils/formData'
import firebase from 'firebase'
import { v4 as uuid } from 'uuid'

const Index = () => {
  useAuthRoute()
  const { appUser } = useUser()

  const [image, setImage] = useState<File>(null)

  const handleSubmit = async () => {
    if(image == null) return
    
    const imageId = uuid()
    await firebase.storage().ref().child(`/docimage/${imageId}`).put(image)
    
    const imageUrl = await firebase.storage().ref().child(`/docimage/${imageId}`).getDownloadURL()

    // 画像を処理する
    const res = await axios.post("/api/upload", { imageId, imageUrl }, {
      headers: {
        Authorization: `Bearer ${appUser.idToken}`,
      }
    })
    console.log(res.data.doc_id)
  }
 
  return (
    <>
      <p>Hi there!</p>
      <button onClick={async () => await axios.get(`https://script.google.com/macros/s/AKfycbxV7vAp2WIJ3VGmSzA0O096_KI0btIAPKKa0zIy_liCIa46d9Y2/exec`, {
        params: { text: "Apple", source: "en", target: "ja" }
      })}>調べる</button>
      {
        appUser != null && (
          <>
          <p>{appUser.displayName}</p>
          <img src={appUser.pictureUrl} width="50"/>
          </>
        )
      }
      <p>
        You are not signed in.{' '}
        <Link href={'/login'}>
          <a>Sign in</a>
        </Link>
      </p>
      <input type="file" onChange={e => setImage(e.target.files[0])}/>
      <button onClick={handleSubmit}>送信</button>
    </>
  )
}

export default Index
