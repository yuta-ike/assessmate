import { css, keyframes } from "@emotion/react"

export const rootStyle = css`
  padding-bottom: 200px;
`

export const sentenceStyle = css`
  font-family: 'Merriweather';
  background: #f6f6f6;
  border-radius: 1em;
  padding: 1em .5em;
  line-height: 1.5;
  margin: 1em 0;

  & > .comment-icon{
    text-align: right;
    margin-right: 0.5em;
  }
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

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px 2px #d9d9d9;
`

export const translatedStyle = css`
  font-size: 0.8rem;
`

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  15% {
    transform: translateY(-100%);
  }
  30% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
`


export const splashStyle = css`
  width: 100%;
  margin-top: calc(50vh - 25px);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    animation: ${bounce} 2s infinite;

    &.a {
      animation-delay: .1s;
    }
     &.b {
      animation-delay: .2s;
    }
     &.c {
      animation-delay: .3s;
    }
     &.d {
      animation-delay: .4s;
    }
     &.e {
      animation-delay: .5s;
    }
     &.f {
      animation-delay: .6s;
    }
     &.g {
      animation-delay: .7s;
    }
     &.h {
      animation-delay: .8s;
    }
     &.i {
      animation-delay: .9s;
    }
     &.j {
      animation-delay: 1s;
    }
  }
`