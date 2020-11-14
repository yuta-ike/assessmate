import { NextApiRequest, NextApiResponse } from 'next'
import { Fields, Files, IncomingForm } from 'formidable'
import verifyRequest from '../../../utils/auth/verifyRequest'
import * as admin from 'firebase-admin'
import analyzeText from '../../../interactor/analyzeText'
import { v4 as uuid } from 'uuid'

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id: userId } = await verifyRequest(req)
    
    const form = new IncomingForm()
    const { files } = await new Promise<{ files: Files, fields: Fields }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      })
    })

    const imageId = uuid()

    await Promise.all([
      // Firestoreにドキュメントを追加
      admin.firestore().collection("docs").add({
        createdBy: userId,
        isFinished: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }),
      
      // Firebase Storageに画像を保存
      admin.storage().bucket().upload(files.image.path, { destination: `docimage/${imageId}` }),

      // テキスト認識を開始
      // axios.post("/api/analyze", {
      //   imageId, imageUrl: files.image.path
      // }).catch(console.log)
      analyzeText(imageId, files.image.path)
    ])

    return res.status(200).json({
      doc_id: imageId
    })
  } catch (error) {
    console.log(error)
    return res.status(401).send('You are unauthorised')
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default upload
