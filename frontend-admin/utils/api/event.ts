import useSWR from "swr";
import axios, { query, secondArgsFetcher } from ".";
import { queryFilter } from "../queryFilter";
import { useLoginCheck } from "../useLogin";
import {
  eachFlightI,
  eachPlanDetailI,
  eachPlanI,
  eachProductI,
  patchPlanDetailI,
  patchFlightI,
} from "./product";

export interface historyI {
  id: string;
  title: string;
  message: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface eventTypeI {
  id: string;
  type: string;
  description: string;
  fuelSurcharge: number;
  priceAdult: number;
  priceTeen: number;
  priceKid: number;
  priceText: null | number;
  createdAt: string;
  updatedAt: string;
  flights: eachFlightI;
  plans: eachPlanI;
}
export interface eachEventI {
  id: number;
  code: string;
  startDate: string;
  status: string;
  isRequestStop: boolean;
  editMessage: null | string;
  adminMessage: null;
  imaginary: number;
  createdAt: string;
  updatedAt: string;
  product: eachProductI;
  editFiles: [];
  histories: historyI[];
  memos: [];
  eventType: eventTypeI;
}

export const getEachIncentiveAPI = async (uid: number) => {
  const res = await axios.get<{ result: eachEventI }>(`/event/${uid}`);
  return res.data.result;
};

export const putEventTypeAPI = async (
  eventTypeId: number | string,
  uid: number | string
) => {
  const res = await axios.put<{ result: true }>(`/event/${uid}`, {
    eventTypeId,
  });
  return res.data;
};

export const getEventAPI = async (id: number | string, query?: query) => {
  const res = await axios.get<{
    result: { data: eachEventI[]; pageTotal: number; total: number };
  }>(`/event/all/${id}`, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};

export interface createEventFlightI {
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

export interface createEventPlansDetailsI {
  type: string;
  content: string;
  libraryId: string;
}

export interface createEventPlansI {
  day: number;
  description: string;
  details: createEventPlansDetailsI[];
}

export interface createEventI {
  productId: number;
  type: string;
  description: string;
  fuelSurcharge: number;
  priceAdult: number;
  priceTeen: number;
  priceKid: number;
  startDate: string[];
  flights: patchFlightI[];
  plans: patchPlanDetailI[];
}

export const postIncentiveAPI = async (
  productId: number,
  type: string,
  description: string,
  fuelSurcharge: number,
  priceAdult: number,
  priceTeen: number,
  priceKid: number,
  startDate: string[],
  flights: createEventFlightI[],
  plans: eachPlanDetailI[]
) => {
  const res = await axios.post<
    | {
        result: eachEventI;
      }
    | {
        error: string;
        message: string;
      }
  >(`/event`, {
    productId,
    type,
    description,
    fuelSurcharge,
    priceAdult,
    priceTeen,
    priceKid,
    startDate,
    flights,
    plans,
  });
  return res.data;
};

export interface createEventMemoI {
  eventId: number;
  title: string;
  memo: string;
}

export const postIncentiveAnswerAPI = async (
  eventId: number,
  title: string,
  memo: string
) => {
  const res = await axios.post<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/event/memo`, {
    eventId,
    title,
    memo,
  });
  return res.data;
};

export const deleteEventMemoAPI = async (uid: string) => {
  const res = await axios.delete<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/event/memo/${uid}`);
  return res.data;
};

export const postEventStopAPI = async (uid: number) => {
  const res = await axios.post<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/event/request/end/${uid}`);
  return res.data;
};

export const postEventEndAPI = async (uid: number | string) => {
  const res = await axios.post<{
    result: true;
  }>(`/event/request/end/${uid}`);
  return res?.data?.result;
};

export const postEventEditAPI = async (
  uid: number | string,
  editMessage: string
) => {
  const res = await axios.post<{
    result: true;
  }>(`/event/request/update/${uid}`, { editMessage });
  return res?.data?.result;
};

export const postEventEditDenyAPI = async (
  uid: number | string,
  adminMessage: string
) => {
  const res = await axios.post<{ result: true }>(`/event/deny/update/${uid}`, {
    adminMessage,
  });
  return res?.data?.result;
};

export interface resultImageI {
  imageUrl: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const postEventEditDoneAPI = async (
  id: number | string,
  msg: string
) => {
  const res = await axios.post<{ result: true }>(`/event/done/update/${id}`, {
    adminMessage: msg,
  });
  return res?.data?.result;
};

export const postEventEditImageAPI = async (imageUrl: any, id: string) => {
  const res = await axios.post<
    { result: resultImageI } | { error: string; message: string }
  >(`/event/upload/update/${id}`, {
    imageUrl,
  });
  return res.data;
};

export const getEventTypeListAPI = async (id: string | number) => {
  const res = await axios.get<{ result: eventTypeI[] }>(
    `/product/${id}/eventtype`
  );
  return res.data;
};

export const useEventTypeListAPI = (id: string | number) => {
  const loginCheck = useLoginCheck();
  return useSWR(
    loginCheck(["/event/type", id]),
    secondArgsFetcher(getEventTypeListAPI)
  );
};

export const postChangeEventStatusAPI = async (
  id: string | number,
  status: string,
  message: string
) => {
  const res = await axios.post<{ result: true }>(`/event/${id}/status`, {
    status,
    message,
  });
  return res?.data?.result;
};

export const postEventForceEndAPI = async (
  id: string | number,
  msg: string
) => {
  const res = await axios.post<{ result: true }>(`/event/end/${id}`, {
    adminMessage: msg,
  });
  return res?.data?.result;
};

export const createEventTypeAPI = async (data: createEventI) => {
  const res = await axios.post<{ result: true }>("/event", data);
  return res?.data?.result;
};

const abcList = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
export const eventNameList = [
  ...abcList,
  ...Array(5)
    .fill(0)
    .map((_, i) => abcList.map((t) => `${t}${i + 2}`))
    .flat(),
];
