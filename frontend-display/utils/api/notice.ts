import axios, { query } from ".";
import { queryFilter } from "../queryFilter";
import { adminI } from "./library";

export interface linkedNoticeI {
  id: string;
  title: string;
}
export interface eachNoticeI {
  id: string;
  title: string;
  content: string;
  target: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  prev?: linkedNoticeI;
  next?: linkedNoticeI;
  author?: adminI;
}

export const getNoticeAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachNoticeI[]; pageTotal: number; total: number };
  }>(`/notice`, {
    params: {
      ...queryFilter(query),
      limit: 10,
    },
  });
  return res.data;
};

export interface createNoticeI {
  title: string;
  content: string;
  target: string;
  status: string;
  author: adminI;
  createdAt: string;
  updatedAt: string;
}

export const postNoticeAPI = async (
  title: string,
  content: string,
  target: string,
  status: string
) => {
  const res = await axios.post<
    | {
        result: eachNoticeI;
      }
    | {
        error: string;
        message: string;
      }
  >(`/notice`, {
    title,
    content,
    target,
    status,
  });
  return res.data;
};

export const getEachNoticeAPI = async (uid: string) => {
  const res = await axios.get<{ result: eachNoticeI }>(`/notice/${uid}`);
  console.log(res.data);
  return res.data;
};

export const editNoticeAPI = async (
  title: string,
  content: string,
  target: string,
  status: string,
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
  >(`/notice/${uid}`, {
    title,
    content,
    target,
    status,
  });
  return res.data;
};

export const deleteNoticeAPI = async (uid: string) => {
  const res = await axios.delete<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/notice/${uid}`);
  return res.data;
};
