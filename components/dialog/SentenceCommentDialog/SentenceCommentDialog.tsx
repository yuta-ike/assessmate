/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { useReducer, useState } from "react"
import Modal from 'react-modal'
import SwipeableViews from "react-swipeable-views"
import AnalyzedDocument, { TranslatedWord } from "../../../types/analyzedDocument"
import PartOfSpeech, { translatePoS } from "../../../types/partOfSpeech"
import WordCard from "../../organizm/WordCard"
import { commentAreaStyle } from "./sentenceCommentDialog.style"
import { HiTrash } from 'react-icons/hi'
import { AiFillEdit, AiTwotoneSound } from 'react-icons/ai'
import classNames from "classnames"
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { BiCommentDetail } from "react-icons/bi"
import { WordComment } from '../../../pages/doc/[docId]'
import { useRecoilValue } from 'recoil'
import appUserAtom from '../../../atoms/appUser'
import firebase from 'firebase'
import initFirebase from '../../../utils/auth/initFirebase'


type Props = {
  isOpen: boolean
  handleClose: () => void
  docId: string
  sentenceId: number
  comments: { userId: string, content: string, createdAt: string }[]
}

const SentenceCommentDialog: React.FC<Props> = ({ isOpen, handleClose, comments, docId, sentenceId }) => {
  const appUser = useRecoilValue(appUserAtom)
  const [comment, setComment] = useState("")

  const handleSubmit = async () => {
    await firebase.firestore().collection("docs").doc(docId).collection("sentenceComments").doc(sentenceId.toString()).set({
      comments: firebase.firestore.FieldValue.arrayUnion({ userId: appUser.userId, content: comment, createdAt: new Date().toISOString().slice(0, 10) })
    }, { merge: true })
    setComment("")
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={{
        overlay: {
          background: "#33333366"
        },
        content: {
          borderRadius: "2em 2em 0 0",
          border: "1px solid #cfcfcf",
          top: "auto",
          bottom: 0,
          left: "0px",
          right: "0px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 0,
        }
      }}
      contentLabel="Example Modal"
    >
      <div css={commentAreaStyle}>
        <div>
          {comments?.map(({content, createdAt}) => (
            <div className="comment-content"> <span className="created-at">{createdAt}</span> {content}</div>
          ))}
          {(comments == null || comments.length === 0) && (
            <div className="comment-content system-message">まだコメントはありません。</div>
          )}
        </div>
        <input className="input-area" type="text" onChange={e => setComment(e.target.value)} value={comment}/>
        <div className={classNames("submit-button", comment === "" && "disabled")} onClick={handleSubmit}>送信</div>
        <div className="back-button" onClick={handleClose}>戻る</div>
      </div>
    </Modal>
  )
}


export default SentenceCommentDialog