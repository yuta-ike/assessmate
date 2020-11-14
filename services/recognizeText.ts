import { createWorker } from "tesseract.js"

const worker = createWorker({
  logger: m => {
    // console.log(`WorkerId: ${m.workerId} | jobId: ${m.jobId} | status: ${m.status} | progress: ${`${m.progress}`.slice(0, 4)}`)
  },
})

let workerInitialized = false

const initWorker = async () => {
  if(workerInitialized) return
  await worker.load()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')
  workerInitialized = true
}

const recognizeText = async (url: string) => {
  await initWorker()
  const { data: { text } } = await worker.recognize(url)
  return text
}

export default recognizeText