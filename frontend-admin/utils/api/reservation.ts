import axios, { query } from ".";
import { openGlobalTextPopup } from "../globalPopup";
import { queryFilter } from "../queryFilter";
import { eachEventI } from "./event";
import { eachProductI } from "./product";

export interface reservationEachPersonPassportI {
  birthday: string;
  country: string;
  issue: string;
  passportNumber: string;
  passportExpire: string;
}

export interface patchReservationEachPersonI {
  isMaster: boolean;
  name: string;
  sex: string;
  phone: string;
  email: string;
  rnnFirst: string;
  rnnSecond: string | null;
  status: string;
  priceType: string;
  paymentPrice: number;
  memo: string;
  passport: reservationEachPersonPassportI | null;
}

export type reservationEachPersonI = patchReservationEachPersonI & {
  insuranceStatus: string;
  isContractAgree: boolean;
};

export interface patchReservationI {
  bookerName: string;
  bookerBirthday: string;
  bookerSex: string;
  bookerPhone: string;
  bookerEmail: string;
  price: number;
  afterPrice: number;
  beforePrice: number;
  status: string;
  insuranceStatus: string;
  refundStatus: string;
  memo: string;
  people: patchReservationEachPersonI[];
}

export interface reservationInnerI {
  id: number;
  code: string;
  bookerName: string;
  bookerBirthday: string;
  bookerSex: string;
  bookerPhone: string;
  bookerEmail: string;
  price: number;
  afterPrice: number;
  beforePrice: number;
  referrer: string;
  status: string;
  refundStatus: null | string;
  insuranceStatus: string;
  memo: string;
  reservationPeoples: (reservationEachPersonI & { checked: boolean })[];
  createdAt: string;
}

export interface fullReservationI {
  id: number;
  event: eachEventI & { product: eachProductI };
  code: string;
  bookerName: string;
  bookerBirthday: string;
  bookerSex: string;
  bookerPhone: string;
  bookerEmail: string;
  price: number;
  afterPrice: number;
  beforePrice: number;
  referrer: string;
  status: string;
  refundStatus: null | string;
  insuranceStatus: string;
  memo: string;
  reservationPeoples: reservationEachPersonI[];
  createdAt: string;
  updatedAt: string;
}

export const getProductReservationAPI = async (
  id: number | string,
  query?: query
) => {
  const res = await axios.get<{
    result: { data: fullReservationI[]; pageTotal: number; total: number };
  }>(`/reservation/product/${id}`, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};

export const getEachReservationDataAPI = async (id: number | string) => {
  const res = await axios.get<{ result: fullReservationI }>(
    `/reservation/${id}`
  );
  return res?.data?.result;
};

export const sendReservationMessageAPI = async (
  email: string,
  type: string
) => {
  const res = await axios.post<{ result: true }>("/reservation/send/message", {
    email,
    type,
  });
  return res?.data?.result;
};

export const multiSendReservationMessage = async (
  data: { email: string; type: string }[]
) => {
  const res = await Promise.all(
    data.map((t) => sendReservationMessageAPI(t.email, t.type))
  );
  return res.reduce((prev, curr) => prev && curr, true);
};

export const editReservationAPI = async (
  id: string | number,
  data: patchReservationI
) => {
  const res = await axios.patch<{ result: true }>(`/reservation/${id}`, data);
  return res?.data?.result;
};

export const getReservationEditData = (data: fullReservationI) => {
  const {
    id,
    code,
    bookerName,
    bookerBirthday,
    bookerSex,
    bookerPhone,
    bookerEmail,
    price,
    afterPrice,
    beforePrice,
    referrer,
    status,
    refundStatus,
    insuranceStatus,
    memo,
    reservationPeoples,
    createdAt,
  } = data;
  return {
    id,
    code,
    bookerName,
    bookerBirthday,
    bookerSex,
    bookerPhone,
    bookerEmail,
    price,
    afterPrice,
    beforePrice,
    referrer,
    status,
    refundStatus: refundStatus || "not",
    insuranceStatus,
    memo,
    reservationPeoples: reservationPeoples.map((t) => ({
      ...t,
      checked: false,
      passport: t.passport
        ? {
            birthday: t.passport.birthday,
            country: t.passport.country,
            issue: t.passport.issue,
            passportExpire: t.passport.passportExpire,
            passportNumber: t.passport.passportNumber,
          }
        : {
            birthday: "",
            country: "대한민국",
            issue: "대한민국",
            passportExpire: "",
            passportNumber: "",
          },
    })),
    createdAt: createdAt.slice(0, 10),
  } as reservationInnerI;
};

export const editReservationDataValidate = (data: reservationInnerI) => {
  const {
    id,
    code,
    bookerName,
    bookerBirthday,
    bookerSex,
    bookerPhone,
    bookerEmail,
    price,
    afterPrice,
    beforePrice,
    referrer,
    status,
    refundStatus,
    insuranceStatus,
    memo,
    reservationPeoples,
    createdAt,
  } = data;
  if (
    parseInt(`${price}`) !==
    parseInt(`${afterPrice}`) + parseInt(`${beforePrice}`)
  ) {
    openGlobalTextPopup("선금과 잔금의 합은 총 금액과 같아야 합니다.");
    return null;
  }
  return {
    bookerName,
    bookerBirthday,
    bookerSex,
    bookerPhone,
    bookerEmail,
    price: parseInt(`${price}`),
    afterPrice: parseInt(`${afterPrice}`),
    beforePrice: parseInt(`${beforePrice}`),
    status,
    insuranceStatus,
    refundStatus,
    memo,
    people: reservationPeoples.map(
      ({
        isMaster,
        name,
        sex,
        phone,
        email,
        rnnFirst,
        rnnSecond,
        status,
        priceType,
        paymentPrice,
        memo,
        passport,
        insuranceStatus,
        isContractAgree,
      }) => ({
        isMaster,
        name,
        sex,
        phone,
        email,
        rnnFirst,
        rnnSecond,
        status,
        priceType,
        paymentPrice: parseInt(`${paymentPrice}`),
        memo,
        passport,
        insuranceStatus,
        isContractAgree,
      })
    ),
  } as patchReservationI;
};
