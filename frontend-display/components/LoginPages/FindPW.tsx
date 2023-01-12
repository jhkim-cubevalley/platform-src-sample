import { FormEvent, useState } from "react";
import LoginInput from "../LoginInput";
import MainButton from "../MainButton";
import PopupTitle from "../PopupTitle";
import { loginPopupChanger } from "../useLoginPopup";
import { Alert } from "./Alert";
import FindID from "./FindID";
import LoginText from "./LoginText";

const FindPWError = (props: loginPopupChanger) => (
  <Alert
    type="orange"
    title="패스워드 찾기"
    textList={[{ content: "적어주신 이메일(아이디)은\n가입 이력이 없습니다." }]}
    buttonList={[
      {
        styleType: "black",
        content: "패스워드 다시 찾기",
        onClick: () => props.openPopup(<FindPW openPopup={props.openPopup} />),
      },
      {
        styleType: "white",
        content: "아이디 찾기",
        onClick: () => props.openPopup(<FindID openPopup={props.openPopup} />),
      },
    ]}
  />
);

const FindPWFinish = (props: loginPopupChanger) => (
  <Alert
    type="black"
    title="패스워드 찾기"
    textList={[
      { content: "적어주신 이메일(아이디)로\n임시 비밀번호를 보내드렸습니다." },
      { content: "확인 부탁드립니다.", bold: true },
    ]}
    buttonList={[
      {
        styleType: "black",
        content: "확인",
        onClick: () => props.openPopup(null),
      },
    ]}
  />
);

export const FindPW = (props: loginPopupChanger) => {
  const { openPopup } = props;
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any)[0].value;
    if (email.length <= 0) alert("이메일을 입력해주세요");
    else {
      console.log({ email });
      openPopup(<FindPWError {...props} />);
    }
  };
  return (
    <div className="w-full flex flex-col">
      <PopupTitle>패스워드 찾기</PopupTitle>
      <LoginText className="mt-20">
        가입할 때 등록한{"\n"}이메일(아이디)를 입력해주세요.
      </LoginText>
      <form
        className="flex w-full flex-col mt-10 gap-2"
        onSubmit={submitHandler}
      >
        <LoginInput type="email" required placeholder="이메일(아이디)" />
        <MainButton styleType="black" className="mt-28">
          다음
        </MainButton>
      </form>
    </div>
  );
};

export default FindPW;
