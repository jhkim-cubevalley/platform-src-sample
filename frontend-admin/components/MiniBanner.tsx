import { CSSProperties, PropsWithChildren } from "react";
import { MainTableDiv } from "./MainTable";

export type MiniBannerType =
  | "gray"
  | "yellow"
  | "blue"
  | "purple"
  | "red"
  | "green"
  | "darkgray"
  | "black";

const MiniBannerStyle: { [t in MiniBannerType]: CSSProperties } = {
  gray: {
    background: "#D9D9D9",
    color: "#000000",
  },
  yellow: {
    background: "#FBC02D",
    color: "#000000",
  },
  blue: {
    background: "#8AABFF",
    color: "#000000",
  },
  purple: {
    background: "#C69AFF",
    color: "#000000",
  },
  red: {
    background: "#FF3939",
    color: "#000000",
  },
  green: {
    background: "#4BD37B",
    color: "#000000",
  },
  darkgray: {
    background: "#626262",
    color: "#F5F5F5",
  },
  black: {
    background: "#00192F",
    color: "#FFFFFF",
  },
};

interface MiniBannerProps {
  type: MiniBannerType;
}

export const MiniBanner = (props: PropsWithChildren<MiniBannerProps>) => {
  const { type, children } = props;
  return (
    <MainTableDiv>
      <div
        style={MiniBannerStyle[type]}
        className="w-24 rounded font-semibold text-lg py-1 flex justify-center items-center"
      >
        {children}
      </div>
    </MainTableDiv>
  );
};

export default MiniBanner;
