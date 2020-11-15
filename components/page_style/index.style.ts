import { css } from "@emotion/react";

export const documentItemStyle = css`
  font-family: 'Merriweather';
  line-height: 2;
  & > p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 0.5em;
  }
  margin: 0;

  border-bottom: 1px solid #dddddd;
`

export const documentItemEmptyStyle = css`
  ${documentItemStyle}

  height: 8em;
  background: #f6f6f6;
  margin-bottom: 0.5em;
`

export const keywordStyle = css`
  font-size: 0.8rem;
  overflow-x: scroll;
  white-space:nowrap;
  margin-bottom: 1em;

  & > .keyword{
    position: relative;
    background: #8f7d7d;
    color: white;
    margin: 0 0.2em;
    padding: 0 10px 0 20px;
    border-radius: 1em 3px 3px 1em;
    display: inline-block;

    &:before {
      position: absolute;
      top: calc(50% - 0.25em);
      left: 0.5em;
      width: 0.5em;
      height: 0.5em;
      content: '';
      border-radius: 50%;
      background: #fff;
    }
  }
`