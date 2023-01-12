import Axios from "axios";
import { debouncedAlert } from "../debounce";
import useLogin from "../useLogin";

const axios = Axios.create({
  baseURL: "/api",
  validateStatus: (status) => true,
});

axios.interceptors.response.use(
  (res) => {
    if (res?.data?.error) {
      const { error, message } = res.data;
      if (error === "MUST_LOGIN_BEFORE") return res;
      debouncedAlert(`${message}`);
      throw Error;
    } else if (res.status >= 400) {
      debouncedAlert(`${res.status} ${res.statusText} 에러가 발생했습니다.`);
      throw Error;
    }
    return res;
  },
  (err) => err
);

export interface query {
  [key: string]: any;
}

export function secondArgsFetcher<T, TT>(func: (a: T) => TT) {
  return (url: any, args: T) => func(args);
}

export default axios;
