import { middleware, validateSignature } from "@line/bot-sdk"
import { NextApiRequest, NextApiResponse } from "next"
import client from "../../../utils/linebot/initLinebot"
import runMiddleware from "../../../utils/router/runMiddleware"

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, middleware)
  // const signature = req.headers["X-Line-Signature"].toString()
  // validateSignature(req.body, process.env.LINE_BOT_CHANNEL_SECRET, signature)
  
  return client.replyMessage(req.body.replyToken, {
    type: 'text',
    text: req.body.messages[0].text
  });
}

export default webhook