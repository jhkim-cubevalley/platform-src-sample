import { watch } from "fs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  registerAPI,
  socialRegisterAPI,
  verifyAPI,
} from "../../utils/api/auth";
import { snsDefault, snsList } from "../../utils/list";
import LabelInput from "../LabelInput";
import MainButton from "../MainButton";
import { NewLabelInput } from "../NewLabelInput";
import PopupTitle from "../PopupTitle";
import { loginPopupChanger } from "../useLoginPopup";
import { registerStep } from "./Register";
import { RegisterFinish } from "./RegisterFinish";
import { Timer } from "./Timer";
import { ErrorMessage } from "@hookform/error-message";
export const RegisterInfo = (
  props: loginPopupChanger & { isSocial?: string }
) => {
  const { openPopup, isSocial = false } = props;
  const useFormReturn = useForm({ criteriaMode: "all" });
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useFormReturn;
  const [CodeList, setCodeList] = useState<{
    phone: null | string;
    email: null | string;
  }>({
    phone: null,
    email: null,
  });
  const getCode = async (type: "phone" | "email") => {
    const now = getValues(type);
    setCodeList((t) => ({ ...t, [type]: now }));
    await verifyAPI(type, now);
  };
  const onSocialSubmit = async (d: any) => {
    const data = await socialRegisterAPI({ ...d }, isSocial as string);
    if (data)
      openPopup(<RegisterFinish name={d.nickname} openPopup={openPopup} />);
  };
  const onSubmit = async (d: any) => {
    if (isSocial) {
      onSocialSubmit(d);
      return;
    }
    if (d.phone !== CodeList.phone || d.phoneCode.length !== 6) {
      alert("연락처와 인증번호를 확인하세요.");
      return;
    }
    if (d.email !== CodeList.email || d.emailCode.length !== 6) {
      alert("이메일과 인증번호를 확인하세요.");
      return;
    }
    if (d.password !== d.passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
      return;
    }
    console.log(d);
    const data = await registerAPI({ ...d });
    if (data) openPopup(<RegisterFinish name={d.name} openPopup={openPopup} />);
  };
  const emailCodeAvailable = CodeList.email === watch("email");
  const phoneCodeAvailable = CodeList.phone === watch("phone");
  const [canSendPhone, setCanSendPhone] = useState(true);
  const [resendPhone, setResendPhone] = useState(false);
  const [phoneMM, setPhoneMM] = useState<number>(3);
  const [phoneSS, setPhoneSS] = useState<number>(0);
  const [canSendEmail, setCanSendEmail] = useState(true);
  const [resendEmail, setResendEmail] = useState(false);
  const [emailMM, setEmailMM] = useState<number>(3);
  const [emailSS, setEmailSS] = useState<number>(0);
  useEffect(() => {
    let countdownEmail = setInterval(() => {
      if (emailSS > 0) {
        setEmailSS(emailSS - 1);
      }
      if (emailSS === 0) {
        if (emailMM === 0) {
          clearInterval(countdownEmail);
          setCanSendEmail(true);
        } else {
          setEmailMM(emailMM - 1);
          setEmailSS(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdownEmail);
  }, [emailMM, emailSS]);
  useEffect(() => {
    setEmailMM(3);
    setEmailSS(0);
  }, [resendEmail]);
  useEffect(() => {
    let countdownPhone = setInterval(() => {
      if (phoneSS > 0) {
        setPhoneSS(phoneSS - 1);
      }
      if (phoneSS === 0) {
        if (phoneMM === 0) {
          clearInterval(countdownPhone);
          setCanSendPhone(true);
        } else {
          setPhoneMM(phoneMM - 1);
          setPhoneSS(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdownPhone);
  }, [phoneMM, phoneSS]);
  useEffect(() => {
    setPhoneMM(3);
    setPhoneSS(0);
  }, [resendPhone]);
  useEffect(() => {
    setEmailMM(3);
    setEmailSS(0);
  }, [emailCodeAvailable, canSendEmail]);
  useEffect(() => {
    setPhoneMM(3);
    setPhoneSS(0);
  }, [phoneCodeAvailable, canSendPhone]);
  return (
    <div className="flex w-full flex-col items-center">
      <PopupTitle>
        큐브밸리의 여행자가 되어{"\n"}다양한 혜택을 받아보세요.
      </PopupTitle>
      <form
        className="mt-6 flex w-full flex-col items-center gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {!isSocial && (
          <>
            <div className="flex w-full gap-3">
              <LabelInput
                labelName="이메일(아이디)"
                type="email"
                isRequired
                {...register("email", { required: true })}
              />
            </div>
            <div className="flex w-full gap-3">
              <LabelInput
                labelName="인증번호"
                {...register("emailCode", { required: true })}
                isRequired
                disabled={!emailCodeAvailable}
              />
              <div className="h-full w-32 flex-shrink-0 pt-7 lg:pt-0">
                <MainButton
                  styleType="white"
                  small
                  fullFrame
                  type="button"
                  onClick={() => {
                    if (!emailCodeAvailable) {
                      getCode("email");
                      setCanSendEmail(false);
                    } else if (canSendEmail) {
                      getCode("email");
                      setResendEmail(true);
                      setCanSendEmail(false);
                    }
                  }}
                >
                  {emailCodeAvailable && !canSendEmail ? (
                    <div>
                      {emailMM}:{emailSS < 10 ? `0${emailSS}` : emailSS}
                    </div>
                  ) : emailCodeAvailable && canSendEmail ? (
                    "재전송"
                  ) : (
                    "인증번호 받기"
                  )}
                </MainButton>
              </div>
            </div>
            <LabelInput
              labelName="패스워드"
              type="password"
              isRequired
              {...register("password", {
                required: "8~16자 영문대소문자와 숫자를 사용하세요.",
                // minLength: {
                //   value: 8,
                //   message: "8~16자 영문대소문자와 숫자를 사용하세요.",
                // },
                // maxLength: {
                //   value: 16,
                //   message: "8~16자 영문대소문자와 숫자를 사용하세요.",
                // },
                pattern: {
                  value: /^[A-Za-z0-9]{8,16}$/,
                  message: "8~16자 영문대소문자와 숫자를 사용하세요.",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="w-full pl-[152px] text-[#FF5C00]">
                    {message}
                  </p>
                ))
              }
            />
            <LabelInput
              labelName="패스워드 확인"
              type="password"
              isRequired
              {...register("passwordConfirm", {
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
                  }
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="passwordConfirm"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="w-full pl-[152px] text-[#FF5C00]">
                    {message}
                  </p>
                ))
              }
            />

            <LabelInput
              labelName="이름(실명)"
              isRequired
              {...register("name", { required: true })}
            />
            <NewLabelInput
              useForm={useFormReturn}
              labelName="성별"
              inputName="sex"
              inputType="select"
              inputStyle="login"
              optionList={[
                { name: "남", value: "M" },
                { name: "여", value: "F" },
              ]}
              registerOptions={{
                value: "M",
              }}
            />
          </>
        )}

        <LabelInput
          labelName="닉네임"
          isRequired
          {...register("nickname", { required: true })}
        />
        {!isSocial && (
          <>
            <div className="flex w-full gap-3">
              <LabelInput
                labelName="연락처"
                type="tel"
                isRequired
                {...register("phone", { required: true })}
              />
            </div>
            <div className="flex w-full gap-3">
              <LabelInput
                labelName="ㄴ 인증번호"
                {...register("phoneCode", { required: true })}
                isRequired
                disabled={!phoneCodeAvailable}
              />
              <div className="h-full w-32 flex-shrink-0 pt-7 lg:pt-0">
                <MainButton
                  styleType="white"
                  small
                  fullFrame
                  type="button"
                  onClick={() => {
                    if (!phoneCodeAvailable) {
                      getCode("phone");
                      setCanSendPhone(false);
                    } else if (canSendPhone) {
                      getCode("phone");
                      setResendPhone(true);
                      setCanSendPhone(false);
                    }
                  }}
                >
                  {phoneCodeAvailable && !canSendPhone ? (
                    <div>
                      {phoneMM}:{phoneSS < 10 ? `0${phoneSS}` : phoneSS}
                    </div>
                  ) : phoneCodeAvailable && canSendPhone ? (
                    "재전송"
                  ) : (
                    "인증번호 받기"
                  )}
                </MainButton>
              </div>
              {/* <div className="h-full w-32 flex-shrink-0 pt-7 lg:pt-0">
                <MainButton styleType="white" small fullFrame type="button">
                  {phoneCodeAvailable ? (
                   
                  ) : (
                    "3:00"
                  )}
                </MainButton>
              </div> */}
            </div>
          </>
        )}

        <LabelInput labelName="추천인 코드" {...register("referralCode")} />
        <NewLabelInput
          useForm={useFormReturn}
          inputName="sns"
          labelName="SNS"
          inputStyle="login"
          inputType="multi"
          innerType="selectinput"
          subProps={{
            leftOptions: snsList,
            leftName: "name",
            rightName: "handle",
          }}
          defaultAdded={snsDefault}
        />
        <MainButton styleType="black" className="mt-4">
          회원가입
        </MainButton>
      </form>
    </div>
  );
};

export default RegisterInfo;
