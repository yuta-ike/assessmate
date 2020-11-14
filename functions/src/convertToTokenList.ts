import { SemanticRolesResult, SentenceResult, TokenResult } from "ibm-watson/natural-language-understanding/v1"

export type ExToken = TokenResult & {
  id: number,
  sentenceId: number,
  offsetId: number,
  roles: {
    id: number,
    type: string,
  }[]
}

type Func = (args: { sentences: SentenceResult[], tokens: TokenResult[], semanticRoles: SemanticRolesResult[] }) => ExToken[][]

const convertToTokenList: Func = ({sentences, tokens, semanticRoles}) => {
  let tokenId = 0;
  return sentences.map(({ location: [startIndex, endIndex], text }, sentenceId) => {
    const rules = semanticRoles.filter(({ sentence }) => sentence.trim() === text.trim())
    const ruleIndexes = rules.map((rule) => {
      const subjectText = rule.subject.text
      const objectText = rule.object.text
      const actionText = rule.action.text
      return [
        [startIndex + text.indexOf(subjectText), startIndex + text.indexOf(subjectText) + subjectText.length, rule.subject],
        [startIndex + text.indexOf(objectText), startIndex + text.indexOf(objectText) + objectText.length, rule.object],
        [startIndex + text.indexOf(actionText), startIndex + text.indexOf(actionText) + actionText.length, rule.action]
      ]
    }).slice(0, 1)

    return tokens
      .filter(({ location: [tokenStartIndex, tokenEndIndex] }) => startIndex <= tokenStartIndex && tokenEndIndex <= endIndex)
      .map<ExToken>((token, offsetId) => {
        const { location: [tokenStartIndex, tokenEndIndex] } = token
        const ruleIds = []
        ruleIndexes.forEach(([[subStart, subEnd], [objStart, objEnd], [actStart, actEnd]], id) => {
          if (subStart <= tokenStartIndex && tokenEndIndex <= subEnd)
            ruleIds.push({ id, type: "subject" })
          if (objStart <= tokenStartIndex && tokenEndIndex <= objEnd)
            ruleIds.push({ id, type: "object" })
          if (actStart <= tokenStartIndex && tokenEndIndex <= actEnd)
            ruleIds.push({ id, type: "action" })
        })
        return { ...token, id: tokenId++, sentenceId, offsetId, roles: ruleIds }
      })
  })
}

export default convertToTokenList