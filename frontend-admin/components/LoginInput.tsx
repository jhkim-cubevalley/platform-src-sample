import React from "react";
import { cls } from "../utils/cls";

export interface LoginInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  invalid?: boolean;
  forLogin?: boolean;
}

// eslint-disable-next-line react/display-name
export const LoginInput = React.forwardRef<HTMLInputElement, LoginInputProps>(
  (props, ref) => {
    const { className = "", invalid = false, forLogin = false, ...etc } = props;
    return (
      <input
        className={cls(
          "w-full h-12 bg-[#F3F3F3] border border-[#DBDBDB] py-2.5 rounded-lg text-lg placeholder:text-[#ACACAC]",
          invalid ? "text-[#FF5C00]" : "",
          forLogin ? " px-7" : "px-4",
          className
        )}
        {...etc}
        ref={ref}
      />
    );
  }
);

export default LoginInput;
