import React from "react";
import { cls } from "../utils/cls";

export interface LoginInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  invalid?: boolean;
}

// eslint-disable-next-line react/display-name
export const LoginInput = React.forwardRef<HTMLInputElement, LoginInputProps>(
  (props, ref) => {
    const { className = "", invalid = false, ...etc } = props;
    return (
      <input
        className={cls(
          "w-full h-[45px] lg:h-[52px] bg-[#F0F0F0] text-sm lg:text-lg border border-[#DBDBDB] px-4 rounded-lg placeholder:text-[#ACACAC] disabled:bg-[#c4c3c3]",
          invalid ? "text-[#FF5C00]" : "",
          className
        )}
        {...etc}
        ref={ref}
      />
    );
  }
);

export default LoginInput;
