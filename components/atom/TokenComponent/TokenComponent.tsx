import React from 'react'
import { ExToken } from '../../../pages/doc/[docId]'
import { subStyle, baseWordStyle, colorWordStyle } from './tokenComponent.style'

type Props = {
  token: ExToken
  simpleMode: boolean
}

const TokenComponent: React.FC<Props> = ({ token, simpleMode }) => {
  return (
    <>
      <div
        className={`token-${token.part_of_speech} ` + token.roles.map((role) => `rule-${role.type}-${role.id}`).join(" ")}
        css={simpleMode ? baseWordStyle : colorWordStyle}
      >
        {token.text}
        {!simpleMode && token.text.toLowerCase() !== token.lemma?.toLowerCase() && (
          <div css={subStyle}>{token.lemma}</div>
        )}
      </div>
    </>
  )
}

export default TokenComponent
