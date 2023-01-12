import { CSSProperties, PropsWithChildren } from "react";
import { MainTableDiv } from "./MainTable";

type RoundMiniBannerType = "orange" | "black";

const RoundMiniBannerStyle: { [t in RoundMiniBannerType]: CSSProperties } = {
  orange: {
    background: "#FF5C00",
    color: "#FFFFFF",
  },
  black: {
    background: "#333333",
    color: "#FFFFFF",
  },
};

interface RoundMiniBannerProps {
  type: RoundMiniBannerType;
}

export const RoundMiniBanner = (
  props: PropsWithChildren<RoundMiniBannerProps>
) => {
  const { type, children } = props;
  return (
    <MainTableDiv>
      <div
        style={RoundMiniBannerStyle[type]}
        className="w-20 rounded-[20px] font-semibold text-lg py-1 text-center "
      >
        {children}
      </div>
    </MainTableDiv>
  );
};

export default RoundMiniBanner;
