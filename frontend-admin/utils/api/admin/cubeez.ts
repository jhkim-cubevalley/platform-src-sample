import axios from "..";
import { query } from "..";
import { queryFilter } from "../../queryFilter";
import { eachGroupInfoI } from "./group";

export interface eachCubeezInfoI {
  uid: string;
  email: string;
  name: string;
  nickname: string;
  introduce: string;
  password: string;
  profileUrl: string;
  isBusiness: boolean;
  zipcode: string;
  address: string;
  addressDetail: string;
  businessType: string;
  businessName: string;
  isApprove: boolean;
  denyReason: string | null;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  accountSns: {
    name: string;
    handle: string;
  }[];
  group: eachGroupInfoI | null;
  manageGroup: eachGroupInfoI | null;
  cubeezPhone: {
    phone: string;
  }[];
}

export const getCubeezAPI = async (query?: query) => {
  const res = await axios.get<{
    result: {
      data: eachCubeezInfoI[];
      pageTotal: number;
      total: number;
    };
  }>("/admin/account/cubeez", { params: queryFilter(query) });
  return res.data;
};

export const getEachCubeezAPI = async (uid: string) => {
  const res = await axios.get<{ result: eachCubeezInfoI }>(
    `/admin/account/cubeez/${uid}`
  );
  return res.data.result;
};

export interface changeEachCubeezI {
  nickname?: string;
  businessType?: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  groupId: string;
  manageGroupId: string;
  phones: string[];
  sns: {
    name: string;
    handle: string;
  }[];
  introduce: string;
}

export const changeEachCubeezAPI = async (
  uid: string,
  data: changeEachCubeezI
) => {
  const res = await axios.put(`/admin/account/cubeez/${uid}`, data);
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};

export type documentType =
  | "bankBook"
  | "idCard"
  | "license"
  | "businessRegistration"
  | "insurance";

export const documentName: { [type in documentType]: string } = {
  bankBook: "통장 사본",
  idCard: "신분증 사본",
  license: "자격증",
  businessRegistration: "관광 사업자등록증",
  insurance: "보증보험 사본",
};

export const getCubeezDocumentAPI = async (uid: string, type: documentType) => {
  const res = await axios.get(`/auth/document/${uid}?type=${type}`);
  if ("result" in res.data) return `data:image/png;base64, ${res.data.result}`;
  return "/images/tmp/temp.png";
};

const personalDocumentList: documentType[] = ["bankBook", "idCard", "license"];

const businessDocumentList: documentType[] = [
  "bankBook",
  "businessRegistration",
  "insurance",
];

export const getCubeezDocumentList = (isBusiness: boolean) => {
  if (isBusiness) return businessDocumentList;
  return personalDocumentList;
};

export const getCubeezAllDocumentAPI = async ({
  uid,
  isBusiness,
}: {
  uid: string;
  isBusiness: boolean;
}) => {
  const list = getCubeezDocumentList(isBusiness);

  let imageList: any = [];
  list.map(async (type) => {
    const res = await getCubeezDocumentAPI(uid, type);
    imageList[type] = res;
    // imageList.push(res);
    // if (res !== "/images/tmp/temp.png") {
    // } else {
    //   imageList.push("/images/tmp/temp.png");
    // }
  });
  // console.log(imageList);
  // const imageList = await Promise.all(

  // );
  return imageList;
};

export type extendedDocumentType = documentType | "profile";

export const uploadCubeezDocumentAPI = async ({
  uid,
  isAdmin,
  file,
  type,
}: {
  uid: string;
  isAdmin: boolean;
  file: File;
  type: extendedDocumentType;
}) => {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("image", file);
  const url = isAdmin ? `/auth/document/auth/${uid}` : `/auth/document/${uid}`;
  const res = await axios.post(url, formData);
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};

export const uploadMultipleCubeezDocumentAPI = async ({
  uid,
  isAdmin,
  list,
}: {
  uid: string;
  isAdmin: boolean;
  list: { type: extendedDocumentType; file: File }[];
}) => {
  const result = await Promise.all(
    list.map(({ type, file }) =>
      uploadCubeezDocumentAPI({ uid, isAdmin, type, file })
    )
  );
  return result.reduce((prev, curr) => prev && curr, true);
};

export const denyCubeezAPI = async (info: {
  email: string;
  reason: string;
}) => {
  const res = await axios.post("/admin/deny", info);
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};

export const approveCubeezAPI = async (info: { email: string }) => {
  const res = await axios.post("/admin/approve", info, {
    validateStatus: () => true,
  });
  if ("error" in res.data) {
    alert(`${res.data.message} (${res.data.error})`);
    return false;
  }
  return true;
};

export const deleteCubeezAPI = async (id: string | number) => {
  const res = await axios.delete<{ result: true }>(
    `/admin/account/withdraw/cubeez/${id}`
  );
  return res?.data?.result;
};
