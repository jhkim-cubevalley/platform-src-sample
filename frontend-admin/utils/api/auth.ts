import axios from ".";
import { loginType } from "../useLogin";
import { innerTeamInfoI } from "./admin/admin";
import { groupI } from "./library";

export const loginAPI = async (
  email: string,
  password: string,
  type: loginType
) => {
  const res = await axios.post<
    { result: { accessToken: string } } | { error: string; message: string }
  >(`/auth/login/${type}`, {
    email,
    password,
  });
  return res.data;
};

export interface registerInfoDefaultI {
  email: string;
  name: string;
  password: string;
  phones: string[];
  sns: {
    name: string;
    handle: string;
  }[];
  introduce: string;
  emailCode: string;
  phoneCodes: string[];
}

export interface registerInfoPersonalI extends registerInfoDefaultI {
  nickname: string;
  isBusiness: false;
}
export interface registerInfoBusinessI extends registerInfoDefaultI {
  isBusiness: true;
  zipcode: string;
  address: string;
  addressDetail: string;
  businessType: string;
  businessName: string;
}

export type registerInfoType = registerInfoPersonalI | registerInfoBusinessI;

export const registerAPI = async (info: registerInfoType) => {
  const res = await axios.post("/auth/register/cubeez", info);
  return res.data;
};

export const verifyAPI = async (type: "email" | "phone", target: string) => {
  const res = await axios.post<{ result: true }>(`/auth/verify/${type}`, {
    [type]: target,
  });
};

export interface authAPIInfoI {
  uid: string;
  email: string;
  name: string;
  phone: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  group: groupI;
  department: innerTeamInfoI;
  team: innerTeamInfoI;
  jobPosition: innerTeamInfoI;
}

export const authAPI = async () => {
  const res = await axios.get<{ result: authAPIInfoI }>("/auth/me");
  return res.data;
};
