import { useRouter } from "next/dist/client/router"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import appUserAtom from "../../atoms/appUser"

export const useAuthRoute = () => {
  const appUser = useRecoilValue(appUserAtom)
  const router = useRouter()

  useEffect(() => {
    console.log("AUTH ROUTE", appUser)
    if (process.browser && appUser == null) {
      router.replace("/login")
    }
  }, [appUser])
}

export const useUnAuthRoute = () => {
  const appUser = useRecoilValue(appUserAtom)
  const router = useRouter()

  useEffect(() => {
    console.log("UNAUTH ROUTE", appUser)
    if (process.browser && appUser != null) {
      router.push("/")
    }
  }, [appUser])
}
