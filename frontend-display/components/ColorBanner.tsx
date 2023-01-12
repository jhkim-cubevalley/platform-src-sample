import { CSSProperties, PropsWithChildren } from "react";
import { MainTableDiv } from "./MainTable";

type bannerType = "black" | "gray" | "orange" | "yellow" | "green" | "white";

const bannerStyle: { [key in bannerType]: CSSProperties } = {
  black: {
    background: "#00192F",
    color: "white",
  },
  gray: {
    background: "#D9D9D9",
    color: "black",
  },
  orange: {
    background: "#FF5C00",
    color: "white",
  },
  yellow: {
    background: "#FBC02D",
    color: "black",
  },
  green: {
    background: "#4BD37B",
    color: "black",
  },
  white: {
    background: "white",
    color: "#262626",
    border: "1px solid #262626",
  },
};

export const ColorBanner = ({
  type,
  children,
}: PropsWithChildren<{ type: bannerType }>) => {
  return (
    <MainTableDiv>
      <div
        className="flex h-7 items-center justify-center rounded-md px-10 py-5 text-2xl font-bold"
        style={bannerStyle[type]}
      >
        {children}
      </div>
    </MainTableDiv>
  );
};

export default ColorBanner;
