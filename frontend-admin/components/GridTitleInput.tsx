import React from "react";
import MainInput, { MainInputProps } from "./MainInput";
import MainSelect, { MainSelectProps } from "./MainSelect";

interface GridTitleInputDefaultProps {
  startRow: number;
  startCol: number;
  labelTitle: string;
}

interface GridTitleInputInputProps
  extends GridTitleInputDefaultProps,
    MainInputProps {}

interface GridTitleInputSelectProps
  extends GridTitleInputDefaultProps,
    MainSelectProps {}

// eslint-disable-next-line react/display-name
export const GridTitleInput = React.forwardRef<
  HTMLInputElement,
  GridTitleInputInputProps
>((props, ref) => {
  const { startRow, startCol, labelTitle, ...etc } = props;
  return (
    <div
      className="w-full h-full"
      style={{ gridRowStart: `${startRow}`, gridColumnStart: `${startCol}` }}
    >
      <label className="w-full h-full flex items-center gap-6">
        <div className="text-xl font-semibold text-[#353535] flex-shrink-0">
          {labelTitle}
        </div>
        <MainInput {...etc} ref={ref as React.ForwardedRef<HTMLInputElement>} />
      </label>
    </div>
  );
});

// eslint-disable-next-line react/display-name
export const GridTitleSelect = React.forwardRef<
  HTMLInputElement,
  GridTitleInputSelectProps
>((props, ref) => {
  const { startRow, startCol, labelTitle, ...etc } = props;
  return (
    <div
      className=""
      style={{ gridRowStart: `${startRow}`, gridColumnStart: `${startCol}` }}
    >
      <label className="w-full h-full flex items-center gap-6">
        <div className="text-xl font-semibold text-[#353535] flex-shrink-0">
          {labelTitle}
        </div>
        <MainSelect
          {...etc}
          ref={ref as React.ForwardedRef<HTMLSelectElement>}
        />
      </label>
    </div>
  );
});
