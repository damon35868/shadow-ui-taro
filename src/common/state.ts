import { atom, useAtom } from "jotai";

const tokenAtom = atom("token");

export function useToken() {
  const [token, setToken] = useAtom(tokenAtom);
  return { token, setToken };
}
