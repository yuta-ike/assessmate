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