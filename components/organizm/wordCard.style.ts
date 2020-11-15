import { css } from "@emotion/react";

export const headerStyle = css`
  font-family: 'Merriweather';
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  & > * {
    transition: all .1s;
  
    &.hide {
      opacity: 0;
    }
  }

  & > .pos {
    border: 1px solid gray;
    padding: 0 1em;
    margin-bottom: 1rem;
    font-family: 'M PLUS Rounded 1c';
  }

  & > .text {
    font-size: 30px;
  }

  & > .lemma {
    color: gray;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  & > .translated {
    font-size: 25px;
    margin-bottom: 1rem;
    color: #ff7526;
    font-family: 'M PLUS Rounded 1c';
  }

  & > .sentence {
    margin-bottom: 0.3rem;
    width: 90vw;
    word-break: break-all;

    & > .target {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  & > .sentence-translated{
    margin-bottom: 2rem;
    width: 90vw;
    color: gray;
    font-size: 0.8rem;
    font-family: 'M PLUS Rounded 1c';
  }
`