import React from "react";
import { cls } from "../utils/cls";

export interface CustomInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  inputStyle?: "login" | "main";
  small?: boolean;
}

// eslint-disable-next-line react/display-name
export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const {
      className = "",
      inputStyle = "main",
      small = false,
      ...etc
    } = props;
    return (
      <input
        className={cls(
          "w-full  rounded-lg border-[1.5px] px-4 py-3 text-lg text-[#4a4a4a] placeholder:text-[#ACACAC] disabled:bg-gray-200",
          inputStyle === "login"
            ? "border-[#DBDBDB] bg-[#F3F3F3]"
            : "border-[#D7D7D7] bg-white",
          small ? "h-8" : " h-12",
          className
        )}
        {...etc}
        ref={ref}
      />
    );
  }
);

export default CustomInput;
