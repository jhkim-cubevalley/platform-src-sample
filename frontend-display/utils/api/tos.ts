import useSWR from "swr";
import axios, { secondArgsFetcher } from ".";
import { eachProductI } from "./product";

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

export const getEachTosAPI = async (uid: string) => {
  const res = await axios.get<{ result: eachTosI }>(`/tos/${uid}`);
  return res.data.result;
};

export const useEachTosAPI = (id: string) => {
  return useSWR(["/tos", id], secondArgsFetcher(getEachTosAPI));
};

export const editTosAPI = async (
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
  >(`/library`, {
    name,
    type,
    content,
    isEnable,
  });
  return res.data;
};
