import { PropsWithChildren } from "react";
import { cls } from "../utils/cls";

export const ButtonLine = (props: PropsWithChildren<{ little?: boolean }>) => {
  const { children, little = false } = props;
  return (
    <div
      className={cls(
        "flex justify-center items-center",
        little ? "gap-2" : "gap-3"
      )}
    >
      {children}
    </div>
  );
};

export default ButtonLine;
