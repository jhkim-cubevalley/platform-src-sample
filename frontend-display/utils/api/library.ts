import axios from "axios";
import { query } from ".";
import { queryFilter } from "../queryFilter";
import { eachRegionI, productRegionI } from "./region";

export interface adminI {
  uid: string;
  email: string;
  name: string;
  employeeId: string;
  phone: string;
  directPhone: string;
  password?: string;
  isLeave: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  group?: groupI | null;
  department?: companyI;
  team?: companyI;
  jobPosition?: companyI;
}

export interface groupI {
  id: string;
  name: string;
  code: string;
  type: string;
  description: string;
  commissionMultiple: string | null;
  pointMultiple: string | null;
  createdAt: string;
  updatedAt: string;
  role: roleI[] | null;
}
export interface roleI {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  rolePolicy: rolePolicyI[];
}
export interface rolePolicyI {
  id: string;
  code: string;
  canAccess: boolean;
  canUpdate: boolean;
  canApprove: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface companyI {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface imageI {
  id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
export interface libraryListI {
  id: string;
  category: string;
  isPrivate: boolean;
  status: string;
  name: string;
  originalName: string;
  isUse: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  detail: [];
  image: imageI[];
  cubeez: adminI | null;
  admin: adminI | null;
  /**
   * there's no data from backend
   */
  code?: string;
  country?: string;
  city?: string;
  link?: boolean;
}

export interface resultImageI {
  imageUrl: string;
  library: eachLibraryI;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface resultI {
  category: string;
  isPrivate: string;
  status: string;
  name: string;
  originalName: string;
  isUse: boolean;
  description: string;
  continent: {
    id: string;
  };
  country: {
    id: string;
  };
  city: {
    id: string;
  };
  cubeez: string | null;
  admin: adminI | null;
  createdAt: string;
  updatedAt: string;
  detail: [];
  image: imageI[];
  id: string;
}

export interface createLibraryI {
  name: string;
  originalName: string;
  isUse: string | boolean;
  continent: string;
  country: string;
  city: string;
  description: string;
  category: string;
  isPrivate: string | boolean;
  status: string;
  detail: {
    tier?: string;
    address?: string;
    detailAddress?: string;
    facility?: string;
    tel?: string;
    web?: string;
    departureAirport?: string;
    duration?: string;
    item?: string;
    canRefund?: string;
    exchangeRefund?: string;
    guide?: string;
    currency?: string;
    costAdult?: string;
    payment?: string;
    replacement?: string;
    image?: string;
  };
  image?: imageI[];
  cubeez?: string | null;
  admin?: adminI | null;
}

export interface eachDetailI {
  id: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}
export interface detailI {
  address?: eachDetailI;
  detailAddress?: eachDetailI;
  tier?: eachDetailI;
  tel?: eachDetailI;
  web?: eachDetailI;
  facility?: eachDetailI;
  convenience?: eachDetailI;
}
export interface eachLibraryI {
  id: string;
  category: string;
  isPrivate: boolean | string;
  status: string;
  name: string;
  originalName: string;
  isUse: boolean | string;
  description: string;
  createdAt: string;
  updatedAt: string;
  detail: eachDetailI[];
  image: imageI[];
  cubeez: adminI | null;
  admin: adminI | null;
  productPlanDetail: [];
  continent: productRegionI;
  country: productRegionI;
  city: productRegionI;
  code?: string;
  link?: boolean;
}
// export const getLibraryAPI = async (query?: query) => {
//   const res = await axios.get<{
//     result: { data: eachLibraryI[]; pageTotal: number; total: number };
//   }>(`/library`, {
//     params: {
//       ...queryFilter(query),
//     },
//   });
//   return res.data;
// };

// use menu.ts components. Didn't use below functions
export const getLibraryAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachLibraryI[]; pageTotal: number; total: number };
  }>(`/library`, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};
export const getEachLibraryAPI = async (uid: string) => {
  const res = await axios.get<{ result: eachLibraryI }>(`/library/${uid}`);
  return res.data.result;
};

export const postLibraryAPI = async (props: createLibraryI) => {
  const res = await axios.post<
    { result: resultI } | { error: string; message: string }
  >(`/library`, {
    props,
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

export const postLibraryImageAPI = async (imageUrl: string, id: string) => {
  const res = await axios.post<
    { result: resultImageI } | { error: string; message: string }
  >(`/library/image/${id}`, {
    imageUrl,
  });
  return res.data;
};

export const editLibraryAPI = async (props: createLibraryI, id: string) => {
  const res = await axios.put<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/library/${id}`, {
    props,
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
