import axios, { query } from ".";
import { queryFilter } from "../queryFilter";
import { adminI } from "./library";
import { eachProductI } from "./product";

export const getInquiryMeAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachInquiryI[]; pageTotal: number; total: number };
  }>(`/inquiry/me`, {
    params: {
      ...queryFilter(query),
      limit: 8,
    },
  });
  return res.data;
};

export const getInquiryAPI = async (query?: query) => {
  const res = await axios.get<{
    result: { data: eachInquiryI[]; pageTotal: number; total: number };
  }>(`/inquiry`, {
    params: {
      ...queryFilter(query),
      limit: 8,
    },
  });
  return res.data;
};

export const getEachInquiryAPI = async (id: number) => {
  const res = await axios.get<{
    result: eachInquiryI;
  }>(`/inquiry/${id}`);
  return res.data;
};

export interface eachInquiryI {
  title: string;
  content: string;
  category: string;
  author: {
    uid: string;
    email: string;
    name: string;
    nickname: string;
    introduce: string;
    profileUrl: string;
    isBusiness: boolean;
    zipcode: null;
    address: null;
    addressDetail: null;
    businessType: null;
    businessName: null;
    isApprove: boolean;
    denyReason: null;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    next: eachInquiryI[] | [];
    accountSns?: [
      {
        id: number;
        name: string;
        handle: string;
        createdAt: string;
        updatedAt: string;
      }
    ];
    group?: null;
    cubeezPhone?: [
      {
        id: number;
        phone: string;
      }
    ];
    manageGroup?: null;
  };
  manager: null | adminI;
  answer: null;
  endAt: null;
  id: number;
  isParent: boolean;
  createdAt: string;
  updatedAt: string;
  product: eachProductI | null;
  next: eachInquiryI[] | [];
}

export const postInquiryAPI = async (
  title: string,
  content: string,
  category: string
) => {
  const res = await axios.post<
    | {
        result: eachInquiryI;
      }
    | {
        error: string;
        message: string;
      }
  >(`/inquiry`, {
    title,
    content,
    category,
  });
  return res.data;
};

export const postInquiryWithProductAPI = async (
  title: string,
  content: string,
  category: string,
  productId: number
) => {
  const res = await axios.post<
    | {
        result: eachInquiryI;
      }
    | {
        error: string;
        message: string;
      }
  >(`/inquiry`, {
    title,
    content,
    category,
    productId,
  });
  return res.data;
};

export const postInquiryAnswerAPI = async (id: number, answer: string) => {
  const res = await axios.post<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/inquiry/answer/${id}`, {
    answer,
  });
  return res.data;
};

export const postNestedInquiryAPI = async (
  parent: number,
  content: string,
  title?: string,
  category?: string,
  productId?: number
) => {
  const res = await axios.post<
    | {
        result: eachInquiryI;
      }
    | {
        error: string;
        message: string;
      }
  >(`/inquiry/nested`, {
    title,
    content,
    category,
    productId,
    parent,
  });
  return res.data;
};

export const postManagerInquiryAPI = async (id: number, manager: string) => {
  const res = await axios.post<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/inquiry/manager/${id}`, {
    manager,
  });
  return res.data;
};

export const postEndInquiryAPI = async (id: number) => {
  const res = await axios.post<
    | {
        result: boolean;
      }
    | {
        error: string;
        message: string;
      }
  >(`/inquiry/end/${id}`);
  return res.data;
};
