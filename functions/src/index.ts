import * as functions from 'firebase-functions';
import analyzeText from './analyzeText';

export const analyze = functions.firestore.document(`docs/{docId}`).onCreate(async (snapshot, context) => {
  const docId = snapshot.id
  console.log(docId)
  const url = `https://firebasestorage.googleapis.com/v0/b/assessmate-study/o/${encodeURIComponent(`docimage/${docId}`)}?alt=media`
  console.log(url)

  await analyzeText(docId, url)
})
