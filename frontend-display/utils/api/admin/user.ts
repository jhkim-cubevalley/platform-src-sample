import axios, { query } from "..";
import { queryFilter } from "../../queryFilter";
import { eachGroupInfoI } from "./group";

export interface userInfoI {
  uid: string;
  email: string;
  name: string;
  nickname: string;
  sex: string;
  phone: string;
  password?: string;
  socialType: string | null;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  accountSns?: {
    id: number;
    name: string;
    handle: string;
    createdAt: string;
    updatedAt: string;
  }[];
  group?: eachGroupInfoI | null;
}

export const getUserAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: userInfoI[]; pageTotal: number; total: number };
  }>("/admin/account/user", {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};

export interface eachUserI {
  uid: string;
  email: string;
  name: string;
  nickname: string;
  sex: "M" | "F";
  phone: string;
  socialType: string | null;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  group: eachGroupInfoI;
  accountSns: { name: string; handle: string }[];
}

export const getEachUserAPI = async (uid: string) => {
  const res = await axios.get<{ result: eachUserI }>(
    `/admin/account/user/${uid}`
  );
  return res.data.result;
};

export interface editEachUserI {
  nickname: string;
  sex: string;
  groupId: string;
  point: number;
  phone: string;
  sns: {
    name: "string";
    handle: "string";
  }[];
}

export const editEachUserAPI = async (uid: string, info: editEachUserI) => {
  const res = await axios.put(`/admin/account/user/${uid}`, info);
};

// export const deleteEachUserAPI = async (uid: string) => {
//   const res = await axios.delete(`/auth/withdraw/user/${uid}`)
// }
