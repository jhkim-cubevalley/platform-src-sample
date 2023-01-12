import axios, { query } from ".";
import { queryFilter } from "../queryFilter";

export interface productRegionI {
  id: string;
  name: string;
  code: string;
  depth: number;
  priority: number;
  isEnable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface eachRegionI {
  id: string;
  name: string;
  code: string;
  depth: number;
  priority: number;
  isEnable: boolean;
  createdAt: string;
  updatedAt: string;
  next: eachRegionI[] | null;
  parent?: eachRegionI | null;
  productOne?: [] | null;
  productTwo?: [] | null;
  productThree?: [] | null;
  parentId?: string | null;
  isEdit?: boolean;
}

export interface createRegionI {
  name: string;
  code: string;
  depth: number;
  priority: number;
  isEnable: boolean;
  parentId: string | null;
}

export interface editRegionI {
  id?: string;
  isEdit?: boolean;
  next?: eachRegionI[] | null;
  depth?: number;
  parentId?: string | null;
  name: string;
  code: string;
  priority: number;
  isEnable: boolean;
}

export const getRegionAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachRegionI[]; pageTotal: number; total: number };
  }>(`/region`, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};
export const postRegionAPI = async (
  name: string,
  code: string,
  depth: number,
  priority: number,
  isEnable: boolean,
  parentId: string | null
) => {
  const res = await axios.post<
    | {
        result: eachRegionI;
      }
    | {
        error: string;
        message: string;
      }
  >(`/region`, {
    name,
    code,
    depth,
    priority,
    isEnable,
    parentId,
  });
  return res.data;
};
export const editRegionAPI = async (
  name: string,
  code: string,
  priority: number,
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
  >(`/region/${uid}`, {
    name,
    code,
    priority,
    isEnable,
  });
  return res.data;
};

export const deleteRegionAPI = async (uid: string) => {
  const res = await axios.delete<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/region/${uid}`);
  return res.data;
};

export const getEachRegionAPI = async (uid: string) => {
  const res = await axios.get<{ result: eachRegionI }>(`/region/${uid}`);
  return res.data.result;
};
