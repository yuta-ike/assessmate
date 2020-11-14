import { NextApiRequest, NextApiResponse } from "next"
import client, { linebotMiddleware } from "../../../utils/linebot/initLinebot"
import runMiddleware from "../../../utils/router/runMiddleware"

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("PHASE1")
  // await runMiddleware(req, res, linebotMiddleware)
  // const signature = req.headers["X-Line-Signature"].toString()
  // validateSignature(req.body, process.env.LINE_BOT_CHANNEL_SECRET, signature)
  console.log("PHASE2")

  const replyToken = req.body.events[0].replyToken
  console.log("PHASE3", req.body.events)
  console.log("PHASE3", replyToken)

  return res.status(200).json({
    replyToken,
    messages: ["HELLO from vercel!!"],
  })
}

export default webhook