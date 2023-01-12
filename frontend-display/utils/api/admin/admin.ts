import axios, { query } from "..";
import { queryFilter } from "../../queryFilter";
import { eachGroupInfoI } from "./group";

export interface innerTeamInfoI {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface eachAdminInfoI {
  uid: string;
  email: string;
  name: string;
  employeeId: string;
  phone: string;
  directPhone: string;
  password: string;
  isLeave: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  group: eachGroupInfoI | null;
  department: innerTeamInfoI | null;
  team: innerTeamInfoI | null;
  jobPosition: innerTeamInfoI | null;
}

export const getAdminInfoAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachAdminInfoI[]; pageTotal: number; total: number };
  }>("/admin", { params: query });
  return res.data;
};

export const getEachAdminInfoAPI = async (id: string) => {
  const res = await axios.get<{ result: eachAdminInfoI }>(`/admin/get/${id}`);
  return res.data.result;
};

export interface addChangeAdminI {
  email: string;
  password?: string;
  name: string;
  employeeId: string;
  phone: string;
  directPhone: string;
  isLeave: boolean;
  groupId: string;
  departmentId: string;
  teamId: string;
  jobPositionId: string;
}

export const addChangeAdminInfoAPI = async (info: {
  id?: string;
  data: addChangeAdminI;
}) => {
  const { id = null, data } = info;
  const isAdd = id === null;
  let res;
  if (isAdd) {
    res = await axios.post(`/admin`, data);
  } else {
    res = await axios.put(`/admin/${id}`, data);
  }
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};

export interface eachRolePolicyI {
  code: string;
  canAccess: boolean;
  canUpdate: boolean;
  canApprove: boolean;
}

export interface eachRolePolicyDetailI extends eachRolePolicyI {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface roleInfoI {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  rolePolicy: eachRolePolicyDetailI[];
  group: eachGroupInfoI;
}

export const getRoleInfoAPI = async () => {
  const res = await axios.get<{
    result: { data: roleInfoI[] };
    pageTotal: number;
    total: number;
  }>("/admin/role");
  return res.data;
};

export const getEachRoleInfoAPI = async (id: number | string) => {
  const res = await axios.get<{ result: roleInfoI }>(`/admin/role/${id}`);
  return res.data.result;
};

export interface addChangeRoleInfoI {
  name: string;
  groupId: string;
  policies: eachRolePolicyI[];
}

export const addChangeRoleInfoAPI = async (data: {
  id?: number | string;
  info: addChangeRoleInfoI;
}) => {
  const { id = null, info } = data;
  const isAdd = id === null;
  let res;
  if (isAdd) {
    res = await axios.post(`/admin/role`, info);
  } else {
    res = await axios.put(`/admin/role/${id}`, info);
  }
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};

export const deleteEachRoleAPI = async (id: string | number) => {
  const res = await axios.delete(`/admin/role/${id}`);
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};

export interface eachDepartmentInfoI extends innerTeamInfoI {
  team: innerTeamInfoI[];
  admins: eachAdminInfoI[];
}

export interface eachTeamInfoI extends innerTeamInfoI {
  admins: eachAdminInfoI[];
  upperDepartment: innerTeamInfoI;
}

export interface eachJobPositionInfoI extends innerTeamInfoI {
  admins: eachAdminInfoI[];
}

function getInfoAPIMaker<OutputType>(url: string) {
  return async () => {
    const res = await axios.get<{ result: OutputType }>(url);
    return res.data.result;
  };
}

export const getTeamsAPIs = {
  department: getInfoAPIMaker<eachDepartmentInfoI[]>("/admin/department"),
  team: getInfoAPIMaker<eachTeamInfoI[]>("/admin/team"),
  jobPosition: getInfoAPIMaker<eachJobPositionInfoI[]>("/admin/jobposition"),
};

function getEachInfoAPIMaker<OutputType>(url: string) {
  return async (id: string) => {
    const res = await axios.get<{ result: OutputType }>(`${url}/${id}`);
    return res.data.result;
  };
}

export const getEachTeamsAPIs = {
  department: getEachInfoAPIMaker<eachDepartmentInfoI>("/admin/department"),
  team: getEachInfoAPIMaker<eachTeamInfoI>("/admin/team"),
  jobPosition: getEachInfoAPIMaker<eachJobPositionInfoI>("/admin/jobposition"),
};

export interface addChangeTeamsI {
  name: string;
}

export interface addChangeDepartmentI extends addChangeTeamsI {}
export interface addChangeTeamI extends addChangeTeamsI {
  upperDepartmentId: string;
}
export interface addChangeJobPositionI extends addChangeTeamsI {}

function addChangeAPIMaker<InputType>(url: string) {
  return async (info: { id?: string; data: InputType }) => {
    const { id = null, data } = info;
    const isAdd = id === null;
    let res;
    if (isAdd) {
      res = await axios.post(url, data);
    } else {
      res = await axios.put(`${url}/${id}`, data);
    }
    if ("error" in res.data) {
      alert(`${res.data.message} (${res.data.error})`);
      return false;
    }
    return true;
  };
}

export const addChangeTeamsAPIs = {
  department: addChangeAPIMaker<addChangeDepartmentI>("/admin/department"),
  team: addChangeAPIMaker<addChangeTeamI>("/admin/team"),
  jobPosition: addChangeAPIMaker<addChangeJobPositionI>("/admin/jobposition"),
};

export const deleteTeamsAPI = async (
  id: string,
  type: "department" | "team" | "jobPosition"
) => {
  const url = `/admin/${type.toLowerCase()}/${id}`;
  const res = await axios.delete(url);
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};
