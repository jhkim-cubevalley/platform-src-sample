import { PropsWithChildren } from "react";
import { cls } from "../../utils/cls";

export interface LoginTextProps {
  bold?: boolean;
  className?: string;
}

export const LoginText = (props: PropsWithChildren<LoginTextProps>) => {
  const { bold = false, children, className = "" } = props;
  return (
    <div
      className={cls(
        "w-full flex justify-center items-center text-center whitespace-pre-wrap text-[#292929] text-lg lg:text-[22px]",
        bold ? "font-semibold" : "",
        className
      )}
    >
      {children}
    </div>
  );
};

export default LoginText;
