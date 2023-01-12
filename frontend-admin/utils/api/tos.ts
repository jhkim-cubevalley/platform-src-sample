import useSWR from "swr";
import axios, { query } from ".";
import { queryFilter } from "../queryFilter";
import { useLoginCheck } from "../useLogin";
import { createLibraryI, eachLibraryI, resultI, resultImageI } from "./library";
import { eachProductI } from "./product";
import { eachRegionI } from "./region";

export interface eachProductTosI {
  id: string;
  createdAt: string;
  updatedAt: string;
  product: eachProductI;
}
export interface eachTosI {
  id: string;
  name: string;
  type: string;
  content: string;
  isEnable: boolean;
  createdAt: string;
  updatedAt: string;
  productTos: eachProductTosI[];
}

export const getTosAPI = async () => {
  const res = await axios.get<{
    result: eachTosI[];
  }>(`/tos`);
  return res.data;
};

export const useTosAPI = () => {
  const loginCheck = useLoginCheck();
  const swr = useSWR(loginCheck("/tos"), () => getTosAPI());
  return swr;
};

export const getEachTosAPI = async (uid: string) => {
  const res = await axios.get<{ result: eachTosI }>(`/tos/${uid}`);
  return res.data.result;
};

export const editTosAPI = async (
  name: string,
  content: string,
  isEnable: boolean,
  uid: string
) => {
  const res = await axios.put<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/tos/${uid}`, {
    name,
    content,
    isEnable,
  });
  return res.data;
};

export const deleteTosAPI = async (uid: string) => {
  const res = await axios.delete<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/tos/${uid}`);
  return res.data;
};

export const postTosAPI = async (
  name: string,
  type: string,
  content: string,
  isEnable: boolean
) => {
  const res = await axios.post<
    { result: eachTosI } | { error: string; message: string }
  >(`/tos`, {
    name,
    type,
    content,
    isEnable,
  });
  return res.data;
};
