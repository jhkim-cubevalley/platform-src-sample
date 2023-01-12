import { PropsWithChildren } from "react";
import { cls } from "../utils/cls";

export const MainTitle = ({
  children,
  little = false,
}: PropsWithChildren<{ little?: boolean }>) => {
  return (
    <div
      className={cls(
        "w-full font-bold text-[#353535]",
        little ? "text-[26px]" : " text-2xl"
      )}
    >
      {children}
    </div>
  );
};

export default MainTitle;
