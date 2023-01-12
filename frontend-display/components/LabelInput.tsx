import React from "react";
import LoginInput from "./LoginInput";
// import MainInput from "./MainInput";
// import MainSelect from "./MainSelect";

interface LabelInputEachProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelName: string;
  className?: string;
  isRequired?: boolean;
}

// eslint-disable-next-line react/display-name
export const LabelInput = React.forwardRef<
  HTMLInputElement,
  LabelInputEachProps
>((props, ref) => {
  const { labelName, className = "", isRequired = false, ...etc } = props;
  return (
    <div className="flex w-full gap-1 justify-center items-start lg:items-center flex-col lg:flex-row">
      <div className="w-[150px] text-base lg:text-lg text-[#292929] flex gap-0.5 items-start whitespace-pre-wrap shrink-0">
        <div>{labelName}</div>
        {isRequired && <div className="text-[15px] text-[#FF5C00]">*</div>}
      </div>
      <div className="w-full">
        <LoginInput {...etc} ref={ref} />
      </div>
    </div>
  );
});

interface LabelSelectEachProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  labelName: string;
  className?: string;
  isRequired?: boolean;
}

// eslint-disable-next-line react/display-name
export const LabelSelect = React.forwardRef<
  HTMLSelectElement,
  LabelSelectEachProps
>((props, ref) => {
  const { labelName, className = "", isRequired = false, ...etc } = props;
  return (
    <div className="flex w-full gap-1 justify-center items-center">
      <div className="w-1/4 text-lg text-[#292929] flex gap-0.5 items-start">
        <div>{labelName}</div>
        {isRequired && <div className="text-[15px] text-[#FF5C00]">*</div>}
      </div>
      <div className="w-3/4">{/* <MainSelect {...etc} ref={ref} /> */}</div>
    </div>
  );
});

interface LabelTextAreaEachProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  labelName: string;
  className?: string;
  isRequired?: boolean;
}

// eslint-disable-next-line react/display-name
export const LabelTextArea = React.forwardRef<
  HTMLTextAreaElement,
  LabelTextAreaEachProps
>((props, ref) => {
  const { labelName, className = "", isRequired = false, ...etc } = props;
  return (
    <div className="flex w-full gap-1 justify-center items-center">
      <div className="w-1/4 text-lg text-[#292929] flex gap-0.5 items-start">
        <div>{labelName}</div>
        {isRequired && <div className="text-[15px] text-[#FF5C00]">*</div>}
      </div>
      <div className="w-3/4">
        <textarea
          {...(etc as {})}
          ref={ref}
          rows={3}
          className="w-full bg-white border border-[#DBDBDB] py-2.5 px-4 rounded-lg text-lg placeholder:text-[#ACACAC]"
        />
      </div>
    </div>
  );
});

export default LabelInput;
