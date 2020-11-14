import { NextApiRequest, NextApiResponse } from "next"

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200)
}

export default webhook