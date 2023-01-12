import { CSSProperties, PropsWithChildren } from "react";
import { cls } from "../utils/cls";

type buttonType = "black" | "gray" | "orange" | "white";

const buttonStyle: { [key in buttonType]: CSSProperties } = {
  black: {
    background: "#00192F",
    color: "white",
  },
  gray: {
    background: "#D9D9D9",
    color: "#333333",
  },
  orange: {
    background: "#FF5C00",
    color: "white",
  },
  white: {
    background: "white",
    color: "#262626",
    border: "1px solid #262626",
  },
};

interface MainButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  styleType: buttonType;
  forGrid?: boolean;
  small?: boolean;
  className?: string;
}

export const MainButton = (props: PropsWithChildren<MainButtonProps>) => {
  const {
    styleType,
    forGrid = false,
    small = false,
    className = "",
    ...etc
  } = props;
  return (
    <button
      className={cls(
        "rounded-lg font-semibold text-xl",
        forGrid ? "w-full h-full" : small ? "px-4 h-8" : "w-36 h-12",
        className
      )}
      style={{ ...buttonStyle[styleType], wordBreak: "keep-all" }}
      {...etc}
    />
  );
};

export default MainButton;
