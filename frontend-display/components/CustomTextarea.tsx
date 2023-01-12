import React from "react";
import { cls } from "../utils/cls";

export interface CustomTextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  inputStyle?: "login" | "main";
}

// eslint-disable-next-line react/display-name
export const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>((props, ref) => {
  const { className = "", inputStyle = "main", ...etc } = props;
  return (
    <textarea
      className={cls(
        "w-full  rounded-lg border-[1.5px] px-4 py-2.5 text-lg text-[#4a4a4a] placeholder:text-[#ACACAC] disabled:bg-gray-200",
        inputStyle === "login"
          ? "border-[#DBDBDB] bg-[#F3F3F3]"
          : "border-[#D7D7D7] bg-white",
        className
      )}
      rows={3}
      {...etc}
      ref={ref}
    />
  );
});

export default CustomTextarea;
