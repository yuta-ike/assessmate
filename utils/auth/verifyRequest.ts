import { NextApiRequest } from "next"
import { verifyIdToken } from "./firebaseAdmin"

const verifyRequest = async (req: NextApiRequest) => {
  const [type, accessToken] = req.headers.authorization?.split(" ")
  if (type !== "Bearer" || accessToken === "") throw new Error("Unauthorized")
  return await verifyIdToken(accessToken)
}

export default verifyRequest