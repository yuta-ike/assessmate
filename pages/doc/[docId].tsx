/** @jsx jsx */
import { jsx } from '@emotion/react'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import * as admin from 'firebase-admin'
import AnalyzedDocument, { Token } from '../../types/analyzedDocument'
import { useAuthRoute } from '../../utils/auth/routes'
import initAdminFirebase from '../../utils/auth/initAdminFirebase'
import { rootStyle, sentenceStyle, fabButtonStyle, translatedStyle } from '../../components/page_style/doc.style'
import TokenComponent from '../../components/atom/TokenComponent/TokenComponent'
import { MdColorLens } from 'react-icons/md'
import WordCardDialog from '../../components/dialog/WordCard/WordCardDialog'
import { HiColorSwatch } from 'react-icons/hi'
import firebase from 'firebase'
import FabText from '../../components/atom/Fab/FabText'

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

const DocumentPage: React.FC<Props> = ({ text: jsonText = "", isAnalyzing, docId }) => {
  useAuthRoute()

  const [doc, setDoc] = useState<AnalyzedDocument>(() => isAnalyzing ? {} : JSON.parse(jsonText))

  const [wordCardOpen, setWordCardOpen] = useState(false)
  const [simpleMode, setSimpleMode] = useState(true)

  useEffect(() => {
    if (isAnalyzing) {
      firebase.firestore().collection('docs').doc(docId.toString()).onSnapshot((snapshot) => {
        const newData = snapshot.data().text
        if(newData != null){
          newData.tokens = JSON.parse(newData.tokens)
          setDoc(newData)
        }
      })
    }
  }, [])

  if(doc.tokens == null){
    return <div> LOADING... </div>
  }

  return (
    <div css={rootStyle}>
      {
        doc.tokens.map((tokens, i) => (
          <div key={i}>
            <div css={sentenceStyle}>
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
      <WordCardDialog isOpen={wordCardOpen} handleClose={() => setWordCardOpen(false)} doc={doc}/>
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
