import { PropsWithChildren } from "react";
import { cls } from "../utils/cls";
import { loginType } from "../utils/useLogin";
import MainNavBar from "./MainNavBar";

interface MainContainerProps {
  type: loginType;
  className?: string;
}

export const MainContainer = (props: PropsWithChildren<MainContainerProps>) => {
  const { type, children, className = "" } = props;
  return (
    <div className="w-screen h-screen min-w-[1820px] flex scrollbar-hide">
      <div className="w-80 h-full flex-shrink-0">
        <MainNavBar type={type} />
      </div>
      <div
        className={cls(
          "w-full h-full bg-[#FAFAFA] px-24 py-14 overflow-y-auto",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
