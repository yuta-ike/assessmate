/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { useReducer, useState } from "react"
import Modal from 'react-modal'
import SwipeableViews from "react-swipeable-views"
import AnalyzedDocument, { TranslatedWord } from "../../../types/analyzedDocument"
import PartOfSpeech, { translatePoS } from "../../../types/partOfSpeech"
import WordCard from "../../organizm/WordCard"
import { finalCardStyle, mainAreaStyle, operationAreaStyle, toolBarStyle } from "./wordCardDialog.style"
import { HiTrash } from 'react-icons/hi'
import { AiFillEdit, AiTwotoneSound } from 'react-icons/ai'
import classNames from "classnames"

type Props = {
  doc: AnalyzedDocument
  isOpen: boolean
  handleClose: () => void
}

const WordCardDialog: React.FC<Props> = ({ doc, isOpen, handleClose }) => {
  const words = doc.translatedWords
  const sentences = doc.sentences
  
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
      <>
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
    </Modal>
  )
}


export default WordCardDialog