import { css } from "@emotion/react"

export const rootStyle = css`
  padding-bottom: 200px;
`

export const sentenceStyle = css`
  background: #f6f6f6;
  border-radius: 1em;
  padding: 1em .5em;
  line-height: 1.5;
  margin: 1em 0;
`

export const fabButtonStyle = css`
  position: fixed;
  right: 1rem;
  bottom: calc(1rem + 70px);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: white;
  font-size: 30px;
  /* line-height: 50px;
  text-align: center; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px 2px #d9d9d9;
`

export const translatedStyle = css`
  font-size: 0.8rem;
`

export const bottomBarStyle = css`
  width: calc(100vw - 2rem);
  position: fixed;
  left: 1rem;
  bottom: 20px;
  background: #ffffffee;
  text-align: center;
  height: 50px;
  line-height: 50px;
  display: inline;
  vertical-align: middle;
  border-radius: 1rem;
  box-shadow: 0 0 4px 2px #d9d9d9;
`