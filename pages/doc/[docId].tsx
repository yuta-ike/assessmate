/** @jsx jsx */
import { jsx } from '@emotion/react'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import * as admin from 'firebase-admin'
import AnalyzedDocument, { Token } from '../../types/analyzedDocument'
import { useAuthRoute } from '../../utils/auth/routes'
import initAdminFirebase from '../../utils/auth/initAdminFirebase'
import { rootStyle, sentenceStyle, fabButtonStyle, translatedStyle, splashStyle } from '../../components/page_style/doc.style'
import TokenComponent from '../../components/atom/TokenComponent/TokenComponent'
import { MdColorLens } from 'react-icons/md'
import WordCardDialog from '../../components/dialog/WordCard/WordCardDialog'
import { HiColorSwatch } from 'react-icons/hi'
import { BiCommentDetail } from 'react-icons/bi'
import firebase from 'firebase'
import FabText from '../../components/atom/Fab/FabText'
import initFirebase from '../../utils/auth/initFirebase'
import SentenceCommentDialog from '../../components/dialog/SentenceCommentDialog/SentenceCommentDialog'

type Props = { text?: string, isAnalyzing: boolean, docId: string }

export type ExToken = Token & {
  id: number,
  sentenceId: number,
  offsetId: number,
  roles: {
    id: number,
    type: string,
  }[]
}

export type WordComment = {
  comments: { userId: string, content: string, createdAt: string }[],
  bookmarks: string[],
}

const DocumentPage: React.FC<Props> = ({ text: jsonText = "", isAnalyzing, docId }) => {
  useAuthRoute()

  const [doc, setDoc] = useState<AnalyzedDocument>(() => isAnalyzing ? {} : JSON.parse(jsonText))
  const [comments, setComments] = useState<Record<string, WordComment>>({})
  
  const [wordCardOpen, setWordCardOpen] = useState(false)
  const [simpleMode, setSimpleMode] = useState(true)
  
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [sentenceComments, setSentenceComments] = useState<{ userId: string, content: string, createdAt: string }[][]>([])
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const handleOpenComment = (id: number) => {
    setSentenceIndex(id)
    setCommentDialogOpen(true)
  }

  useEffect(() => {
    initFirebase()
    firebase.firestore().collection('docs').doc(docId.toString()).onSnapshot((snapshot) => {
      const newData = snapshot.data().text
      if(newData != null){
        newData.tokens = JSON.parse(newData.tokens)
        setDoc(newData)
      }
    })
    firebase.firestore().collection('docs').doc(docId.toString()).collection('comments').onSnapshot((snapshot) => {
      const res = snapshot.docs.map(snapshot => {
        return [snapshot.id, {
          comments: snapshot.data().comments as {userId: string, content: string}[],
          bookmarks: snapshot.data().bookmarks as string[],
        }]
      })
      setComments(Object.fromEntries(res))
    })

    firebase.firestore().collection('docs').doc(docId.toString()).collection('sentenceComments').onSnapshot((snapshot) => {
      let comment: { userId: string, content: string, createdAt: string }[][] = []
      snapshot.docs.forEach(snapshot => {
        comment[snapshot.id as unknown as number] = snapshot.data().comments as { userId: string, content: string, createdAt: string }[]
      })
      setSentenceComments(comment)
    })
  }, [])

  if(doc.tokens == null) {
    return (
      <div css={splashStyle}>
        <span className="a">A</span>
        <span className="b">S</span>
        <span className="c">S</span>
        <span className="d">E</span>
        <span className="e">S</span>
        <span className="f">S</span>
        <span className="g">M</span>
        <span className="h">A</span>
        <span className="i">T</span>
        <span className="j">E</span>
      </div>
    )
  }

  return (
    <div css={rootStyle}>
      {
        doc.tokens.map((tokens, i) => (
          <div key={i}>
            <div css={sentenceStyle}>
              <div className="comment-icon" onClick={() => handleOpenComment(i)}>{(sentenceComments?.length > 0 ?? false) ? <BiCommentDetail /> : <BiCommentDetail />}</div>
              {
                tokens.map((token, i) => (
                  <TokenComponent token={token} simpleMode={simpleMode} key={i}/>
                ))
              }
            </div>
            {
              !simpleMode && (
                <div css={translatedStyle}>
                  {doc.sentences[i]?.translated ?? ""}
                </div>
              )
            }
          </div>
        ))
      }
      <WordCardDialog isOpen={wordCardOpen} handleClose={() => setWordCardOpen(false)} doc={doc} docId={docId} comments={comments}/>
      <SentenceCommentDialog comments={sentenceComments[sentenceIndex]} docId={docId} isOpen={commentDialogOpen} handleClose={() => setCommentDialogOpen(false)} sentenceId={sentenceIndex}/>
      <div role="button" css={fabButtonStyle} onClick={() => setSimpleMode(!simpleMode)}>
        <MdColorLens/>
      </div>
      <FabText onClick={() => setWordCardOpen(true)}>
        <HiColorSwatch/> 単語帳を開く
      </FabText>
    </div>
  )
}

export default DocumentPage

export const getServerSideProps: GetServerSideProps<Props> = async ({ params: { docId } }) => {
  initAdminFirebase()
  const snapshot = await admin.firestore().collection('docs').doc(docId.toString()).get()
  const obj = snapshot.data().text
  if (obj == null) return { props: { docId: docId.toString(), isAnalyzing: true} }
  obj.tokens = JSON.parse(obj.tokens)
  const text = JSON.stringify(obj)
  return { props: { docId: docId.toString(), text, isAnalyzing: false } }
}
