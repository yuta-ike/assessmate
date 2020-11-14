/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { headerStyle } from './wordCard.style'
import classNames from 'classnames'

type Props = {
  showAnswer: boolean
  pos: string
  text: string
  lemma: string
  translated: string
  sentence: React.ReactNode
  translatedSentence: string
}

const WordCard: React.FC<Props> = ({ showAnswer, pos, text, lemma, translated, sentence, translatedSentence }) => {
  return (
    <>
      <div css={headerStyle}>
        <div className="pos">{pos}</div>
        <div className="text">{text}</div>
        <div className="lemma">{lemma}</div>
        <div className={classNames("translated", !showAnswer && "hide")}>{translated}</div>
        <p className="sentence">{sentence}</p>
        <p className={classNames("sentence-translated", !showAnswer && "hide")}>{translatedSentence}</p>
      </div>
    </>
  )
}

export default WordCard
