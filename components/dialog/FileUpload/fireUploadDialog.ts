import { css } from "@emotion/react";

export const mainAreaStyle = css`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const uploadButtonStyle = css`
    margin-bottom: 2rem;
    background: #dddddd;
    border: 2px solid #c2c2c2;
    border-radius: 5px;
    width: 90vw;
    text-align: center;

    label{
      display: block;
      padding: 5rem 3rem;
    }
`

export const buttonStyle = css`
  margin-bottom: 2rem;

  .button {
    padding: 0.5em 2em;
    background: #997575;
    color: white;

    &.disabled {
      background: #dddddd;
    }
  }
`