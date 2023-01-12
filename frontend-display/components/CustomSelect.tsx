import React from "react";
import { cls } from "../utils/cls";

export interface CustomSelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  className?: string;
  inputStyle?: "login" | "main";
  small?: boolean;
}

// eslint-disable-next-line react/display-name
export const CustomSelect = React.forwardRef<
  HTMLSelectElement,
  CustomSelectProps
>((props, ref) => {
  const { className = "", inputStyle = "main", small = false, ...etc } = props;
  return (
    <select
      className={cls(
        "w-full rounded-lg border-[1.5px] bg-no-repeat text-lg text-[#4a4a4a] placeholder:text-[#ACACAC] disabled:bg-gray-200",
        inputStyle === "login"
          ? "border-[#DBDBDB] bg-[#F3F3F3]"
          : "border-[#D7D7D7] bg-white",
        small ? "h-8 px-4" : " h-12 px-4 py-1",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        appearance: "none",
        WebkitAppearance: "none",
        backgroundPosition: "right 12px center",
        backgroundSize: "1em",
        lineHeight: "24px",
      }}
      {...etc}
      ref={ref}
    />
  );
});

export default CustomSelect;
