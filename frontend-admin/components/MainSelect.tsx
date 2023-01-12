import React from "react";
import { cls } from "../utils/cls";

export interface MainSelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  className?: string;
}

// eslint-disable-next-line react/display-name
export const MainSelect = React.forwardRef<HTMLSelectElement, MainSelectProps>(
  (props, ref) => {
    const { className = "", ...etc } = props;
    return (
      <select
        className={cls(
          "w-full h-12 bg-white border-[1.5px] border-[#D7D7D7] px-4 py-3 rounded-lg text-[18px] text-[#4a4a4a] placeholder:text-[#ACACAC] bg-no-repeat disabled:bg-gray-200",
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
  }
);

export default MainSelect;
