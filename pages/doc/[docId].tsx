/** @jsx jsx */
import { jsx } from '@emotion/react'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import * as admin from 'firebase-admin'
import AnalyzedDocument, { Token } from '../../types/analyzedDocument'
import { useAuthRoute } from '../../utils/auth/routes'
import initAdminFirebase from '../../utils/auth/initAdminFirebase'
import { rootStyle, sentenceStyle, fabButtonStyle, translatedStyle, bottomBarStyle } from '../../components/page_style/doc.style'
import TokenComponent from '../../components/atom/TokenComponent/TokenComponent'
import { MdColorLens } from 'react-icons/md'
import WordCardDialog from '../../components/dialog/WordCardDialog'
import { HiColorSwatch } from 'react-icons/hi'

type Props = {
  text: string
}

export type ExToken = Token & {
  id: number,
  sentenceId: number,
  offsetId: number,
  roles: {
    id: number,
    type: string,
  }[]
}

const DocumentPage: React.FC<Props> = ({ text: jsonText }) => {
  useAuthRoute()

  const [wordCardOpen, setWordCardOpen] = useState(false)
  const [simpleMode, setSimpleMode] = useState(false)

  // TODO: 失敗した時の処理
  const doc = JSON.parse(jsonText) as AnalyzedDocument

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
      <div css={bottomBarStyle} onClick={() => setWordCardOpen(true)}>
        <HiColorSwatch/> 単語帳を開く
      </div>
    </div>
  )
}

export default DocumentPage

export const getServerSideProps: GetServerSideProps<Props> = async ({ params: { docId } }) => {
  initAdminFirebase()
  const snapshot = await admin.firestore().collection('docs').doc(docId.toString()).get()
  const obj = snapshot.data().text
  obj.tokens = JSON.parse(obj.tokens)
  const text = JSON.stringify(obj)
  return { props: { text } }
}
