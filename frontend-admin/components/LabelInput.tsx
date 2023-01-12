import React, { PropsWithChildren } from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";
import { cls } from "../utils/cls";
import CustomInput, { CustomInputProps } from "./CustomInput";
import CustomSelect, { CustomSelectProps } from "./CustomSelect";
import CustomTextarea, { CustomTextareaProps } from "./CustomTextarea";
import ImageInput, { ImageInputProps } from "./ImageInput";
import MainInput from "./MainInput";
import MainSelect from "./MainSelect";
import MultiInput, { MultiInputPropsType } from "./MultiInput";
import SelectInput, { SelectInputProps } from "./SelectInput";

interface LabelInputDefaultProps {
  inputName: string;
  labelName: string;
  className?: string;
  isRequired?: boolean;
  registerOptions?: RegisterOptions;
  inputStyle?: "login" | "main";
  gridRow?: number;
  gridCol?: number;
  gridColEnd?: number;
  gridLabel?: boolean;
  absWidth?: boolean;
  small?: boolean;
  large?: boolean;
  productType?: string;
  handleAddImages?: (event: any) => void;
  handleDeleteImage?: (id: string) => void;
}

interface LabelInputInputProps
  extends LabelInputDefaultProps,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    CustomInputProps {
  inputType?: "input";
}

interface LabelInputSelectProps
  extends LabelInputDefaultProps,
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    CustomSelectProps {
  inputType: "select";
  optionList: {
    value: string;
    name: string;
  }[];
  defaultValue?: string;
}

interface LabelInputTextAreaProps
  extends LabelInputDefaultProps,
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    CustomTextareaProps {
  inputType: "textarea";
}

interface LabelInputSelectInputProps
  extends LabelInputDefaultProps,
    SelectInputProps {
  inputType: "selectinput";
}

interface LabelInputMultiDefaultProps extends LabelInputDefaultProps {
  inputType: "multi";
}

interface LabelInputImageProps extends LabelInputDefaultProps {
  inputType: "image";
  handleAddImages?: (event: any) => void;
  handleDeleteImage?: (id: string) => void;
}

type LabelInputMultiProps = LabelInputMultiDefaultProps & MultiInputPropsType;

export type LabelInputPropsType =
  | LabelInputInputProps
  | LabelInputMultiProps
  | LabelInputSelectProps
  | LabelInputTextAreaProps
  | LabelInputSelectInputProps
  | LabelInputImageProps;

export const NewLabelInput = (
  props: LabelInputPropsType & { useForm: UseFormReturn<any> }
) => {
  const {
    inputType = "input",
    useForm,
    inputName,
    labelName,
    className = "",
    isRequired = false,
    registerOptions = {},
    inputStyle = "main",
    gridCol,
    gridRow,
    gridColEnd,
    gridLabel = false,
    productType,
    absWidth = false,
    large = false,
    ...etc
  } = props;
  const { register } = useForm;
  const isLong =
    inputType === "textarea" || inputType === "multi" || inputType === "image";
  return (
    <label
      htmlFor={labelName}
      className={cls(
        "flex w-full justify-center",
        isLong ? "items-start" : "items-center",
        gridLabel || absWidth ? "gap-6" : "gap-1"
      )}
      style={
        gridCol && gridRow
          ? gridColEnd
            ? {
                gridRowStart: `${gridRow}`,
                gridColumnStart: `${gridCol}`,
                gridColumnEnd: `${gridColEnd}`,
              }
            : {
                gridRowStart: `${gridRow}`,
                gridColumnStart: `${gridCol}`,
              }
          : {}
      }
    >
      <div
        className={cls(
          "flex items-start whitespace-pre-wrap gap-0.5",
          isLong ? "pt-2" : "",
          gridLabel
            ? "text-xl font-semibold text-[#353535]"
            : "text-[18px] leading-5 text-[#292929]",
          gridLabel || absWidth ? "flex-shrink-0" : large ? "w-1/3" : "w-1/4"
        )}
      >
        <div>{labelName}</div>
        {isRequired && <div className="text-[15px] text-[#FF5C00]">*</div>}
      </div>
      <div
        className={cls(
          gridLabel || absWidth ? "w-full" : large ? "w-2/3" : "w-3/4"
        )}
      >
        {inputType === "input" && (
          <CustomInput
            {...(etc as {})}
            inputStyle={inputStyle}
            {...register(inputName, registerOptions)}
          />
        )}
        {inputType === "select" && (
          <CustomSelect
            {...(etc as {})}
            inputStyle={inputStyle}
            {...register(inputName, registerOptions)}
          >
            {(props as LabelInputSelectProps).optionList.map(
              ({ value, name }) => (
                <option value={value} key={value}>
                  {name}
                </option>
              )
            )}
          </CustomSelect>
        )}
        {inputType === "textarea" && (
          <CustomTextarea
            {...(etc as {})}
            inputStyle={inputStyle}
            {...register(inputName, registerOptions)}
          />
        )}
        {inputType === "multi" && (
          <MultiInput
            {...(etc as MultiInputPropsType)}
            name={inputName}
            inputStyle={inputStyle}
            useForm={useForm}
            defaultAdded={(props as LabelInputMultiProps).defaultAdded}
            registerOptions={registerOptions}
          />
        )}
        {inputType === "selectinput" && (
          <SelectInput
            {...(etc as SelectInputProps)}
            inputStyle={inputStyle}
            useForm={useForm}
            name={inputName}
          />
        )}
        {inputType === "image" && (
          <ImageInput
            {...(etc as ImageInputProps)}
            inputStyle={inputStyle}
            useForm={useForm}
            name={inputName}
          />
        )}
      </div>
    </label>
  );
};

