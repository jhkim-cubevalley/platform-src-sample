import React from "react";
import { RegisterOptions, UseFormReturn } from "react-hook-form";
import { cls } from "../utils/cls";
import CustomInput, { CustomInputProps } from "./CustomInput";
import CustomSelect, { CustomSelectProps } from "./CustomSelect";
import CustomTextarea, { CustomTextareaProps } from "./CustomTextarea";
import ImageInput, { ImageInputProps } from "./ImageInput";
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
  small?: boolean;
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
    ...etc
  } = props;
  const { register } = useForm;
  const isLong =
    inputType === "textarea" || inputType === "multi" || inputType === "image";
  return (
    <label
      htmlFor={labelName}
      className={cls(
        "flex w-full justify-center flex-col lg:flex-row",
        isLong ? "items-start" : "items-start lg:items-center",
        gridLabel ? "gap-6" : "gap-1"
      )}
      style={
        gridLabel
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
            ? " flex-shrink-0 text-xl font-semibold text-[#353535]"
            : "w-[150px] text-base lg:text-lg text-[#292929] flex-shrink-0"
        )}
      >
        <div>{labelName}</div>
        {isRequired && <div className="text-[15px] text-[#FF5C00]">*</div>}
      </div>
      <div className={cls("w-full")}>
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
