import { SentenceResult, TokenResult } from "ibm-watson/natural-language-understanding/v1"
import { ExToken } from "../pages/doc/[docId]"

export type Token = TokenResult
export type TranslatedWord = { token: ExToken, translated: string }


type AnalyzedDocument = {
  rowText: string
  tokens: ExToken[][]
  sentences: {id: number, original: SentenceResult, translated: string}[]
  translatedWords: TranslatedWord[]
}

export default AnalyzedDocument