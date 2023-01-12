import { PropsWithChildren } from "react";

export const LeftRight = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="flex items-center justify-between w-full">{children}</div>
  );
};

export default LeftRight;
