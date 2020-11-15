/** @jsx jsx */
import { jsx } from '@emotion/react'
import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import { useAuthRoute } from '../utils/auth/routes'
import { useEffect, useState } from 'react'
import axios from 'axios'
import firebase from 'firebase'
import { v4 as uuid } from 'uuid'
import { documentItemEmptyStyle, documentItemStyle, keywordStyle } from '../components/page_style/index.style'
import { useRouter } from 'next/dist/client/router'
import FabText from '../components/atom/Fab/FabText'
import { FaPlus } from 'react-icons/fa'
import FileUploadDialog from '../components/dialog/FileUpload/FileUploadDialog'

const Index: React.FC = () => {
  const { appUser } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [documents, setDocuments] = useState([])
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  
  useEffect(() => {
    (async () => {
      if(appUser != null){
        const snapshots = await firebase.firestore().collection("docs").where("createdBy", "==", appUser.userId).where("isFinished", "==", true).orderBy("updatedAt", "desc").get()
        const documents = snapshots.docs.map((snapshot) => ({content: snapshot.data(), id: snapshot.id}))
        setDocuments(documents)
        setIsLoading(false)
      }
    })()
  }, [appUser])


  const [image, setImage] = useState<File>(null)

  const handleSubmit = async () => {
    if(image == null) return
    
    const imageId = uuid()
    await firebase.storage().ref().child(`docimage/${imageId}`).put(image)
    
    const imageUrl = await firebase.storage().ref(`docimage/${imageId}`).getDownloadURL()

    // 画像を処理する
    await axios.post("https://assessmate.herokuapp.com/analyze", { imageId, imageUrl, userId: appUser.userId }, {
      headers: {
        Authorization: `Bearer ${appUser.idToken}`,
      }
    }).catch(console.log)

    router.push(`/doc/${imageId}`)
  }

  const handleShowDetail = (docId: string) => router.push(`/doc/${docId}`)
 
  return (
    <>
      <div>アップロード文章一覧</div>
      <div role="list">
        {
          isLoading && (
            <>
            <div role="listitem" css={documentItemEmptyStyle}/>
            <div role="listitem" css={documentItemEmptyStyle}/>
            <div role="listitem" css={documentItemEmptyStyle}/>
            <div role="listitem" css={documentItemEmptyStyle}/>
            <div role="listitem" css={documentItemEmptyStyle}/>
            <div role="listitem" css={documentItemEmptyStyle}/>
            </>
          )
        }
        {
          documents.map((document) => (
            <div role="listitem" css={documentItemStyle} onClick={() => handleShowDetail(document.id)}>
              <p>{document.content.text.rowText}</p>
              {document.content.keywords != null && <div css={keywordStyle}>{document.content.keywords.map((keyword, i) => <span key={i} className="keyword">{keyword}</span>)}</div>}
            </div>
          ))
        }
      </div>
      <FabText onClick={() => setUploadDialogOpen(true)}>
        <FaPlus /> 文書をアップロードする
      </FabText>
      <FileUploadDialog isOpen={uploadDialogOpen} handleClose={() => setUploadDialogOpen(false)} setImage={setImage} handleSubmit={handleSubmit} image={image}/>


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
