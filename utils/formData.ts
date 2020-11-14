const formData = (obj: Record<string, string | Blob>) => {
  const data = new FormData()
  Object.entries(obj).forEach(([key, value]) => {
    data.append(key, value)
  })
  return data
}

export default formData