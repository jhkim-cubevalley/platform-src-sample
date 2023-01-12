import { useEffect, useState } from "react";
import useSWR from "swr";
import { getTosAPI } from "../../utils/api/tos";
import { cls } from "../../utils/cls";
import MainButton from "../MainButton";
import { loginPopupChanger } from "../useLoginPopup";
import { registerStep } from "./Register";

interface RegisterCheckProps {
  className?: string;
  bold?: boolean;
  name?: string;
  checked?: boolean;
  onChange?: (newValue: boolean) => void;
}

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

const agreeList = [
  { name: "개인정보이용동의", content: dummyText },
  { name: "이용약관", content: dummyText },
];

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
        "flex w-full items-center justify-start gap-3",
        bold ? "text-lg font-semibold lg:text-[22px]" : " lg:text-lg",
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
  setStep: (newStep: registerStep) => void;
}) => {
  const { data, mutate } = useSWR("/tos", getTosAPI);
  const termsList =
    data &&
    data.result.find((v, i) => {
      return v.type === "TOS";
    });
  const personalInfoDefaultList =
    data &&
    data.result.find((v, i) => {
      return v.type === "PRIVACY";
    });
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
    <div className="flex w-full flex-col items-center">
      <div className="mb-6 text-sm text-[#959595] lg:text-base">
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
      <div className="my-5 h-[1px] w-full bg-[#EFEFEF]" />
      <div className="flex flex-col gap-8">
        {agreeList.map(({ name }, i) => (
          <div key={`${name}${i}`} className="flex flex-col gap-3">
            <RegisterCheck
              name={name}
              checked={Agreed[i]}
              onChange={() => agreeHandler(i)}
            />
            <div
              className="h-40 w-full overflow-y-scroll whitespace-pre-wrap rounded-md border border-[#BABABA] p-3 text-sm"
              dangerouslySetInnerHTML={{
                __html:
                  name === "개인정보이용동의"
                    ? personalInfoDefaultList?.content || ""
                    : name === "이용약관"
                    ? termsList?.content || ""
                    : "",
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex w-full gap-5">
        <MainButton
          styleType="black"
          onClick={() => {
            if (getAllAgreed()) props.setStep("info");
            else alert("약관에 모두 동의하셔야 합니다.");
          }}
        >
          다음
        </MainButton>
      </div>
    </div>
  );
};

export default RegisterAgree;
