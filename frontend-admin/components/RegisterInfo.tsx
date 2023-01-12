import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { registerAPI, verifyAPI } from "../utils/api/auth";
import { cls } from "../utils/cls";
import { snsList } from "../utils/data";
import CustomInput from "./CustomInput";
import { CustomVerify } from "./CustomVerify";
import { EmptyInput, LabelInputPropsType, NewLabelInput } from "./LabelInput";
import LoginButton from "./LoginButton";
import LoginContainer from "./LoginContainer";
import LoginInput from "./LoginInput";
import MainButton from "./MainButton";
import MultiInput from "./MultiInput";
import { cubeezType, RegisterStep } from "./Register";

interface RegisterInfoProps {
  setStep: (newStep: RegisterStep) => void;
  type: cubeezType;
}

const statusList = [
  { status: "info", name: "개인정보" },
  { status: "paper", name: "자격 및 갱신정보" },
];

const penSvg = (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.6976 8.34576L12.0244 5.63184L2.62349 15.1761L5.29665 17.8901L14.6976 8.34576Z"
      fill="white"
      stroke="white"
      strokeWidth="1.34976"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.574 1.94887C19.3076 2.69364 19.3076 3.91237 18.574 4.65715L17.2402 6.01129L14.5726 3.30301L15.9064 1.94887C16.64 1.20409 17.8404 1.20409 18.574 1.94887Z"
      fill="white"
      stroke="white"
      strokeWidth="1.34976"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.738281 19.8106L2.63242 15.1746L5.30465 17.8875L0.738281 19.8106Z"
      fill="white"
      stroke="white"
      strokeWidth="1.34976"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const noBgPenSvg = (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9583 7.75103L12.2852 5.03711L2.88423 14.5814L5.55739 17.2953L14.9583 7.75103Z"
      fill="black"
      stroke="black"
      strokeWidth="1.34976"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.8358 1.35414C19.5693 2.09892 19.5693 3.31764 18.8358 4.06242L17.502 5.41656L14.8344 2.70828L16.1682 1.35414C16.9017 0.609363 18.1022 0.609363 18.8358 1.35414Z"
      fill="black"
      stroke="black"
      strokeWidth="1.34976"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 19.2158L2.89414 14.5798L5.56636 17.2928L1 19.2158Z"
      fill="black"
      stroke="black"
      strokeWidth="1.34976"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoSvg = (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.58816 11.7282V11.807H9.92641V11.7282C9.94609 10.659 10.2544 10.1866 11.0416 9.70775C11.8747 9.19607 12.3799 8.49414 12.3799 7.43797C12.3799 5.94228 11.2384 4.91891 9.53281 4.91891C7.97151 4.91891 6.71198 5.83076 6.6595 7.50357H8.07647C8.13551 6.53269 8.82432 6.09972 9.53281 6.09972C10.32 6.09972 10.9498 6.61797 10.9498 7.43797C10.9498 8.12678 10.5299 8.61222 9.97889 8.94679C9.11296 9.48471 8.60784 10.0095 8.58816 11.7282ZM8.37824 13.7094C8.37168 14.2211 8.79808 14.6344 9.30976 14.6409C9.81489 14.6344 10.2347 14.2211 10.2413 13.7094C10.2347 13.1977 9.81489 12.7779 9.30976 12.7779C8.79808 12.7779 8.37168 13.1977 8.37824 13.7094Z"
      fill="#FF5C00"
    />
    <circle
      cx="9.5"
      cy="9.5"
      r="8.91936"
      stroke="#FF5C00"
      strokeWidth="1.16128"
    />
  </svg>
);

const defaultImgUrl = "/images/tmp/temp.png";

interface LeftRightEachProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelName: string;
  className?: string;
  isRequired?: boolean;
  isTextArea?: boolean;
}

// eslint-disable-next-line react/display-name
export const LeftRightEach = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  LeftRightEachProps
>((props, ref) => {
  const {
    labelName,
    className = "",
    isRequired = false,
    isTextArea = false,
    ...etc
  } = props;
  return (
    <div className="flex w-full gap-1 justify-center items-center">
      <div className="w-1/4 text-lg text-[#292929] flex gap-0.5 items-start">
        <div>{labelName}</div>
        {isRequired && <div className="text-[15px] text-[#FF5C00]">*</div>}
      </div>
      <div className="w-3/4">
        {isTextArea ? (
          <textarea
            {...(etc as {})}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={3}
            className="w-full bg-[#F3F3F3] border border-[#DBDBDB] py-2.5 px-4 rounded-lg text-lg placeholder:text-[#ACACAC]"
          />
        ) : (
          <LoginInput {...etc} ref={ref as React.Ref<HTMLInputElement>} />
        )}
      </div>
    </div>
  );
});

interface RegisterInfoInfoProps extends RegisterInfoProps {
  goPaper: (data: any) => void;
}

const RegisterInfoInfoListBusiness: LabelInputPropsType[] = [
  {
    inputName: "businessName",
    labelName: "회사명",
    isRequired: true,
    registerOptions: { required: true },
  },
  {
    inputName: "name",
    labelName: "담당자명",
    isRequired: true,
    registerOptions: { required: true },
  },
  {
    inputName: "email",
    labelName: "이메일",
    isRequired: true,
    registerOptions: { required: true },
    type: "email",
  },
  {
    inputName: "password",
    labelName: "패스워드",
    isRequired: true,
    registerOptions: { required: true },
    type: "password",
  },
  {
    inputName: "passwordCheck",
    labelName: "패스워드 확인",
    isRequired: true,
    registerOptions: { required: true },
    type: "password",
  },
  {
    inputName: "address",
    labelName: "주소",
    isRequired: true,
    registerOptions: { required: true },
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
    defaultAdded: { name: "instagram", handle: "" },
  },
  {
    inputName: "introduce",
    labelName: "소개글",
    isRequired: true,
    inputType: "textarea",
    registerOptions: { required: true },
    placeholder: "300자 이내",
  },
];

const RegisterInfoInfoListPersonal: LabelInputPropsType[] = [
  {
    inputName: "name",
    labelName: "이름",
    isRequired: true,
    registerOptions: { required: true },
  },
  {
    inputName: "nickname",
    labelName: "닉네임",
    isRequired: true,
    registerOptions: { required: true },
  },
  {
    inputName: "email",
    labelName: "이메일",
    isRequired: true,
    registerOptions: { required: true },
    type: "email",
  },
  {
    inputName: "password",
    labelName: "패스워드",
    isRequired: true,
    registerOptions: { required: true },
    type: "password",
  },
  {
    inputName: "passwordCheck",
    labelName: "패스워드 확인",
    isRequired: true,
    registerOptions: { required: true },
    type: "password",
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
    defaultAdded: { name: "Instagram", handle: "" },
  },
  {
    inputName: "introduce",
    labelName: "소개글",
    isRequired: true,
    inputType: "textarea",
    registerOptions: { required: true },
    placeholder: "300자 이내",
  },
];

const RegisterInfoInfo = (props: RegisterInfoInfoProps) => {
  const { setStep, type, goPaper } = props;
  const useFormReturn = useForm();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormReturn;
  const infoList =
    type === cubeezType.business
      ? RegisterInfoInfoListBusiness
      : RegisterInfoInfoListPersonal;
  const [ProfileSrc, setProfileSrc] = useState(defaultImgUrl);
  useEffect(() => setValue("email", { now: "", target: "", code: "" }), []);
  const profileRegister = register("profile", { required: true });
  return (
    <form
      onSubmit={handleSubmit(
        (data) => {
          const { password, passwordCheck, email, phones } = data;
          if (password !== passwordCheck) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
          }
          if (email.now !== email.target || email.code.length !== 6) {
            alert("이메일과 인증번호를 확인해주세요.");
            return;
          }
          if (
            !phones.reduce(
              (prev: any, curr: any) =>
                prev && curr.now === curr.target && curr.code.length === 6,
              true
            )
          ) {
            console.log(phones);
            alert("연락처와 인증번호를 확인해주세요.");
            return;
          }
          goPaper({
            ...data,
            email: email.now,
            phones: phones.map((t: any) => t.target),
            isBusiness: type === cubeezType.business,
            emailCode: email.code,
            phoneCodes: phones.map((t: any) => t.code),
            ...(type === cubeezType.business
              ? {
                  zipcode: "00000",
                  addressDetail: "",
                  businessType: "INDIVIDUAL",
                }
              : {}),
          });
        },
        (d) => {
          if (d?.profile) {
            alert("프로필 사진을 등록해주세요.");
          }
        }
      )}
      className="w-full flex flex-col items-center"
    >
      <div className="flex items-center w-full gap-6 mb-8">
        <div className="w-1/3 aspect-square relative">
          <div className="w-full h-full relative rounded-full overflow-hidden">
            <Image
              src={ProfileSrc}
              alt="프로필 이미지"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <label className="w-10 h-10 bg-[#FF5C00] rounded-full absolute bottom-1 right-0 flex justify-center items-center cursor-pointer">
            {penSvg}
            <input
              className="hidden"
              type="file"
              accept="image/*"
              {...{
                ...profileRegister,
                onChange: (e) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.result) setProfileSrc(reader.result as string);
                  };
                  reader.readAsDataURL((e.target.files as any)[0]);
                  profileRegister.onChange(e);
                },
              }}
            />
          </label>
        </div>
        <div className="w-2/3 flex flex-col gap-3">
          {infoList.slice(0, 2).map((d) => (
            <NewLabelInput
              {...d}
              useForm={useFormReturn}
              key={d.inputName}
              inputStyle="login"
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 mb-12">
        {(() => {
          const lis = infoList
            .slice(2)
            .map((d) => (
              <NewLabelInput
                {...d}
                useForm={useFormReturn}
                key={d.inputName}
                inputStyle="login"
              />
            ));
          lis.splice(
            type === cubeezType.business ? 4 : 3,
            1,
            <EmptyInput labelName="연락처" isRequired isLong>
              <MultiInput
                useForm={useFormReturn}
                innerType="custom"
                name="phones"
                defaultAdded={{ now: "", code: "", target: "" }}
                render={(useForm: UseFormReturn, name: string) => (
                  <CustomVerify
                    useForm={useForm}
                    name={name}
                    inputType="tel"
                    placeholder="전화번호"
                    getVerify={async (target) => verifyAPI("phone", target)}
                  />
                )}
              />
            </EmptyInput>
          );
          lis.splice(
            0,
            1,
            <EmptyInput labelName="이메일" isRequired isLong>
              <CustomVerify
                useForm={useFormReturn}
                name="email"
                inputType="email"
                placeholder="이메일"
                getVerify={async (target) => verifyAPI("email", target)}
              />
            </EmptyInput>
          );
          return lis;
        })()}
      </div>
      <LoginButton type="submit">다음</LoginButton>
    </form>
  );
};

interface RegisterInfoPaperProps extends RegisterInfoProps {
  goEnd: (data: any) => void;
}

interface EachPaperI {
  name: string;
  code: string;
  info: {
    title: string;
    content: string;
  }[];
}

interface paperListI {
  [type: string]: EachPaperI[];
}

const paperList: paperListI = {
  personal: [
    { name: "통장사본", code: "bankBook", info: [] },
    {
      name: "신분증 사본",
      code: "idCard",
      info: [
        {
          title: "내국인",
          content:
            "주민등록증, 운전면허증, 여권 중 1개를 사진으로 촬영 혹은 스캔해 첨부해 주세요.",
        },
        {
          title: "외국인",
          content:
            "외국인등록증, 여권 중 1개를 사진으로 촬영 혹은 스캔해 첨부해 주세요.",
        },
      ],
    },
    {
      name: "자격증",
      code: "license",
      info: [
        {
          title: "인바운드",
          content: "Q-Net 관광통역안내사",
        },
        {
          title: "아웃바운드",
          content: "국외여행인솔자",
        },
        {
          title: "인트라바운드",
          content: "Q-Net 국내여행안내사",
        },
      ],
    },
  ],
  business: [
    { name: "통장사본", code: "bankBook", info: [] },
    {
      name: "관광 사업자 등록증",
      code: "businessRegistration",
      info: [],
    },
    {
      name: "보증보험 사본",
      code: "insurance",
      info: [
        {
          title: "기획여행\n보증보험",
          content:
            "인허가 보증보험으로, 국내외 취급 가능 여행사 혹은 종합여행사에서 고객에게 입금을 받고, 금전적 문제가 발생 할 것을 대비해 가입하는 보험을 말합니다.",
        },
        {
          title: "여행업 영업\n보증보험",
          content:
            "여행업자가 여행알선과 관련한 사고로 인하여 여행자에게 피해를 준 경우 보증보험등의 가입 또는 영업보증금의 예치기간내에 발생한 변상금의 청구를 위한 목적으로 가입하는 보험을 말합니다. ",
        },
      ],
    },
  ],
};

interface FileInfoI extends EachPaperI {
  imgSrc: string | null;
  FileInfo: FileList | FileList[] | null;
}

const RegisterInfoPaper = (props: RegisterInfoPaperProps) => {
  const { setStep, type, goEnd } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [FileInfo, setFileInfo] = useState<FileInfoI[]>(
    paperList[type].map((paper) => ({
      ...paper,
      imgSrc: null,
      FileInfo: null,
    }))
  );
  // useEffect(() => {
  //   setFileInfo(
  //     paperList[type].map((paper) => ({
  //       ...paper,
  //       imgSrc: null,
  //       FileInfo: null,
  //     }))
  //   );
  // }, [type]);

  const fileSelectHandler = async (idx: number, fileList: FileList | null) => {
    if (!fileList) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    const result = await new Promise<string>((resolve) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
    });
    const newList = [...FileInfo];
    const newInfo = { ...newList[idx] };
    newInfo.imgSrc = result;
    newInfo.FileInfo = fileList;
    newList[idx] = newInfo;
    setFileInfo(newList);
  };
  return (
    <LoginContainer>
      <div className="w-full flex flex-col gap-10 mb-10">
        {FileInfo.map(({ name, imgSrc, info }, idx) => (
          <div className="flex flex-col w-full gap-6" key={`${name}${idx}`}>
            <div className="flex justify-between items-center relative">
              <div className="font-semibold text-lg text-[#292929] flex items-center">
                {name}
                <span className="text-[#FF5C00] ml-1 mr-2">*</span>
                {info.length > 0 && (
                  <>
                    <div className="peer cursor-help">{InfoSvg}</div>
                    <div className="hidden peer-hover:flex absolute w-3/4 top-8 bg-white border border-[#FF3939] z-10 py-5 px-4 rounded-lg flex-col gap-4">
                      {info.map(({ title, content }) => (
                        <div
                          key={`${name}${title}`}
                          className="flex w-full gap-1 items-start"
                        >
                          <div className="w-1/4 font-bold text-sm text-[#212121] whitespace-pre-wrap">
                            {title}
                          </div>
                          <div className="w-3/4 font-normal text-xs text-black flex items-center mt-0.5">
                            {content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <label
                className={cls(
                  " flex justify-center items-center cursor-pointer",
                  imgSrc
                    ? ""
                    : "w-24 h-9 rounded color-[#00192F] border border-[#00192F] text-sm"
                )}
              >
                {imgSrc ? noBgPenSvg : "파일 첨부"}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => fileSelectHandler(idx, e.target.files)}
                />
              </label>
            </div>
            <div className="w-full aspect-video relative overflow-hidden rounded border border-[#DBDBDB]">
              <Image
                src={imgSrc || defaultImgUrl}
                alt={`${name} 이미지`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
      <LoginButton
        onClick={() => {
          const ok = FileInfo.reduce(
            (prev, curr) => prev && (curr.FileInfo ? true : false),
            true
          );
          if (ok) {
            goEnd(
              FileInfo.reduce(
                (prev, curr) => ({ ...prev, [curr.code]: curr.FileInfo }),
                {}
              )
            );
          } else {
            alert("파일을 모두 선택해주세요.");
          }
        }}
      >
        가입신청
      </LoginButton>
    </LoginContainer>
  );
};

export const RegisterInfo = (props: RegisterInfoProps) => {
  const { setStep, type } = props;
  const [Status, setStatus] = useState<"info" | "paper">("info");
  const [InfoData, setInfoData] = useState<any>({});
  const [PaperData, setPaperData] = useState({});
  const goPaper = (data: any) => {
    setInfoData({ ...data, profile: undefined });
    setPaperData({ profile: data.profile });
    setStatus("paper");
  };
  const goEnd = async (data: any) => {
    console.log(InfoData);
    setPaperData((p) => ({ ...p, ...data }));
    const d = await registerAPI(InfoData);
    console.log(d);
    setStep(RegisterStep.finish);
  };
  return (
    <LoginContainer>
      <div className="flex h-8 w-full gap-1 mb-8">
        {statusList.map(({ status, name }) => (
          <div
            className={cls(
              "w-full h-full flex justify-center items-center text-[15px]",
              status === Status
                ? "bg-[#00192F] text-white font-bold"
                : "bg-[#DFDFDF] text-[#8C8C8C]"
            )}
            key={`${status}${name}`}
          >
            {name}
          </div>
        ))}
      </div>
      {Status === "info" && (
        <RegisterInfoInfo setStep={setStep} type={type} goPaper={goPaper} />
      )}
      {Status === "paper" && (
        <RegisterInfoPaper setStep={setStep} type={type} goEnd={goEnd} />
      )}
    </LoginContainer>
  );
};

export default RegisterInfo;
