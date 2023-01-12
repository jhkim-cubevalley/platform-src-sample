import { PropsWithChildren } from "react";
import { cls } from "../utils/cls";

export const PopupTitle = ({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cls(
        "flex w-full items-center justify-center whitespace-pre-wrap text-center text-base font-semibold text-[#292929] lg:text-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PopupTitle;
