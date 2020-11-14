import { NextApiRequest, NextApiResponse } from "next"
import client, { linebotMiddleware } from "../../../utils/linebot/initLinebot"
import runMiddleware from "../../../utils/router/runMiddleware"

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, linebotMiddleware)
  // const signature = req.headers["X-Line-Signature"].toString()
  // validateSignature(req.body, process.env.LINE_BOT_CHANNEL_SECRET, signature)

  const replyToken = req.body.events[0].replyToken
  
  const message = await client.replyMessage(req.body.replyToken, {
    type: 'text',
    text: req.body.messages[0].text
  })
  return res.status(200).json({
    replyToken,
    messages: [message],
  })
}

export default webhook