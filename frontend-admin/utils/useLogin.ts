import axios from "./api";
import useSWR from "swr";
import { authAPIInfoI } from "./api/auth";

export type loginType = "cubeez" | "admin";

interface notLoginInfo {
  login: false;
}

interface loginInfo {
  login: true;
  loginType: loginType;
  info: authAPIInfoI;
}

export type useLoginInfo = loginInfo | notLoginInfo;

export const loginTokenKey = "cubevally_admin_access";
const loginTypeKey = "cubevally_admin_type";

const setLogin = (info?: { type: loginType; token: string }) => {
  if (info) {
    const { type, token } = info;
    localStorage.setItem(loginTokenKey, token);
    localStorage.setItem(loginTypeKey, type);
  } else {
    localStorage.removeItem(loginTokenKey);
    localStorage.removeItem(loginTypeKey);
  }
};

export const useSetLogin = () => {
  const { loginMutate } = useLogin();
  return (info?: { type: loginType; token: string }) => {
    setLogin(info);
    loginMutate();
  };
};

export const useLogin = () => {
  const {
    data = { login: false },
    mutate,
    isValidating,
  } = useSWR<useLoginInfo>(
    "login",
    async () => {
      let ok = false;
      let info = undefined;
      const accessToken = localStorage.getItem(loginTokenKey);
      const loginType = localStorage.getItem(loginTypeKey) as loginType;
      if (accessToken && (loginType === "cubeez" || loginType === "admin")) {
        const res1 = await axios.get<
          { result: authAPIInfoI } | { error: string }
        >("/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if ("error" in res1.data) {
          const res2 = await axios.get<{ result: string }>(`/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res2.data.result) {
            ok = true;
            localStorage.setItem(loginTokenKey, res2.data.result);
            const res3 = await axios.get<
              { result: authAPIInfoI } | { error: string }
            >("/auth/me", {
              headers: {
                Authorization: `Bearer ${res2.data.result}`,
              },
            });
            if ("result" in res3.data) {
              info = res3.data.result;
            }
          } else {
            ok = false;
            setLogin();
          }
        } else {
          ok = true;
          info = res1.data.result;
        }
      }
      axios.defaults.headers.common["Authorization"] = ok
        ? `Bearer ${accessToken}`
        : "";
      return ok
        ? {
            login: true,
            loginType,
            info: info as authAPIInfoI,
          }
        : {
            login: false,
          };
    },
    {
      fallbackData: { login: false },
    }
  );
  return {
    loginData: data,
    loginMutate: mutate,
    loginIsValidating: isValidating,
  };
};

export const useLoginCheck = () => {
  const { loginData } = useLogin();
  return (toReturn: any) => {
    if (loginData.login) return toReturn;
    return null;
  };
};

export default useLogin;
