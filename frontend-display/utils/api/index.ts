import Axios from "axios";

const axios = Axios.create({
  baseURL: "/api",
  validateStatus: (status) => status < 500,
});

export interface query {
  [key: string]: any;
}

export function secondArgsFetcher<T, TT>(func: (a: T) => TT) {
  return (url: any, args: T) => func(args);
}

export interface errorI {
  error: string;
  message: string;
}

export default axios;
