export const getObjFromLocalStorage = (key: string): null | Record<string, unknown> => {
  if(!process.browser) return null

  const json = localStorage.getItem(key)
  if (json == null) return null
  try{
    return JSON.parse(json)
  }catch{
    console.error("miss to serialize")
    return null
  }
}

export const setObjToLocalStorage = (key: string, obj: Record<string, unknown>) => {
  if (!process.browser) return null

  localStorage.setItem(key, JSON.stringify(obj))
}