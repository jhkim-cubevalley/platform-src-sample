import { useEffect } from "react";
import { RegisterOptions, useFieldArray, UseFormReturn } from "react-hook-form";
import CustomInput, { CustomInputProps } from "./CustomInput";
import CustomSelect, { CustomSelectProps } from "./CustomSelect";
import CustomTextarea, { CustomTextareaProps } from "./CustomTextarea";
import SelectInput, { SelectInputProps } from "./SelectInput";

const minusSvg = (
  <svg
    width="53"
    height="54"
    viewBox="0 0 53 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_853_7938)">
      <circle
        cx="26.333"
        cy="24.333"
        r="13.333"
        stroke="#FF5C00"
        strokeWidth="2"
      />
      <rect
        x="19.498"
        y="23.9868"
        width="13.9309"
        height="1.10748"
        rx="0.553741"
        fill="#FF5C00"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_853_7938"
        x="0.183154"
        y="0.80912"
        width="52.2997"
        height="52.2997"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2.62597" />
        <feGaussianBlur stdDeviation="5.90842" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_853_7938"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_853_7938"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const plusSvg = (
  <svg
    width="53"
    height="53"
    viewBox="0 0 53 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_853_7934)">
      <circle
        cx="26.333"
        cy="23.7491"
        r="13.333"
        stroke="#00192F"
        strokeWidth="2"
      />
      <rect
        x="19.498"
        y="23.4028"
        width="13.9309"
        height="1.10748"
        rx="0.553741"
        fill="#00192F"
      />
      <rect
        x="25.9092"
        y="30.9219"
        width="13.9309"
        height="1.10748"
        rx="0.553741"
        transform="rotate(-90 25.9092 30.9219)"
        fill="#00192F"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_853_7934"
        x="0.183154"
        y="0.225136"
        width="52.2997"
        height="52.2997"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2.62597" />
        <feGaussianBlur stdDeviation="5.90842" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_853_7934"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_853_7934"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export interface MultiInputProps {
  defaultAdded?: any;
  registerOptions?: RegisterOptions;
  inputStyle?: "login" | "main";
  addable?: boolean;
}

export interface MultiInputPropsAdditional {
  name: string;
  useForm: UseFormReturn<any>;
}

export interface MultiInputInput extends MultiInputProps {
  innerType?: "input";
  subProps?: CustomInputProps;
}

export interface MultiInputSelect extends MultiInputProps {
  innerType: "select";
  subProps?: CustomSelectProps;
  optionList: {
    value: string;
    name: string;
  }[];
}

export interface MultiInputTextarea extends MultiInputProps {
  innerType: "textarea";
  subProps?: CustomTextareaProps;
}

export interface MultiInputSelectinput extends MultiInputProps {
  innerType: "selectinput";
  subProps: SelectInputProps;
}

export type MultiInputPropsType =
  | MultiInputInput
  | MultiInputSelect
  | MultiInputTextarea
  | MultiInputSelectinput;

export const MultiInput = (
  props: MultiInputPropsType & MultiInputPropsAdditional
) => {
  const {
    useForm,
    name,
    subProps = {},
    innerType = "input",
    defaultAdded = { value: "" },
    inputStyle = "main",
    registerOptions = {},
    addable = true,
  } = props;
  const { register, control } = useForm;
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name,
  });
  useEffect(() => {
    if (fields.length === 0) replace([defaultAdded]);
  }, []);
  // console.log(fields);
  const deleteHandler = (idx: number) => {
    if (fields.length < 2) return;
    remove(idx);
  };
  const addHandler = () => {
    append(defaultAdded);
  };
  return (
    <div className="flex w-full flex-col gap-1">
      {fields.map((data, i) => (
        <div key={data.id} className=" flex w-full justify-center">
          {innerType === "input" && (
            <CustomInput
              inputStyle={inputStyle}
              {...(subProps as {})}
              {...register(`${name}.${i}.value`, registerOptions)}
            />
          )}
          {innerType === "select" && (
            <CustomSelect
              inputStyle={inputStyle}
              {...(subProps as {})}
              {...register(`${name}.${i}.value`, registerOptions)}
            >
              {(props as MultiInputSelect).optionList.map(({ value, name }) => (
                <option value={value} key={value}>
                  {name}
                </option>
              ))}
            </CustomSelect>
          )}
          {innerType === "textarea" && (
            <CustomTextarea
              inputStyle={inputStyle}
              {...(subProps as {})}
              {...register(`${name}.${i}.value`, registerOptions)}
            />
          )}
          {innerType === "selectinput" && (
            <SelectInput
              useForm={useForm}
              inputStyle={inputStyle}
              {...(subProps as SelectInputProps)}
              name={`${name}.${i}`}
            />
          )}
          {fields.length > 1 && addable && (
            <button onClick={() => deleteHandler(i)} type="button">
              {minusSvg}
            </button>
          )}
        </div>
      ))}
      {addable && name === "sns" && fields.length < 3 && (
        <div className="flex w-full justify-end">
          <button onClick={addHandler} type="button">
            {plusSvg}
          </button>
        </div>
      )}
      {addable && name !== "sns" && (
        <div className="flex w-full justify-end">
          <button onClick={addHandler} type="button">
            {plusSvg}
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiInput;
