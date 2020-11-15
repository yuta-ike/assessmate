import { css } from "@emotion/react";

export const mainAreaStyle = css`
  position: relative;
  width: 100vw;
`

export const operationAreaStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  & > .disabled{
    pointer-events: none;
  }

  & > .left {
    flex: 2;
  }
  & > .center {
    flex: 3;
  }
  & > .right {
    flex: 2;
  }
`

export const toolBarStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 0.4em;

  & > div {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    vertical-align: middle;
    display: inline;
    cursor: pointer;
    

    &.trash {
      color: orangered;
    }

    &.speaker {
      color: #333333;
      &.disabled{
        color: #AAAAAA;
      }
    }

    &.edit {
      color: green;
    }
  }
`

export const finalCardStyle = css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  
  & > .restart{
    padding: 1rem 0;
    border: 2px solid #9b9bde;
    border-radius: 3px;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 0.8rem;
    position: relative;

    &::before {

    }
  }

  & > .share{
    padding: 1rem 0;
    border: 2px solid #9b9bde;
    border-radius: 3px;
    margin-bottom: 3em;
    text-align: center;
    font-size: 0.8rem;
  }
`

export const topBarStyle = css`
  height: 2rem;
  font-size: 1.5rem;
  text-align: right;
  padding: 0 1em;
  width: 100%;
  
  & > .icon {
    color: #b57b79;

    &.bookmark{
      margin-left: 1em;
    }
  }

  & > .count {
    font-size: 1rem;
  }
`

export const commentAreaStyle = css`
  min-height: 40vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  & .comment-content {
    margin: 0.5em 0;
  }

  & .created-at {
    font-size: 0.5rem;
  }

  & > .input-area {
    margin: 1em 0;
    padding: .5em .2em;
    font-size: 0.9rem;
  }

  & > .submit-button {
    align-self: center;
    margin: 1em;
    padding: .5em 2em;
    text-align: center;
    border-radius: 3px;
    background: #997575;
    color: white;

    &.disabled {
      background: #d9d9d9;
    }
  }

  & > .back-button {
    align-self: center;
    text-align: center;
    margin-bottom: 1em;
  }

`