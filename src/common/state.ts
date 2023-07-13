import { atom, useAtom } from "jotai";
import { setItem } from "./utils";

const tokenAtom = atom<null | string>(null);

const userAuthAtom = atom<null | string>(null);

export function useToken() {
  const [token, setTokenFn] = useAtom(tokenAtom);

  const setToken = (accessToken: string) => {
    setItem("token", accessToken);
    setTokenFn(accessToken);
  };

  return { token, setToken };
}
