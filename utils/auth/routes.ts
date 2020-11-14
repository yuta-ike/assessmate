import { useRouter } from "next/dist/client/router"
import { useRecoilValue } from "recoil"
import appUserAtom from "../../atoms/appUser"

export const useAuthRoute = () => {
  const appUser = useRecoilValue(appUserAtom)
  const router = useRouter()

  if (process.browser && appUser == null) {
    router.replace("/login")
  }
}

export const useUnAuthRoute = () => {
  const appUser = useRecoilValue(appUserAtom)
  const router = useRouter()

  if (process.browser && appUser != null) {
    router.push("/")
  }
}
