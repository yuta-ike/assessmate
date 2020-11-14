import * as admin from 'firebase-admin'
import recognizeText from "../services/recognizeText"
import NaturalLanguageUnderstanding from 'ibm-watson/natural-language-understanding/v1'
import LanguageTranslatorV3 from 'ibm-watson/language-translator/v3'
import { IamAuthenticator } from 'ibm-watson/auth'
import convertToTokenList from '../utils/convertToTokenList'
import axios from 'axios'

const textAnalyzer = new NaturalLanguageUnderstanding({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_ANALYZE_API_KEY,
  }),
  serviceUrl: process.env.WATSON_ANALYZE_SERVICE_URL,
})

const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_TRANSLATE_API_KEY,
  }),
  serviceUrl: process.env.WATSON_TRANSLATE_SERVICE_URL,
})

const analyzeText = async (imageId: string, imageUrl: string) => {
  console.log("START")
  const text = (await recognizeText(imageUrl)).replace(/\s*\n\s*/g, " ")
  console.log("MID1")

  const res = await textAnalyzer.analyze({
    text,
    language: "en",
    features: {
      entities: {},
      keywords: {},
      syntax: {
        tokens: {
          lemma: true,
          part_of_speech: true,
        },
        sentences: true
      },
      semantic_roles:{
        keywords: true,
        entities: true,
      }
    }
  })

  const tokens = convertToTokenList({ sentences: res.result.syntax.sentences, tokens: res.result.syntax.tokens, semanticRoles: res.result.semantic_roles, })

  const translated = await languageTranslator.translate({
      text: res.result.syntax.sentences.map(sentence => sentence.text),
      source: "en",
      target: "ja",
    })

  const words = tokens.flat(1)
      .filter(({ part_of_speech }) => ["ADJ", "CCONJ", "NOUN", "VERB"].includes(part_of_speech))
  
  const promises = Array.from(new Set(words)).map(async (token) => {
    const res = await axios.get(`https://script.google.com/macros/s/AKfycbxV7vAp2WIJ3VGmSzA0O096_KI0btIAPKKa0zIy_liCIa46d9Y2/exec`, {
      params: { text: token.text, source: "en", target: "ja" }
    })
    return { token, translated: res.data.text }
  })
  
  const translatedWords = await Promise.all(promises)

  await admin.firestore().collection("docs").doc(imageId).set({
    isFinished: true,
    text: {
      rowText: text,
      tokens: JSON.stringify(tokens),
      sentences: translated.result.translations.map(({translation}, i) => ({id: i, translated: translation, original: res.result.syntax.sentences[i]})),
      translatedWords: translatedWords,
    }
  }, { merge: true })
}

export default analyzeText