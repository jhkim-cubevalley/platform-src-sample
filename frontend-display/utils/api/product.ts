import { useCallback, useMemo } from "react";
import useSWR from "swr";
import axios, { query, secondArgsFetcher } from ".";
import { queryFilter } from "../queryFilter";
import { eachCubeezInfoI } from "./admin/cubeez";
import { eachLibraryI, adminI, groupI } from "./library";
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
  id: string;
  createdAt: string;
  updatedAt: string;
  tos: {
    id: string;
    isEnable: boolean;
    type: string;
    name: string;
  };
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
  details: [type: string, content: string, libraryId: string];
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
  isLayout: boolean;
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
  image: { imageUrl: string }[];
  approves: [];
  badges: [];
  tos: eachTosI[];
  events: eachEventI[];
  contract: null;
}

export interface patchProductI {
  name?: string;
  nameEn?: string;
  fuelSurchage?: number;
  priceAdult?: number;
  priceTeen?: number;
  priceKid?: number;
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
  categories?: [
    {
      categoryOne: string;
      categoryTwo: string;
      categoryThree: string;
    }
  ];
  regions?: [
    {
      regionOne: string;
      regionTwo: string;
      regionThree: string;
    }
  ];
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

export const getProductById = async (id: number) => {
  const res = await axios.get(`/product/${id}`);
  return res.data;
};

export const getProductDetailById = async (
  id: number | string,
  type: "flight" | "note" | "plan" | "tos"
) => {
  const res = await axios.get(`/product/${id}/${type}`);
  return res?.data?.result || undefined;
};

export const useProductDetail = (id: number | string) => {
  return {
    flight: useSWR(["/product", id, "flight"], () =>
      getProductDetailById(id, "flight")
    ),
    note: useSWR(["/product", id, "note"], () =>
      getProductDetailById(id, "note")
    ),
    plan: useSWR(["/product", id, "plan"], () =>
      getProductDetailById(id, "plan")
    ),
    tos: useSWR(["/product", id, "tos"], () => getProductDetailById(id, "tos")),
  };
};

export const getProductDetailById2 = async <
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

export const useProductDetail2 = (
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
    () => getProductDetailById2<"flight">(id || -1, "flight"),
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
    () => getProductDetailById2<"note">(id || -1, "note"),
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
    () => getProductDetailById2<"plan">(id || -1, "plan"),
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
    () => getProductDetailById2<"tos">(id || -1, "tos"),
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

export const patchProductAPI = async (id: number, req: patchProductI) => {
  const res = await axios.patch<
    { result: boolean } | { error: string; message: string }
  >(`/product/${id}`, req);
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

export const deleteProductAPI = async (id: string | number) => {
  const res = await axios.delete(`/product/${id}`);
  return res.data.result;
};
