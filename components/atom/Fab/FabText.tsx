/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { fabTextStyle } from './FabText.style'

type Props = {
  onClick: () => void
}

const FabText: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div css={fabTextStyle} onClick={onClick}>
      {children}
    </div>
  )
}

export default FabText
