type PartOfSpeech = "ADJ" | "ADP" | "ADV" | "AUX" | "CCONJ" | "DET" | "INTJ" | "NOUN" | "NUM" | "PART" | "PRON" | "PROPN" | "PUNCT" | "SCONJ" | "SYM" | "VERB" | "X"

export const translatePoS = (pos: PartOfSpeech) => {
  switch(pos){
    case "ADJ": {
      return "形容詞"
    }
    case "ADP": {
      return "設置詞"
    }
    case "ADV": {
      return "副詞"
    }
    case "AUX": {
      return "助動詞"
    }
    case "CCONJ": {
      return "接続詞"
    }
    case "DET": {
      return "限定詞"
    }
    case "INTJ": {
      return "間投詞"
    }
    case "NOUN": {
      return "名詞"
    }
    case "NUM": {
      return "数詞"
    }
    case "PART": {
      return "助詞"
    }
    case "PRON": {
      return "代名詞"
    }
    case "PROPN": {
      return "固有名詞"
    }
    case "PUNCT": {
      return "句読点"
    }
    case "SCONJ": {
      return "連結詞"
    }
    case "SYM": {
      return "シンボル"
    }
    case "VERB": {
      return "動詞"
    }
    case "X": {
      return "不明"
    }
  }
}

export default PartOfSpeech