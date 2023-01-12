import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import CustomTextarea from "../../../components/CustomTextarea";
import FullCard from "../../../components/FullCard";
import GapMaker from "../../../components/GapMaker";
import LabelInput, {
  LabelInputPropsType,
  LabelSelect,
  NewLabelInput,
} from "../../../components/LabelInput";
import LeftRight from "../../../components/LeftRight";
import LoginContainer from "../../../components/LoginContainer";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTitle from "../../../components/MainTitle";
import { LeftRightEach } from "../../../components/RegisterInfo";
import { secondArgsFetcher } from "../../../utils/api";
import {
  approveCubeezAPI,
  changeEachCubeezAPI,
  changeEachCubeezI,
  denyCubeezAPI,
  documentName,
  extendedDocumentType,
  getCubeezAllDocumentAPI,
  getCubeezDocumentList,
  getEachCubeezAPI,
  uploadCubeezDocumentAPI,
} from "../../../utils/api/admin/cubeez";
import { useGroup } from "../../../utils/api/useGroup";
import { snsList } from "../../../utils/data";
import useIconPopup, { svgList } from "../../../utils/useIconPopup";
import { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";

const dummyData = {
  name: "홍길동",
  email: "test123@gmail.com",
  nickname: "닉네임닉네임",
  sex: "M",
  phones: [{ value: "01012341234" }],
  groupId: "C1",
  point: 1000,
  sns: [{ handle: "gildong123", name: "instagram" }],
  social: [{ value: "네이버" }, { value: "카카오" }],
};

const Disapprove = ({
  openPopup,
  email,
  openIconPopup,
  callback,
}: {
  openPopup: any;
  openIconPopup: any;
  email: string;
  callback: () => void;
}) => {
  const doDisapprove = async (e: FormEvent) => {
    e.preventDefault();
    const text = (e.target as any)[0].value as string;
    const result = await denyCubeezAPI({ email, reason: text });
    if (result) {
      openPopup(null);
      openIconPopup({
        type: "black",
        title: "큐비즈 가입신청이 반려되었습니다.",
      });
      callback();
    }
  };
  const buttonList = [
    { type: "close" },
    {
      type: "orange",
      text: "반려하기",
      callback: () =>
        openPopup({
          type: "black",
          title: "큐비즈 가입신청이 반려되었습니다.",
        }),
    },
  ];
  return (
    <form
      className="w-full flex flex-col items-center justify-between gap-7"
      onSubmit={doDisapprove}
    >
      {svgList["orange"]}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="text-[#383838] text-[24px] font-bold whitespace-pre-wrap text-center">
          해당 회원의 큐비즈 가입신청을{"\n"}반려하시겠습니까?
        </div>
      </div>
      <CustomTextarea />
      <div className="w-full h-12 flex gap-4 mt-4">
        {buttonList ? (
          buttonList.map((btn, idx) => {
            const { type: btnType } = btn;
            if (btnType === "close") {
              const { text = null } = btn;
              return (
                <MainButton
                  forGrid
                  styleType="gray"
                  key={idx}
                  onClick={() => openPopup(null)}
                  type="button"
                >
                  {text ?? "아니오"}
                </MainButton>
              );
            }
            const { text, callback } = btn;
            return (
              <MainButton
                forGrid
                key={idx}
                styleType={btnType as "orange"}
                type="submit"
              >
                {text}
              </MainButton>
            );
          })
        ) : (
          <MainButton
            forGrid
            styleType="orange"
            onClick={() => openPopup(null)}
          >
            확인
          </MainButton>
        )}
      </div>
    </form>
  );
};

export const AdminUserInfo = () => {
  const router = useRouter();
  const useFormReturn = useForm<any>({
    defaultValues: dummyData,
  });
  const loginCheck = useLoginCheck();
  const { register, handleSubmit, reset, getValues, setValue } = useFormReturn;
  const { openPopup, component } = useIconPopup();
  const { openPopup: openCustomPopup, component: customComponent } = usePopup();
  const { id } = router.query as { id: string };
  const { data, mutate } = useSWR(
    loginCheck(["/admin/account/cubeez/uid", id]),
    secondArgsFetcher(getEachCubeezAPI)
  );
  const { data: documentData, mutate: documentMutate } = useSWR(
    loginCheck([
      "/auth/document/uid",
      { uid: id, isBusiness: data?.isBusiness || false },
    ]),
    secondArgsFetcher(getCubeezAllDocumentAPI)
  );
  console.log(documentData);
  const { data: groupData } = useGroup("CUBEEZ");
  const { data: manageGroupData } = useGroup("ADMIN");
  const documentList = getCubeezDocumentList(data?.isBusiness || false);
  useEffect(() => {
    if (!data) return;
    reset({
      ...data,
      point: 1000,
      groupId: data.group?.id || groupData[0]?.id,
      manageGroupId: data.manageGroup?.id || manageGroupData[0]?.id,
      phones: data.cubeezPhone.map((d) => ({ value: d.phone })),
      sns: data
        ? data.accountSns.map(({ name, handle }) => ({ name, handle }))
        : [],
    });
  }, [data, reset]);
  useEffect(() => {
    if (groupData.length === 0 || manageGroupData.length === 0) return;
    const [groupId, manageGroupId] = getValues(["groupId", "manageGroupId"]);
    if (!groupId) setValue("groupId", groupData[0].id);
    if (!manageGroupId) setValue("manageGroupId", manageGroupData[0].id);
  }, [groupData, manageGroupData]);
  const fileSelectHandler = async (
    type: extendedDocumentType,
    fileList: FileList | null
  ) => {
    if (!fileList) return;
    const eachFile = fileList[0];
    const result = await uploadCubeezDocumentAPI({
      uid: id,
      isAdmin: true,
      file: eachFile,
      type,
    });
    if (result) documentMutate();
  };
  const businessSave = async (d: any) => {
    if (!data) return;
    const { zipcode, addressDetail } = data;
    const {
      address,
      groupId,
      manageGroupId,
      phones,
      sns,
      introduce,
      businessType,
    } = d;
    const info: changeEachCubeezI = {
      zipcode,
      addressDetail,
      address,
      groupId,
      manageGroupId,
      phones: (phones as any[]).map((d) => d.value),
      sns,
      introduce,
      businessType,
    };
    return await changeEachCubeezAPI(id, info);
  };
  const personalSave = async (d: any) => {
    if (!data) return;
    const { zipcode, addressDetail } = data;
    const {
      address,
      groupId,
      manageGroupId,
      phones,
      sns,
      introduce,
      nickname,
    } = d;
    const info: changeEachCubeezI = {
      zipcode,
      addressDetail,
      address,
      groupId,
      manageGroupId,
      phones: (phones as any[]).map((d) => d.value),
      sns,
      introduce,
      nickname,
    };
    return await changeEachCubeezAPI(id, info);
  };
  const doSave = async (d: any) => {
    console.log(d);
    const result = data?.isBusiness
      ? await businessSave(d)
      : await personalSave(d);
    if (result) openPopup({ type: "black", title: "수정이 완료되었습니다." });
    else openPopup({ type: "orange", title: "오류가 발생했습니다." });
  };
  const saveHandler = handleSubmit((d) =>
    openPopup({
      type: "orange",
      title: "수정하시겠습니까?",
      buttonList: [
        { type: "close" },
        { type: "orange", text: "수정하기", callback: () => doSave(d) },
      ],
    })
  );
  const doApprove = async () => {
    const result = await approveCubeezAPI({ email: data?.email || "" });
    if (result || true) {
      mutate();
      openPopup({
        type: "black",
        title: "큐비즈 가입신청이 승인되었습니다.",
      });
    }
  };

  const cubeezBusinessInputList: LabelInputPropsType[] = [
    {
      inputName: "email",
      labelName: "이메일",
      disabled: true,
    },
    {
      inputName: "name",
      labelName: "담당자명",
      disabled: true,
    },
    {
      inputName: "businessName",
      labelName: "회사명",
      disabled: true,
    },
    {
      inputName: "groupId",
      inputType: "select",
      labelName: "그룹",
      isRequired: true,
      registerOptions: { required: true },
      optionList: [
        ...groupData.map((d) => ({
          name: d.name,
          value: d.id,
        })),
      ],
    },
    {
      inputName: "manageGroupId",
      inputType: "select",
      labelName: "관리그룹",
      isRequired: true,
      registerOptions: { required: true },
      optionList: [
        ...manageGroupData.map((d) => ({
          name: d.name,
          value: d.id,
        })),
      ],
    },
    {
      inputName: "businessType",
      labelName: "사업자 종류",
      inputType: "select",
      optionList: [
        { name: "개인사업자", value: "INDIVIDUAL" },
        { name: "법인사업자", value: "CORPORATION" },
      ],
    },
    {
      inputName: "address",
      labelName: "주소",
    },
    {
      inputName: "phones",
      labelName: "연락처",
      isRequired: true,
      inputType: "multi",
      subProps: { type: "tel" },
    },
    {
      inputName: "sns",
      labelName: "SNS",
      inputType: "multi",
      innerType: "selectinput",
      subProps: {
        leftName: "name",
        rightName: "handle",
        leftOptions: snsList,
      },
      defaultAdded: {
        name: "Instagram",
        handle: "",
      },
    },
    {
      inputName: "introduce",
      labelName: "소개글",
      inputType: "textarea",
      rows: 3,
    },
  ];
  const cubeezPersonalInputList: LabelInputPropsType[] = [
    {
      inputName: "email",
      labelName: "이메일",
      disabled: true,
    },
    {
      inputName: "name",
      labelName: "이름",
      disabled: true,
    },
    {
      inputName: "nickname",
      labelName: "닉네임",
    },
    {
      inputName: "groupId",
      inputType: "select",
      labelName: "그룹",
      isRequired: true,
      registerOptions: { required: true },
      optionList: [
        ...groupData.map((d) => ({
          name: d.name,
          value: d.id,
        })),
      ],
    },
    {
      inputName: "manageGroupId",
      inputType: "select",
      labelName: "관리그룹",
      isRequired: true,
      registerOptions: { required: true },
      optionList: [
        ...manageGroupData.map((d) => ({
          name: d.name,
          value: d.id,
        })),
      ],
    },
    {
      inputName: "address",
      labelName: "주소",
    },
    {
      inputName: "phones",
      labelName: "연락처",
      isRequired: true,
      inputType: "multi",
      subProps: { type: "tel" },
    },
    {
      inputName: "sns",
      labelName: "SNS",
      inputType: "multi",
      innerType: "selectinput",
      subProps: {
        leftName: "name",
        rightName: "handle",
        leftOptions: snsList,
      },
      defaultAdded: {
        name: "Instagram",
        handle: "",
      },
    },
    {
      inputName: "introduce",
      labelName: "소개글",
      inputType: "textarea",
      rows: 3,
    },
  ];
  const inputTarget = data?.isBusiness
    ? cubeezBusinessInputList
    : cubeezPersonalInputList;

  return (
    <MainContainer type="admin">
      {component}
      {customComponent}
      <LeftRight>
        <MainTitle>
          큐비즈관리 - {data?.isApprove ? "수정하기" : "승인요청"}
        </MainTitle>
        <ButtonLine>
          <MainButton
            styleType="gray"
            type="button"
            small
            onClick={saveHandler}
          >
            저장하기
          </MainButton>
          <MainButton
            styleType="gray"
            type="button"
            small
            onClick={() =>
              openCustomPopup(
                <Disapprove
                  openPopup={openCustomPopup}
                  openIconPopup={openPopup}
                  email={data?.email || ""}
                  callback={() => mutate()}
                />
              )
            }
          >
            {data?.isApprove ? "승인취소" : "반려하기"}
          </MainButton>
          {data?.isApprove ? (
            ""
          ) : (
            <MainButton
              styleType="orange"
              type="button"
              small
              onClick={() =>
                openPopup({
                  type: "orange",
                  title: "해당 회원의 큐비즈 가입신청을\n승인하시겠습니까?",
                  buttonList: [
                    { type: "close" },
                    {
                      type: "orange",
                      text: "승인하기",
                      callback: doApprove,
                    },
                  ],
                })
              }
            >
              승인하기
            </MainButton>
          )}
        </ButtonLine>
      </LeftRight>
      <GapMaker height={24} />
      <form className="w-full flex gap-6" onSubmit={saveHandler}>
        <FullCard>
          <MainTitle little>계정 프로필</MainTitle>
          <div className="flex w-full flex-col gap-3 mt-3">
            {inputTarget.map((d) => (
              <NewLabelInput {...d} useForm={useFormReturn} key={d.inputName} />
            ))}
          </div>
        </FullCard>
        <FullCard>
          <div className="flex w-full flex-col gap-6">
            <div className="text-[#ff0d00] text-lg w-full text-center">
              서류 이미지의 경우 저장하지 않아도 즉시 반영됩니다.
            </div>
            {documentList.map((name, i) => (
              <div key={name} className=" w-full flex flex-col gap-2">
                <LeftRight>
                  <MainTitle little>{documentName[name]}</MainTitle>
                  <label>
                    <div className=" bg-[#FF5C00] text-white w-32 flex justify-center items-center py-2 rounded-lg hover:cursor-pointer text-xl font-semibold">
                      변경하기
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => fileSelectHandler(name, e.target.files)}
                    />
                  </label>
                </LeftRight>
                <div className="w-full relative aspect-video">
                  <Image
                    src={
                      documentData && documentData[name]
                        ? documentData[name]
                        : "/images/tmp/temp.png"
                    }
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  ></Image>
                </div>
              </div>
            ))}
          </div>
        </FullCard>
      </form>
    </MainContainer>
  );
};

export default AdminUserInfo;
