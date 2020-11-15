/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { useReducer, useState } from "react"
import Modal from 'react-modal'
import SwipeableViews from "react-swipeable-views"
import AnalyzedDocument, { TranslatedWord } from "../../../types/analyzedDocument"
import PartOfSpeech, { translatePoS } from "../../../types/partOfSpeech"
import WordCard from "../../organizm/WordCard"
import { commentAreaStyle, finalCardStyle, mainAreaStyle, operationAreaStyle, toolBarStyle, topBarStyle } from "./wordCardDialog.style"
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
  doc: AnalyzedDocument
  isOpen: boolean
  handleClose: () => void
  comments: Record<string, WordComment>
  docId: string
}

const WordCardDialog: React.FC<Props> = ({ doc, isOpen, handleClose, comments, docId }) => {
  const words = doc.translatedWords
  const sentences = doc.sentences
  const appUser = useRecoilValue(appUserAtom)
  const [commentMode, setCommentMode] = useState(false)
  
  const [index, setIndex] = useState(0)
  const [cardState, toggleCard] = useReducer((arr: boolean[], i: number) => {
    arr[i] = !arr[i]
    return [...arr]
  }, Array(words.length).fill(false))

  const handleBack = () => {
    if(index > 0) setIndex(index - 1)
  }

  const handleNext = () => {
    if(index < words.length) setIndex(index + 1)
  }

  const highlightedSampleText = (word: TranslatedWord) => {
    const frags = sentences[word.token.sentenceId].original.text.split(word.token.text)
    return frags.reduce((acc, c, i) => [...acc, c, <span key={i} className="target">{word.token.text}</span>], []).slice(0, -1)
  }


  const [isReading, setIsReading] = useState(false)
  const handleReading = () => {
    if(isReading) return
    const speech = new SpeechSynthesisUtterance(words[index].token.text)
    speech.lang = 'en-US'
    speech.addEventListener("end", () => setIsReading(false))
    setIsReading(true)
    speechSynthesis.speak(speech)
  }

  const isBookmarked = comments[words[index].token.lemma]?.bookmarks?.includes(appUser.userId) ?? false
  const bookmarkCount = comments[words[index].token.lemma]?.bookmarks?.length ?? 0
  const messages = comments[words[index].token.lemma]?.comments

  const handleBookmark = () => {
    initFirebase()
    firebase.firestore().collection("docs").doc(docId).collection("comments").doc(words[index].token.lemma).set({
      bookmarks: isBookmarked ? firebase.firestore.FieldValue.arrayRemove(appUser.userId) : firebase.firestore.FieldValue.arrayUnion(appUser.userId)
    }, { merge: true })
  }

  const [comment, setComment] = useState("")

  const handleSubmit = async () => {
    await firebase.firestore().collection("docs").doc(docId).collection("comments").doc(words[index].token.lemma).set({
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
      {
        commentMode ? (
          <div css={commentAreaStyle}>
            <div>
              {messages?.map(({content, createdAt}) => (
                <div className="comment-content"> <span className="created-at">{createdAt}</span> {content}</div>
              ))}
            </div>
            <input className="input-area" type="text" onChange={e => setComment(e.target.value)} value={comment}/>
            <div className={classNames("submit-button", comment === "" && "disabled")} onClick={handleSubmit}>送信</div>
            <div className="back-button" onClick={() => setCommentMode(false)}>戻る</div>
          </div>
        ):(
        <>
          <div css={topBarStyle}>
            <span className="icon" onClick={() => setCommentMode(true)}>
              {(messages?.length > 0 ?? false) ? <BiCommentDetail /> : <BiCommentDetail />}
            </span>
            {
              (messages?.length > 0 ?? false) &&
              <span className="count">{messages.length}</span>
            }
            <span className="icon bookmark" onClick={handleBookmark}>
            { isBookmarked ? <MdBookmark /> : <MdBookmarkBorder/> }
            </span>
            <span className="count">{bookmarkCount}</span>
          </div>
          <div css={mainAreaStyle}>
            <SwipeableViews index={index} onChangeIndex={setIndex} enableMouseEvents style={{height: "100%"}} containerStyle={{height: "100%"}}>
              {
                words.map((word, i) => (
                  <WordCard
                    key={i}
                    showAnswer={cardState[index]}
                    pos={translatePoS(word.token.part_of_speech as PartOfSpeech)}
                    text={word.token.text.toLowerCase()}
                    lemma={word.token.lemma}
                    translated={word.translated}
                    sentence={highlightedSampleText(word)}
                    translatedSentence={sentences[word.token.sentenceId].translated}
                  />
                ))
              }
            </SwipeableViews>
            <div css={operationAreaStyle}>
              <div className={classNames("left", index <= 0 && "disabled")} onClick={handleBack}/>
              <div className={classNames("center")} onClick={() => toggleCard(index)}>
                {
                  index >= words.length &&
                  <div css={finalCardStyle}>
                    <div onClick={() => setIndex(0)} className="restart">最初から</div>
                    <div className="share">シェア</div>
                  </div>
                }
              </div>
              <div className={classNames("right", index >= words.length && "disabled")} onClick={handleNext}/>
            </div>
          </div>
          <div css={toolBarStyle}>
            <div className="trash" role="button"><HiTrash /></div>
            <div className={classNames("speaker", isReading && "disabled")} onClick={handleReading} role="button" aria-disabled={isReading}><AiTwotoneSound /></div>
            <div className="edit" role="button"><AiFillEdit /></div>
          </div>
        </>
        )}
    </Modal>
  )
}


export default WordCardDialog