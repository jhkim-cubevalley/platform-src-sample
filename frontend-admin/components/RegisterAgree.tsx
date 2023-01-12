import { useEffect, useState } from "react";
import useSWR from "swr";
import { getTosAPI } from "../utils/api/tos";
import { cls } from "../utils/cls";
import LoginButton from "./LoginButton";
import LoginContainer from "./LoginContainer";
import { RegisterStep } from "./Register";

const CheckSvg = (props: { checked: boolean }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 46 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="22.6406"
      cy="22.6406"
      r="22.6406"
      fill={props.checked ? "#FF5C00" : "none"}
    />
    <path
      d="M12 22.68L19.6034 30.626L33 16.626"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const dummyText =
  "텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다.\n텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다.\n텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다. 텍스트입니다.";

interface RegisterCheckProps {
  className?: string;
  bold?: boolean;
  name?: string;
  checked?: boolean;
  onChange?: (newValue: boolean) => void;
}

const RegisterCheck = (props: RegisterCheckProps) => {
  const {
    className = "",
    bold = false,
    name = "",
    checked = false,
    onChange = null,
  } = props;
  const [Checked, setChecked] = useState(checked);
  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <button
      className={cls(
        "flex gap-3 w-full items-center justify-start",
        bold ? "text-[22px] font-semibold" : "text-lg",
        className
      )}
      onClick={() => {
        if (onChange) onChange(!Checked);
        else {
          setChecked((a) => !a);
        }
      }}
    >
      <div
        className={cls(
          "rounded-full border-2",
          Checked ? "border-transparent" : ""
        )}
      >
        <CheckSvg checked={Checked} />
      </div>
      {name}
    </button>
  );
};

export const RegisterAgree = (props: {
  setStep: (newStep: RegisterStep) => void;
}) => {
  const { data, mutate } = useSWR("/tos", getTosAPI);
  const termsTerm =
    data &&
    data.result.find((v, i) => {
      return v.name === "이용약관";
    })?.content;
  const personalTerm =
    data &&
    data.result.find((v, i) => {
      return v.name === "개인정보이용동의";
    })?.content;
  const cubeezTerm =
    data &&
    data.result.find((v, i) => {
      return v.name === "큐비즈약관";
    })?.content;
  const agreeList = [
    { name: "개인정보이용동의", content: personalTerm },
    { name: "이용약관", content: termsTerm },
    { name: "큐비즈 약관 별도", content: cubeezTerm },
  ];
  const [Agreed, setAgreed] = useState(agreeList.map(() => false));
  const getAllAgreed = () => {
    return Agreed.reduce((prev, curr) => prev && curr, true);
  };
  const agreeHandler = (i: number) => {
    const target = !Agreed[i];
    const newList = [...Agreed];
    newList[i] = target;
    setAgreed(newList);
  };
  return (
    <LoginContainer>
      <div className="text-[#959595] mb-6">
        큐브밸리를 이용해주셔서 감사합니다. 본 서비스 이용을 위하여 아래의 약관
        동의 및 회원가입이 필요합니다.
      </div>
      <RegisterCheck
        name="전체동의"
        bold
        checked={getAllAgreed()}
        onChange={() => {
          const target = !getAllAgreed();
          setAgreed(Agreed.map(() => target));
        }}
      />
      <div className="w-full h-[1px] bg-[#EFEFEF] my-5" />
      <div className="flex flex-col gap-8">
        {agreeList.map(({ name, content }, i) => (
          <div key={`${name}${i}`} className="flex flex-col gap-3">
            <RegisterCheck
              name={name}
              checked={Agreed[i]}
              onChange={() => agreeHandler(i)}
            />
            <div
              className="w-full h-28 rounded-md border border-[#BABABA] overflow-y-scroll whitespace-pre-wrap p-3"
              dangerouslySetInnerHTML={{ __html: content || "" }}
            ></div>
          </div>
        ))}
      </div>
      <div className="w-full flex gap-5 mt-10">
        <div className="w-1/4">
          <LoginButton className="bg-[#DADADA] text-black">취소</LoginButton>
        </div>
        <div className="w-3/4">
          <LoginButton
            onClick={() => {
              if (getAllAgreed()) props.setStep(RegisterStep.info);
              else alert("약관에 모두 동의하셔야 합니다.");
            }}
          >
            다음
          </LoginButton>
        </div>
      </div>
    </LoginContainer>
  );
};

export default RegisterAgree;
