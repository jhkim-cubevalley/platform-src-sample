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
    background: "transparent",
    color: "#00192F",
    border: "1px solid #00192F",
  },
};

export interface MainButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  styleType: buttonType;
  small?: boolean;
  className?: string;
  fullFrame?: boolean;
}

export const MainButton = (props: PropsWithChildren<MainButtonProps>) => {
  const {
    styleType,
    small = false,
    fullFrame = false,
    className = "",
    ...etc
  } = props;
  return (
    <button
      className={cls(
        "rounded-lg font-semibold ",
        fullFrame ? "h-full w-full" : "h-12 w-full lg:h-16",
        small ? "text-sm lg:text-base" : "text-lg lg:text-2xl",
        className
      )}
      style={buttonStyle[styleType]}
      {...etc}
    />
  );
};

export default MainButton;
