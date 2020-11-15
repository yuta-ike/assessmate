import { css } from "@emotion/react";

export const commentAreaStyle = css`
  min-height: 40vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  & .comment-content {
    margin: 0.5em 0;

    &.system-message {
      text-align: center;
      font-size: 0.8rem;
    }
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