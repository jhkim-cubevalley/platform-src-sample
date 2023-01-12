import { useState } from "react";
import { cls } from "../utils/cls";

const closeSvg = (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.945312 1.75781L24.263 25.0755"
      stroke="#8C8C8C"
      strokeWidth="2.22074"
    />
    <path
      d="M0.945312 25.0742L24.263 1.75655"
      stroke="#8C8C8C"
      strokeWidth="2.22074"
    />
  </svg>
);

export const usePopup = () => {
  const [Target, setTarget] = useState<JSX.Element | null>(null);
  const openPopup = (target: JSX.Element | null) => setTarget(target);
  const closePopup = (callback?: () => void) => {
    if (callback) callback();
    setTarget(null);
  };
  const isOpen = Target ? true : false;
  const component = (
    <div
      className={cls(
        "fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50",
        Target ? "" : "hidden"
      )}
      onClick={() => setTarget(null)}
    >
      <div
        className={
          "relative flex h-full w-full flex-col overflow-y-auto bg-[#FAFAFA] px-6 pb-32 pt-20 lg:h-4/5 lg:w-[645px] lg:rounded-xl lg:px-24 lg:pb-20"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-7 left-7" onClick={() => closePopup()}>
          {closeSvg}
        </button>
        {Target}
      </div>
    </div>
  );
  return {
    component,
    openPopup,
    closePopup,
    isOpen,
  };
};

export default usePopup;
