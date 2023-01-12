import { FormEvent, useState } from "react";
import LoginInput from "../LoginInput";
import MainButton from "../MainButton";
import PopupTitle from "../PopupTitle";
import { loginPopupChanger } from "../useLoginPopup";
import { Alert } from "./Alert";
import LoginText from "./LoginText";

const FindIDError = (props: loginPopupChanger) => (
  <Alert
    type="orange"
    title="아이디 찾기"
    textList={[{ content: "아이디를 찾는데 실패했습니다." }]}
    buttonList={[
      {
        styleType: "black",
        content: "다시 찾기",
        onClick: () => props.openPopup(<FindID openPopup={props.openPopup} />),
      },
    ]}
  />
);

const FindIDFinish = (props: loginPopupChanger & { email: string }) => {
  const { email, openPopup } = props;
  return (
    <div className="w-full flex flex-col">
      <PopupTitle>아이디 찾기</PopupTitle>
      <LoginText className="mt-20">아이디를 확인해주세요!</LoginText>
      <form className="flex w-full flex-col mt-10 gap-2">
        <LoginInput
          value={email}
          disabled
          className=" text-center text-[#a85323]"
        />
      </form>
      <MainButton
        styleType="black"
        className="mt-28"
        type="button"
        onClick={() => openPopup(null)}
      >
        확인
      </MainButton>
    </div>
  );
};

export const FindID = (props: loginPopupChanger) => {
  const { openPopup } = props;
  const [PhoneCodeTime, setPhoneCodeTime] = useState<null | number>(null);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!PhoneCodeTime) {
      const phoneNumber = (e.target as any)[0].value;
      if (phoneNumber.length <= 0) alert("휴대폰 번호를 입력해주세요");
      else {
        console.log({ phoneNumber });
        setPhoneCodeTime(new Date().getTime());
      }
    } else {
      const phoneNumber = (e.target as any)[0].value;
      const phoneCode = (e.target as any)[1].value;
      if (phoneCode.length <= 0) alert("인증번호를 입력해주세요");
      else {
        console.log({ phoneNumber, phoneCode });
        openPopup(<FindIDFinish {...props} email="test123@gmail.com" />);
      }
    }
  };
  return (
    <div className="w-full flex flex-col">
      <PopupTitle>아이디 찾기</PopupTitle>
      <LoginText className="mt-20">
        가입할 때 등록한{"\n"}휴대폰 번호를 입력해주세요.
      </LoginText>
      <form
        className="flex w-full flex-col mt-10 gap-2"
        onSubmit={submitHandler}
      >
        <LoginInput
          type="tel"
          placeholder="휴대폰 번호를 입력해주세요"
          disabled={PhoneCodeTime ? true : false}
          required
        />
        {PhoneCodeTime && (
          <LoginInput placeholder="인증번호를 입력해주세요" required />
        )}
        <MainButton styleType="black" className="mt-28">
          {PhoneCodeTime ? "인증하기" : "인증번호 확인"}
        </MainButton>
      </form>
    </div>
  );
};

export default FindID;
