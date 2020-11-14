import { atom, selector } from "recoil";
import AppUser from "../types/appUser";
import { getObjFromLocalStorage, setObjToLocalStorage } from "../utils/localStorage";

const appUserRowAtom = atom<AppUser>({
  key: "appUser",
  default: (() => {
    const value = getObjFromLocalStorage("appUser")
    return value == null ? null : value as AppUser
  })()
})

const appUserAtom = selector<AppUser>({
  key: "appUserSelector",
  get: ({ get }) => get(appUserRowAtom),
  set: ({ set }, newValue) => {
    if(newValue != null){
      setObjToLocalStorage("appUser", newValue as Record<string, unknown>)
    }
    set(appUserRowAtom, newValue)
  },
})

export default appUserAtom