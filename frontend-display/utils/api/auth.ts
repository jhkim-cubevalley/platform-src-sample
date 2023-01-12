import axios, { errorI } from ".";
import { AxiosError } from "axios";
import { innerTeamInfoI } from "./admin/admin";
import { groupI } from "./library";

export const loginAPI = async (email: string, password: string) => {
  const res = await axios.post<
    { result: { accessToken: string } } | { error: string; message: string }
  >(
    `/auth/login/user`,
    {
      email,
      password,
    },
    { validateStatus: (d) => d < 500 }
  );
  return res.data;
};

export interface registerInfoDefaultI {
  email: string;
  name: string;
  password: string;
  nickname: string;
  phone: string;
  sex: string;
  sns: {
    name: string;
    handle: string;
  }[];
  referralCode?: string;
  emailCode: string;
  phoneCode: string;
}

export const registerAPI = async (info: registerInfoDefaultI) => {
  const { data } = await axios.post<{ result: true } | errorI>(
    "/auth/register/user",
    info,
    {
      validateStatus: function (status) {
        return status < 500;
      },
    }
  );
  if ("error" in data) {
    alert(`${data.message} (${data.error})`);
    return null;
  }
  return data;
};

export interface socialRegisterInfoI {
  nickname: string;
  sns: {
    name: string;
    handle: string;
  }[];
  referralCode?: string;
}

export const socialRegisterAPI = async (
  info: socialRegisterInfoI,
  tempId: string
) => {
  const { data } = await axios.post<{ result: true } | errorI>(
    `/auth/social/callback?id=${tempId}`,
    info,
    {
      validateStatus: function (status) {
        return status < 500;
      },
    }
  );
  if ("error" in data) {
    alert(`${data.message} (${data.error})`);
    return null;
  }
  return data;
};

export const verifyAPI = async (type: "email" | "phone", target: string) => {
  const res = await axios.post<{ result: true }>(`/auth/verify/${type}`, {
    [type]: target,
  });
};

export interface accountSnsI {
  id: number;
  name: string;
  handle: string;
  createdAt: string;
  updatedAt: string;
}

export interface authAPIInfoI {
  uid: string;
  email: string;
  name: string;
  nickname: string;
  sex: string;
  phone: string;
  socialType: string | null;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  accountSns: accountSnsI[];
  group: groupI | null;
  department?: innerTeamInfoI;
  team?: innerTeamInfoI;
  jobPosition?: innerTeamInfoI;
}

export const authAPI = async () => {
  const res = await axios.get<{ result: authAPIInfoI }>("/auth/me");
  return res.data;
};
