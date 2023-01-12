import React, { PropsWithChildren } from "react";
import { UseFormReturn } from "react-hook-form";

const MyInput = (
  props: PropsWithChildren<{
    useForm: UseFormReturn<any>;
    inputName: string;
    type?: string;
    disabled?: boolean;
    placeholder?: string;
    value?: string;
  }>
) => {
  const {
    type,
    useForm,
    inputName,
    children,
    disabled = false,
    placeholder,
    value,
  } = props;

  const { register } = useForm;

  if (type === "radio") {
    return (
      <input
        type={"radio"}
        className="h-[22px] w-[22px] accent-[#00192f]"
        disabled={disabled}
        {...register(inputName)}
        placeholder={placeholder}
      />
    );
  }

  if (type === "checkbox-circle") {
    return (
      <div className="flex-center flex h-3 w-3 overflow-hidden rounded-full lg:h-7 lg:w-7">
        <input
          type={"checkbox"}
          className="h-7 w-7 accent-[#00192f]"
          {...register(inputName)}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <input
        type="checkbox"
        {...register(inputName)}
        className="h-3 w-3 accent-[#7e7e7e] lg:h-7 lg:w-7"
        disabled={disabled}
        placeholder={placeholder}
      />
    );
  }

  if (type === "select") {
    return (
      <select
        className="m-0 h-[30px] w-[245px] rounded-[10px]  border-[1px] border-r-[16px] border-[#eaeaea] border-r-[transparent] pl-[18px] font-['Pretendard'] text-[12.2px] font-normal leading-[14.4px] text-[#7e7e7e] lg:h-[60px] lg:w-[370px] lg:border-[2px] lg:px-[36px] lg:py-[15px] lg:pl-[36px] lg:text-[24px] lg:leading-[16px]  "
        {...register(inputName)}
        disabled={disabled}
        placeholder={placeholder}
      >
        {children}
      </select>
    );
  }

  return (
    <input
      className={` box-border h-[30px] w-[245px] rounded-[10px] border-[0.7px] border-[#eaeaea] px-[18px] py-[7.5px] font-['Pretendard'] text-[12.2px] font-normal leading-[14.5px] text-[#7e7e7e] lg:h-[60px] lg:w-[370px] lg:border-[2px] lg:px-[36px] lg:py-[15px] lg:text-[24px] lg:leading-[28.6px] `}
      type={type}
      {...register(inputName)}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

MyInput.defaultProps = {
  width: 370,
  height: 60,
};

export default MyInput;
