import { NextApiRequest, NextApiResponse } from 'next'
import verifyRequest from '../../../utils/auth/verifyRequest'
import * as admin from 'firebase-admin'
import axios from 'axios'

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id: userId } = await verifyRequest(req)

    const imageId = req.body.imageId
    const imageUrl = req.body.imageUrl

    await Promise.all([
      // Firestoreにドキュメントを追加
      admin.firestore().collection("docs").doc(imageId).set({
        createdBy: userId,
        isFinished: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }),
    ])

    axios.post("https://assessmate.herokuapp.com/analyze", { imageId, imageUrl })

    return res.status(200).json({
      doc_id: imageId
    })
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}


export default upload
