const getLiff = async () => {
  const liff = (await import('@line/liff')).default
  await liff.ready
  return liff
}

export default getLiff