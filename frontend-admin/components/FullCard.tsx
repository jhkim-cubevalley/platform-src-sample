import { PropsWithChildren } from "react";
import { cls } from "../utils/cls";

export const FullCard = (props: PropsWithChildren<{ small?: boolean }>) => {
  const { children, small = false } = props;
  return (
    <div
      className={cls(
        "w-full flex flex-col border-[1.5px] border-[#D7D7D7] bg-white",
        small ? "p-4" : "p-10"
      )}
    >
      {children}
    </div>
  );
};

export default FullCard;
