import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import Modal from 'react-modal'
import "../components/page_style/globalStyle.css"

Modal.setAppElement('#root')

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if(process.browser){
      import('@line/liff').then((liffLib) => {
        liffLib.default.init({ liffId: process.env.LIFF_ID })
      })
    }

    
  }, [])
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" /> */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet"/>
      </Head>
      <RecoilRoot>
        <div id="root">
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </>
    )
  }
export default App