export const EmptyInput = (
  props: PropsWithChildren<{
    labelName: string;
    className?: string;
    isRequired?: boolean;
    gridRow?: number;
    gridCol?: number;
    gridColEnd?: number;
    gridLabel?: boolean;
    small?: boolean;
    isLong?: boolean;
    absWidth?: boolean;
  }>
) => {
  const {
    labelName,
    className = "",
    isRequired = false,
    gridCol,
    gridRow,
    gridColEnd,
    gridLabel = false,
    isLong = false,
    absWidth = false,
    children,
  } = props;
  return (
    <label
      htmlFor={labelName}
      className={cls(
        "flex w-full justify-center",
        isLong ? "items-start" : "items-center",
        gridLabel || absWidth ? "gap-6" : "gap-1"
      )}
      style={
        gridRow && gridCol
          ? gridColEnd
            ? {
                gridRowStart: `${gridRow}`,
                gridColumnStart: `${gridCol}`,
                gridColumnEnd: `${gridColEnd}`,
              }
            : {
                gridRowStart: `${gridRow}`,
                gridColumnStart: `${gridCol}`,
              }
          : {}
      }
    >
      <div
        className={cls(
          "flex items-start whitespace-pre-wrap gap-0.5",
          isLong ? "pt-2" : "",
          gridLabel
            ? "text-xl font-semibold text-[#353535]"
            : "text-lg text-[#292929]",
          gridLabel || absWidth ? "flex-shrink-0" : "w-1/4"
        )}
      >
        <div>{labelName}</div>
        {isRequired && <div className="text-[15px] text-[#FF5C00]">*</div>}
      </div>
      <div className={cls(gridLabel || absWidth ? "w-full" : "w-3/4")}>
        {children}
      </div>
    </label>
  );
};

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
    <div className="flex w-full gap-1 justify-center items-center">
      <div className="w-1/4 text-lg text-[#292929] flex gap-0.5 items-start whitespace-pre-wrap">
        <div>{labelName}</div>
        {isRequired && <div className="text-[15px] text-[#FF5C00]">*</div>}
      </div>
      <div className="w-3/4">
        <MainInput {...etc} ref={ref} />
      </div>
    </div>
  );
});

interface LabelMultiInputEachProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  useForm: UseFormReturn<any>;
  name: string;
  labelName: string;
  className?: string;
  isRequired?: boolean;
  registerOptions?: RegisterOptions;
}

// eslint-disable-next-line react/display-name
// export const LabelMultiInput = React.forwardRef<
//   HTMLInputElement,
//   LabelMultiInputEachProps
// >((props, ref) => {
//   const {
//     labelName,
//     className = "",
//     isRequired = false,
//     useForm,
//     name,
//     registerOptions = {},
//     ...etc
//   } = props;
//   return (
//     <div className="flex w-full gap-1 justify-center items-start">
//       <div className="w-1/4 text-lg text-[#292929] flex gap-0.5 items-start whitespace-pre-wrap pt-2">
//         <div>{labelName}</div>
//         {isRequired && <div className="text-[15px] text-[#FF5C00]">*</div>}
//       </div>
//       <div className="w-3/4">
//         <MultiInput
//           {...etc}
//           useForm={useForm}
//           name={name}
//           type="main"
//           registerOptions={registerOptions}
//         />
//       </div>
//     </div>
//   );
// });

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
      <div className="w-3/4">
        <MainSelect {...etc} ref={ref} />
      </div>
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
