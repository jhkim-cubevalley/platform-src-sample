import { useCallback, useMemo } from "react";
import useSWR from "swr";
import axios, { query, secondArgsFetcher } from ".";
import { queryFilter } from "../queryFilter";
import { eachCubeezInfoI } from "./admin/cubeez";
import { historyI } from "./event";
import { adminI, eachLibraryI, groupI } from "./library";
import { eachMenuI } from "./menu";
import { eachRegionI } from "./region";

export interface eachEventI {
  id: number;
  code: string;
  startDate: string;
  status: string;
  isRequestStop: boolean;
  editMessage: string | null;
  adminMessage: string | null;
  imaginary: number;
  createdAt: string;
  updatedAt: string;
}
export interface eachTosI {
  tos: { id: string };
  createdAt: string;
}
export interface eachPlanI {
  id: string;
  day: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  planDetail: eachPlanDetailI[];
}
export interface eachPlanDetailI {
  id: string;
  type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  library: eachLibraryI | null;
}
export interface patchPlanDetailI {
  details: { type: string; content: string; libraryId: string }[];
  day: number;
  description: string;
}
export interface eachNoteI {
  id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface patchNoteI {
  type: string;
  title: string;
  description: string;
}
export interface eachFlightI {
  id: string;
  flightType: string;
  isLayover: boolean;
  flightName: string;
  company: string;
  seatRank: string;
  canChange: boolean;
  departureTime: string;
  arrivalTime: string;
  moveTime: string;
  createdAt: string;
  updatedAt: string;
}
export interface patchFlightI {
  flightType: string;
  isLayover: boolean;
  flightName: string;
  company: string;
  seatRank: string;
  canChange: boolean;
  departureTime: string;
  arrivalTime: string;
  moveTime: string;
}
export interface eachProductI {
  code: string;
  id: number;
  name: string;
  nameEn: string;
  fuelSurcharge: number;
  priceAdult: number;
  priceTeen: number;
  priceKid: number;
  priceText: null | string;
  minPeople: number;
  maxPeople: number;
  departure: string;
  dateFrom: string;
  dateTo: string;
  departurePeriod: string;
  endDay: number;
  description: string;
  pros: string;
  tag: string;
  isManagement: boolean;
  managementType: string | null;
  moreMessage: string | null;
  status: string;
  requestMessage: string | null;
  content: string;
  tripDate: number;
  tripNight: number;
  moreNote: string;
  caution: string;
  refund: string;
  createdAt: string;
  updatedAt: string;
  cubeez: eachCubeezInfoI | null;
  admin: adminI | null;
  manageGroup: groupI;
  category: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      categoryOne: eachMenuI;
      categoryTwo: eachMenuI;
      categoryThree: eachMenuI;
    }
  ];
  region: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      regionOne: eachRegionI;
      regionTwo: eachRegionI;
      regionThree: eachRegionI;
    }
  ];
  flight: eachFlightI[];
  note: eachNoteI[];
  plan: eachPlanI[];
  image: { imageUrl: string; isThumb: boolean }[];
  approves: [];
  badges: [];
  tos: eachTosI[];
  events: eachEventI[];
  contract: null;
  productTos?: { tos: eachTosI }[];
  history: historyI[];
}

export interface patchProductI {
  name?: string;
  nameEn?: string;
  fuelSurcharge?: number;
  priceAdult?: number;
  priceTeen?: number;
  priceKid?: number;
  priceText?: null | string;
  minPeople?: number;
  maxPeople?: number;
  departure?: string;
  dateFrom?: string;
  dateTo?: string;
  departurePeriod?: string;
  endDay?: number;
  description?: string;
  pros?: string;
  tag?: string;
  isManagement?: boolean;
  managementType?: string | null;
  moreMessage?: string | null;
  status?: string;
  content?: string;
  tripDate?: number;
  tripNight?: number;
  moreNote?: string;
  caution?: string;
  refund?: string;
  categories?: {
    categoryOne: string;
    categoryTwo: string;
    categoryThree: string;
  }[];
  regions?: {
    regionOne: string;
    regionTwo: string;
    regionThree: string;
  }[];
  flights?: patchFlightI[];
  notes?: patchNoteI[];
  plans?: patchPlanDetailI[];
  tos?: string[];
}

export interface patchMenuProductI {
  categories?: [
    {
      categoryOne: string;
      categoryTwo: string;
      categoryThree: string;
    }
  ];
}

export interface categoryProductI {
  id: string;
  createdAt: string;
  updatedAt: string;
  product: eachProductI;
}

export const getProductAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachProductI[]; pageTotal: number; total: number };
  }>(`/product`, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};

export const getMyProductAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachProductI[]; pageTotal: number; total: number };
  }>(`/product/me`, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};

