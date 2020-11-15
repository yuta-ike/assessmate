/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { useReducer, useState } from "react"
import Modal from 'react-modal'
import SwipeableViews from "react-swipeable-views"
import AnalyzedDocument, { TranslatedWord } from "../../../types/analyzedDocument"
import PartOfSpeech, { translatePoS } from "../../../types/partOfSpeech"
import WordCard from "../../organizm/WordCard"
import { buttonStyle, mainAreaStyle, uploadButtonStyle } from "./fireUploadDialog"
import { HiTrash } from 'react-icons/hi'
import { AiFillEdit, AiTwotoneSound } from 'react-icons/ai'
import classNames from "classnames"
import { HiPhotograph } from 'react-icons/hi'

type Props = {
  isOpen: boolean
  handleClose: () => void
  setImage: (file: File) => void
  handleSubmit: () => void
  image: File
}

const FileUploadDialog: React.FC<Props> = ({ isOpen, handleClose, setImage, handleSubmit, image }) => {
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
          <div css={uploadButtonStyle}>
            <label htmlFor="file-upload">
              <HiPhotograph/> {image?.name ?? "写真を選択"}
              <input type="file" id="file-upload" onChange={e => setImage(e.target.files[0])} style={{display: "none"}}/>
            </label>
          </div>
          <div css={buttonStyle}>
            <div className={classNames("button", image == null && "disabled")} onClick={handleSubmit} role="button">送信</div>
          </div>
          {/* <SwipeableViews index={index} onChangeIndex={setIndex} enableMouseEvents style={{height: "100%"}} containerStyle={{height: "100%"}}>
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
        </div> */}
        </div>
      </>
    </Modal>
  )
}


export default FileUploadDialog