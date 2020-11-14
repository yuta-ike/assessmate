import { css } from "@emotion/react"

export const baseWordStyle = css`
  display: inline-block;
  margin: .2em 0 1.5em 0;
  padding: 0 2px;
  color: #333333;
  font-size: 14px;
  position: relative;
`
export const colorWordStyle = css`
  ${baseWordStyle}
  
  &.rule-subject-0{
    background: #e0ecdd
  }

  &.rule-object-0{
    background: #b3b9f3;
  }

  &.rule-action-0{
    /* background: #f5dada; */
  }

  /* 形容詞 */
  &.token-ADJ {
    border-bottom: 2px dashed #8a94ee;
  }

  /* 前置詞 */
  &.token-ADP {
    border: 2px solid #e4ee8a;
    border-radius: 50%;
  }

  /* 副詞 */
  &.token-ADV {
    border-bottom: 2px solid #e4a1f5;
  }

  /* 助詞 */
  &.token-PART {
    
  }

  /* 助動詞 */
  &.token-AUX {
    border: 2px solid #ee8a8a;
    border-radius: 3px;
  }

  /* 接続詞 */
  &.token-CCONJ {
    border-bottom: 3px double #8aceee;
  }

  /* 名詞 */
  &.token-NOUN {

  }
  
  /* 固有名詞 */
  &.token-PROPN {

  }

  /* 代名詞 */
  &.token-PRON {

  }

  /* 動詞 */
  &.token-VERB {
    font-weight: bold;
    border: 2px solid #ee8a8a;
    border-radius: 3px;
    background: #f5dada;
  }

  /* 連結詞 */
  &.token-SCONJ {
    border: 2px solid #8aceee;
    border-radius: 3px;
  }
`

export const subStyle = css`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  text-align: center;
  font-weight: normal;
  font-size: 80%;
`