import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { loginScreenName } from "../pages/login";
import { cls } from "../utils/cls";
import LoginButton from "./LoginButton";
import LoginContainer from "./LoginContainer";
import LoginText from "./LoginText";
import RegisterAgree from "./RegisterAgree";
import RegisterInfo from "./RegisterInfo";

export enum cubeezType {
  personal = "personal",
  business = "business",
}

export enum RegisterStep {
  agree = "agree",
  info = "info",
  finish = "finish",
}

const finishSvg = (
  <svg
    width="46"
    height="46"
    viewBox="0 0 46 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="22.6406" cy="22.6406" r="22.6406" fill="#00192F" />
    <path
      d="M12 22.68L19.6034 30.626L33 16.626"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const businessSvg = (
  <svg
    width="49"
    height="61"
    viewBox="0 0 49 61"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M42.7612 1.93237H6.00586V59.2215H42.7612V1.93237Z"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.76367 59.2214H46.9995"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.811 47.2644H18.9727V59.2216H29.811V47.2644Z"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5664 10.7837H15.9522"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.6875 10.7837H25.0733"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.8105 10.7837H34.1964"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5664 18.9041H15.9522"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.6875 18.9041H25.0733"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.8105 18.9041H34.1964"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5664 27.0244H15.9522"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.6875 27.0244H25.0733"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.8105 27.0244H34.1964"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5664 35.1448H15.9522"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23.6875 35.1448H25.0733"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.8105 35.1448H34.1964"
      stroke="#303030"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const personalSvg = (
  <svg
    width="41"
    height="58"
    viewBox="0 0 41 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32.9854 30.5644C32.0273 30.218 31.002 30.02 29.9094 30.02H10.9151C5.97322 30.02 1.97266 33.9465 1.97266 38.7969V55.7236H38.8518V38.7969C38.8518 35.0189 36.3977 31.7853 32.9854 30.5644V30.5644Z"
      stroke="#303030"
      strokeWidth="3.26557"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.7504 11.966C30.7504 17.5752 26.1279 22.1121 20.4128 22.1121C14.6977 22.1121 10.0752 17.5752 10.0752 11.966C10.0752 6.35672 14.6977 1.81982 20.4128 1.81982C26.1279 1.81982 30.7504 6.35672 30.7504 11.966Z"
      stroke="#303030"
      strokeWidth="3.26557"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RegisterFinish = () => {
  return (
    <LoginContainer className="gap-4">
      {finishSvg}
      <LoginText>
        <span className="font-bold text-[25px]">
          가입 신청이 완료되었습니다.
        </span>
      </LoginText>
      <LoginText>
        {"진행상황은 입력해주신\n이메일을 통해 안내 드리도록 하겠습니다."}
      </LoginText>
      <LoginText>감사합니다.</LoginText>
      <Link href="/login">
        <LoginButton className="mt-20">확인</LoginButton>
      </Link>
    </LoginContainer>
  );
};

const RegisterAfter = (props: { type: cubeezType }) => {
  const { type } = props;
  const [Step, setStep] = useState<RegisterStep>(RegisterStep.agree);
  if (Step === RegisterStep.agree) return <RegisterAgree setStep={setStep} />;
  else if (Step === RegisterStep.info)
    return <RegisterInfo setStep={setStep} type={type} />;
  else if (Step === RegisterStep.finish) return <RegisterFinish />;
  return <></>;
};

export const Register = () => {
  const [Selected, setSelected] = useState<cubeezType | null>(null);
  const router = useRouter();
  const { type = null } = router.query as { type?: cubeezType };
  if (type) return <RegisterAfter type={type} />;
  return (
    <LoginContainer className="gap-12">
      <LoginText>가입하고자 하는 유형을 선택해주세요</LoginText>
      <div className="flex w-full gap-4">
        <button
          className={cls(
            "w-full aspect-square rounded-md text-xl text-[#292929] flex flex-col justify-center items-center gap-5",
            Selected === cubeezType.business
              ? "border-[1.5px] border-[#00192F]"
              : "border border-[#BABABA]"
          )}
          onClick={() => setSelected(cubeezType.business)}
        >
          {businessSvg}
          사업자(개인/법인)
        </button>
        <button
          className={cls(
            "w-full aspect-square rounded-md text-xl text-[#292929] flex flex-col justify-center items-center gap-5",
            Selected === cubeezType.personal
              ? "border-[1.5px] border-[#00192F]"
              : "border border-[#BABABA]"
          )}
          onClick={() => setSelected(cubeezType.personal)}
        >
          {personalSvg}
          개인
        </button>
      </div>
      <LoginButton
        onClick={() => {
          if (Selected)
            router.push({
              query: { ...router.query, type: Selected },
            });
        }}
      >
        다음
      </LoginButton>
    </LoginContainer>
  );
};
