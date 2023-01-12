import axios from "..";
import { groupType } from "../useGroup";

interface userInGroupInfoI {
  uid: string;
  email: string;
  name: string;
  phone: string;
  isLeave: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface eachGroupInfoI {
  id: string;
  name: string;
  code: string;
  type: string;
  description: string;
  commissionMultiple: string | null;
  pointMultiple: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface eachGroupDetailI extends eachGroupInfoI {
  user: userInGroupInfoI[];
  cubeez: userInGroupInfoI[];
  admin: userInGroupInfoI[];
}

export const getGroupAPI = async (type: string) => {
  const res = await axios.get<{
    result: { data: eachGroupDetailI[] };
  }>("/group", { params: { type } });
  return res.data.result.data;
};

interface createGroupDefaultI {
  name: string;
  description: string;
}

export interface createGroupUserI extends createGroupDefaultI {
  type: "USER";
  pointMultiple: number;
}

export interface createGroupCubeezI extends createGroupDefaultI {
  type: "CUBEEZ";
  commissionMultiple: number;
}

export interface createGroupAdminI extends createGroupDefaultI {
  type: "ADMIN";
}

type createGroupType =
  | createGroupUserI
  | createGroupCubeezI
  | createGroupAdminI;

export const createGroupAPI = async (info: createGroupType) => {
  await axios.post("/group", info);
};

export const deleteGroupAPI = async (id: string) => {
  const res = await axios.delete(`/group/${id}`);
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};

export interface editGroupInfoI extends createGroupDefaultI {
  commissionMultiple?: number;
  pointMultiple?: number;
}

export const editGroupAPI = async (id: string, info: editGroupInfoI) => {
  await axios.put(`/group/${id}`, info);
};

export interface setGroupInfoI {
  uid: string;
  type: groupType;
  groupId: string;
}

export const setGroupAPI = async (info: setGroupInfoI) => {
  await axios.post("/group/account", info);
};

export const setMultiGroupAPI = async (list: setGroupInfoI[]) => {
  await Promise.all(list.map((info) => setGroupAPI(info)));
};
