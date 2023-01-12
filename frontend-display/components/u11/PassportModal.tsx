import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import X_Gray from "../../public/images/xGray.svg";
import MyInput from "./MyInput";

const tempCountry = [
  { name: "한국", value: "korea" },
  { name: "미국", value: "us" },
  { name: "일본", value: "japan" },
];

const FormTitle = (props: any) => {
  const { text } = props;
  return (
    <span className="m-0 font-['Pretendard'] text-[13.31px] font-medium leading-[25.5px] text-[#292929] lg:text-[20.5px] lg:leading-[40px] ">
      {text}
    </span>
  );
};

const FormWarning = (props: any) => {
  const { text } = props;
  return (
    <span className="m-0 font-['Pretendard'] text-[12.756px] font-normal leading-[15.23px] text-[#7e7e7e] lg:text-[20px] lg:leading-[23.8px]">
      {text}
    </span>
  );
};

const FormButton = (props: any) => {
  const { text, submit } = props;
  if (submit) {
    return (
      <button
        type={"submit"}
        className={`flex-center  h-[43px] w-full rounded-[10px] bg-[#ff5c00] lg:h-[62.5px]`}
      >
        <span className="m-0 font-['Pretendard'] text-[14.66px] font-semibold leading-[17.5px] text-[#ffffff] lg:text-[24px] lg:leading-[28.6px]">
          {text}
        </span>
      </button>
    );
  } else {
    return (
      <button
        type={"submit"}
        className={`flex-center h-[43px] w-full rounded-[10px] bg-[#c7c7c7] lg:h-[62.5px]`}
      >
        <span className="m-0 font-['Pretendard'] text-[14.66px] font-semibold leading-[17.5px] text-[#545151] lg:text-[24px] lg:leading-[28.6px]">
          {text}
        </span>
      </button>
    );
  }
};

const PassportModal = (props: {
  disabled?: boolean;
  firstValue: {
    country: string;
    issue: string;
    passportNumber: string;
    passportExpire: string;
    firstName: string;
    lastName: string;
  };
  callback: (data?: any) => void;
}) => {
  const { disabled = false, firstValue, callback } = props;
  const useFormReturn = useForm({ defaultValues: firstValue });
  const { handleSubmit } = useFormReturn;

  return (
    <div className="put-center flex w-full max-w-[514px] flex-col rounded-[11px] bg-[#f2f2f2]  p-[28px] lg:w-[930px] lg:max-w-[930px]">
      <div
        className="hidden cursor-pointer lg:block"
        onClick={() => callback()}
      >
        <X_Gray />
      </div>
      <form
        className="flex-center w-full flex-col lg:mt-[10px] lg:gap-[4px] "
        onSubmit={handleSubmit((t) => callback(t))}
      >
        <h1 className="m-0 font-['Pretendard'] text-[16.92px] font-bold leading-[20.2px] text-[#0e0e0e] lg:text-[26px] lg:leading-[31px]">
          여권정보 입력
        </h1>

        <div className="items mt-[45px] flex w-full flex-col gap-[13px] lg:w-[480px] lg:gap-[21px]">
          {/* <div className="flex-ic">
            <div className="flex-ic w-full">
              <FormTitle text="영문 이름" />
            </div>
            <div>
              <MyInput
                type="text"
                useForm={useFormReturn}
                inputName="firstName"
                disabled={disabled}
              />
            </div>
          </div>
          <div className="flex-ic">
            <div className="flex-ic w-full">
              <FormTitle text="영문 성" />
            </div>
            <div>
              <MyInput
                type="text"
                useForm={useFormReturn}
                inputName="lastName"
                disabled={disabled}
              />
            </div>
          </div> */}
          <div className="flex-ic w-full justify-between">
            <div className="flex-ic">
              <FormTitle text="국적" />
            </div>
            <div className="">
              <MyInput
                type="text"
                useForm={useFormReturn}
                inputName="country"
                disabled={disabled}
              />
            </div>
          </div>
          <div className="flex-ic w-full justify-between">
            <div className="flex-ic">
              <FormTitle text="발행국" />
            </div>
            <div className="">
              <MyInput
                type="text"
                useForm={useFormReturn}
                inputName="issue"
                disabled={disabled}
              />
            </div>
          </div>
          <div className="flex-ic">
            <div className="flex-ic w-full">
              <FormTitle text="여권번호" />
            </div>
            <div>
              <MyInput
                type="text"
                useForm={useFormReturn}
                inputName="passportNumber"
                disabled={disabled}
              />
            </div>
          </div>
          <div className="flex-ic">
            <div className="flex-ic w-full">
              <FormTitle text="여권만료일" />
            </div>
            <div>
              <MyInput
                type="date"
                useForm={useFormReturn}
                inputName="passportExpire"
                disabled={disabled}
              />
            </div>
          </div>
          <FormWarning
            text="*여권만료일이 출발일로부터 6개월 미만인 경우는 출국이 
제한될 수 있으니, 여권만료일을 확인해 주세요!"
          />
          <div className="flex-center w-full flex-col gap-[11.5px]">
            <FormButton submit text="확인" />
            {/* <FormButton text="사진으로 인식해 입력하기" /> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PassportModal;
