import axios, { query } from ".";
import { queryFilter } from "../queryFilter";
import { userInfoI } from "./admin/user";
import { adminI } from "./library";
import { eachProductI } from "./product";
import { productRegionI } from "./region";

export interface eachIncentiveI {
  id: number;
  title: string;
  people: number;
  isFlight: boolean;
  date: string;
  goal: string;
  description: string;
  answer: null;
  phone: string;
  isEndTrip: boolean;
  user: userInfoI;
  region: productRegionI;
  manager: adminI;
  product: eachProductI | null;
  createdAt: string;
  updatedAt: string;
}

export const getEachIncentiveAPI = async (uid: number) => {
  const res = await axios.get<{ result: eachIncentiveI }>(`/incentive/${uid}`);
  return res.data.result;
};

export const getIncentiveAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachIncentiveI[]; pageTotal: number; total: number };
  }>(`/incentive`, {
    params: {
      ...queryFilter(query),
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

export const postIncentiveAPI = async (
  title: string,
  people: number,
  regionId: string,
  isFlight: boolean,
  date: string,
  goal: string,
  description: string,
  phone: string
) => {
  const res = await axios.post<
    | {
        result: eachIncentiveI;
      }
    | {
        error: string;
        message: string;
      }
  >(`/incentive`, {
    title,
    people,
    regionId,
    isFlight,
    date,
    goal,
    description,
    phone,
  });
  return res.data;
};

export const postIncentiveAnswerAPI = async (answer: string, uid: number) => {
  const res = await axios.put<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/incentive/answer/${uid}`, {
    answer,
  });
  return res.data;
};
export const postIncentiveManagerAPI = async (
  managerId: string,
  uid: number
) => {
  const res = await axios.put<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/incentive/manager/${uid}`, {
    managerId,
  });
  return res.data;
};
export const postIncentiveProductAPI = async (
  productId: number,
  uid: number
) => {
  const res = await axios.put<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/incentive/manager/${uid}`, {
    productId,
  });
  return res.data;
};
