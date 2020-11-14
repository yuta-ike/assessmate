import { NextApiRequest, NextApiResponse } from "next"
import recognizeText from "../../../services/recognizeText"
import verifyRequest from "../../../utils/auth/verifyRequest"

const recognize = async (req: NextApiRequest, res: NextApiResponse) => {
  try{
    await verifyRequest(req)
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }

  const url = req.body.url
  if (url == null){
    return res.status(400).json(errors.urlNotFound)
  }else if(url === ""){
    return res.status(400).json(errors.urlEmpty)
  }

  await recognizeText(url)
  return res.status(200)
}

export default recognize

const errors = {
  urlNotFound: {
    message: "パラメータが不正です",
    error: [
      { field: "url", message: "指定されていません" }
    ]
  },
  urlEmpty: {
    message: "パラメータが不正です",
    error: [
      { field: "url", message: "urlが空文字です" }
    ]
  },
}