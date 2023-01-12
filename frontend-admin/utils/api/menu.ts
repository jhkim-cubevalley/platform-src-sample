import useSWR from "swr";
import axios, { query } from ".";
import { queryFilter } from "../queryFilter";
import { useLoginCheck } from "../useLogin";
import { createLibraryI, eachLibraryI, resultI, resultImageI } from "./library";
import { categoryProductI } from "./product";
import { eachRegionI } from "./region";

export interface eachMenuI {
  id: string;
  nameKo: string;
  nameEn: string;
  code: string;
  depth: number;
  priority: number;
  isEnable: boolean;
  createdAt: string;
  updatedAt: string;
  next: eachMenuI[] | null;
  parent?: eachMenuI | null;
  parentId?: string | null;
  productOne?: categoryProductI[];
  productTwo?: categoryProductI[];
  productThree?: categoryProductI[];
  isEdit?: boolean;
}

export const getMenuAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachMenuI[]; pageTotal: number; total: number };
  }>(`/menu`, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};

export interface createMenuI {
  nameKo: string;
  nameEn: string;
  code: string;
  depth: number;
  priority: number;
  isEnable: boolean;
  parentId: string | null;
}

export const postMenuAPI = async (
  nameKo: string,
  nameEn: string,
  code: string,
  depth: number,
  priority: number,
  isEnable: boolean,
  parentId: string | null
) => {
  const res = await axios.post<
    | {
        result: eachMenuI;
      }
    | {
        error: string;
        message: string;
      }
  >(`/menu`, {
    nameKo,
    nameEn,
    code,
    depth,
    priority,
    isEnable,
    parentId,
  });
  return res.data;
};

export interface editMenuI {
  id?: string;
  isEdit?: boolean;
  next?: eachMenuI[] | null;
  parentId?: string | null;
  depth?: number;
  nameKo: string;
  nameEn: string;
  code: string;
  priority: number;
  isEnable: boolean;
}

export const editMenuAPI = async (
  nameKo: string,
  nameEn: string,
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
  >(`/menu/${uid}`, {
    nameKo,
    nameEn,
    code,
    priority,
    isEnable,
  });
  return res.data;
};

export const deleteMenuAPI = async (uid: string) => {
  const res = await axios.delete<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/menu/${uid}`);
  return res.data;
};

export const getEachMenuAPI = async (uid: string) => {
  const res = await axios.get<{ result: eachMenuI }>(`/menu/${uid}`);
  return res.data.result;
};

export const getLibraryAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachLibraryI[]; pageTotal: number; total: number };
  }>(`/library`, {
    params: {
      // offset,
      ...queryFilter(query),
      limit: 8,
      // offset,
    },
  });
  return res.data;
};
export const getEachLibraryAPI = async (uid: string) => {
  const res = await axios.get<{ result: eachLibraryI }>(`/library/${uid}`);
  return res.data.result;
};

export const postLibraryAPI = async (
  name: string,
  originalName: string,
  isUse: boolean,
  continent: string,
  country: string,
  city: string,
  description: string,
  category: string,
  isPrivate: boolean,
  status: string,
  detail: Object
) => {
  const res = await axios.post<
    { result: resultI } | { error: string; message: string }
  >(`/library`, {
    name,
    originalName,
    isUse,
    continent,
    country,
    city,
    description,
    category,
    isPrivate,
    status,
    detail,
  });
  return res.data;
};

export const postLibraryImageAPI = async (imageUrl: any, id: string) => {
  const res = await axios.post<
    { result: resultImageI } | { error: string; message: string }
  >(`/library/image/${id}`, {
    imageUrl,
  });
  return res.data;
};

export const deleteLibraryImageAPI = async (id: string, imageKey: string) => {
  const res = await axios.delete<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/library/${id}/image/${imageKey}`);
  return res.data;
};

export const editLibraryAPI = async (
  name: string,
  originalName: string,
  isUse: boolean,
  continent: string,
  country: string,
  city: string,
  description: string,
  category: string,
  isPrivate: boolean,
  status: string,
  detail: Object,
  id: string | string[] | undefined
) => {
  const res = await axios.put<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/library/${id}`, {
    name,
    originalName,
    isUse,
    continent,
    country,
    city,
    description,
    category,
    isPrivate,
    status,
    detail,
  });
  return res.data;
};

export const deleteLibraryAPI = async (id: string) => {
  const res = await axios.delete<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/library/${id}`);
  return res.data;
};

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

export const uploadLibraryImageAPI = async ({
  uid,
  file,
}: {
  uid: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await axios.post(`/library/image/${uid}`, formData);
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};

export const uploadMultipleLibraryImageAPI = async ({
  uid,
  list,
}: {
  uid: string;
  list: File[];
}) => {
  const result = await Promise.all(
    list.map((file) => uploadLibraryImageAPI({ uid, file }))
  );
  return result.reduce((prev, curr) => prev && curr, true);
};

export const useMenuAPI = () => {
  const loginCheck = useLoginCheck();
  const swr = useSWR(loginCheck("/menu"), () => getMenuAPI());
  return swr;
};