export const patchProductAPI = async (
  id: number | string,
  req: patchProductI
) => {
  const res = await axios.patch<
    { result: boolean } | { error: string; message: string }
  >(`/product/${id}`, req);
  return res.data;
};

export const createProductAPI = async (
  req: patchProductI & {
    isForIncentive?: boolean;
    status: string;
    requestMessage?: string;
  }
) => {
  const res = await axios.post<
    { result: { id: number } } | { error: string; message: string }
  >(`/product`, req);
  return res.data;
};

export const patchMenuProductAPI = async (
  id: number,
  categories: {
    categories: Array<{
      categoryOne: string;
      categoryTwo: string;
      categoryThree: string;
    }>;
  }
) => {
  const res = await axios.patch<
    { result: boolean } | { error: string; message: string }
  >(`/product/${id}`, categories);
  return res.data;
};

export const getEachProductAPI = async (id: string | number) => {
  const res = await axios.get<{ result: eachProductI }>(`/product/${id}`);
  return res.data.result;
};

export const getProductDetailById = async <
  T = "flight" | "note" | "plan" | "tos"
>(
  id: number | string,
  type: T
) => {
  const res = await axios.get<{
    result: (T extends "flight"
      ? eachFlightI
      : T extends "note"
      ? eachNoteI
      : T extends "plan"
      ? eachPlanI
      : eachTosI)[];
  }>(`/product/${id}/${type}`);
  return res?.data?.result || undefined;
};

export const useProductDetail = (
  _id?: number | string | null,
  fetchOnce?: boolean
) => {
  const id = _id === undefined || _id === null ? undefined : _id;
  const main = useSWR(
    id !== undefined && ["/product", id],
    secondArgsFetcher(getEachProductAPI),
    fetchOnce
      ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }
      : {}
  );
  const flight = useSWR(
    id !== undefined && ["/product", id, "flight"],
    () => getProductDetailById<"flight">(id || -1, "flight"),
    fetchOnce
      ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }
      : {}
  );
  const note = useSWR(
    id !== undefined && ["/product", id, "note"],
    () => getProductDetailById<"note">(id || -1, "note"),
    fetchOnce
      ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }
      : {}
  );
  const plan = useSWR(
    id !== undefined && ["/product", id, "plan"],
    () => getProductDetailById<"plan">(id || -1, "plan"),
    fetchOnce
      ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }
      : {}
  );
  const tos = useSWR(
    id !== undefined && ["/product", id, "tos"],
    () => getProductDetailById<"tos">(id || -1, "tos"),
    fetchOnce
      ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }
      : {}
  );
  const data: eachProductI | null = useMemo(
    () =>
      main?.data
        ? {
            ...main.data,
            flight: flight?.data || [],
            note: note?.data || [],
            plan: plan?.data || [],
            tos: tos?.data || [],
          }
        : null,
    [main.data, flight.data, note.data, plan.data, tos.data]
  );
  const mutate = useCallback(
    () => [main, flight, note, plan, tos].map((t) => t.mutate()),
    [main.mutate, flight.mutate, note.mutate, plan.mutate, tos.mutate]
  );
  console.log({ data, tos: tos.data });
  return { data, mutate };
};

export const deleteProductAPI = async (id: string | number) => {
  const res = await axios.delete(`/product/${id}`);
  return res.data.result;
};

export const requestApproveAPI = async (
  id: string | number,
  message: string
) => {
  const res = await axios.post<{ result: true }>(`/product/request/${id}`, {
    requestMessage: message,
  });
  return res?.data?.result;
};

export const requestApproveCancelAPI = async (id: string | number) => {
  const res = await axios.delete<{ result: true }>(
    `/product/requestcancel/${id}`
  );
  return res?.data?.result;
};

export const setProductManagerAPI = async (
  id: string | number,
  groupId: string
) => {
  const res = await axios.post<{ result: true }>(`/product/manager/${id}`, {
    groupId,
  });
  return res?.data?.result;
};

export const changeStatusAPI = async (id: string | number, status: string) => {
  const res = await axios.post<{ result: true }>(`/product/${id}/status`, {
    status,
  });
  return res?.data?.result;
};

export const productDenyAPI = async (id: string | number, text?: string) => {
  const res = await axios.post<{ result: true }>(`/product/deny/${id}`, {
    reason: text || "",
  });
  return res?.data?.result;
};

export const productApproveAPI = async (id: string | number) => {
  const res = await axios.post<{ result: true }>(`/product/approve/${id}`);
  return res?.data?.result;
};

export const getProductHistoryAPI = async (id: string | number) => {
  const res = await axios.get<{ result: historyI[] }>(`/product/${id}/history`);
  return res?.data?.result;
};
