import { UseFormReturn } from "react-hook-form";
import CustomInput, { CustomInputProps } from "./CustomInput";
import CustomSelect, { CustomSelectProps } from "./CustomSelect";

export interface SelectInputProps {
  leftName: string;
  rightName: string;
  leftOptions: { value: string; name: string }[];
  leftSubProps?: CustomSelectProps;
  rightSubProps?: CustomInputProps;
  inputStyle?: "login" | "main";
}

export interface SelectInputPropsAdditional {
  useForm: UseFormReturn<any>;
  name: string;
}

export const SelectInput = (
  props: SelectInputProps & SelectInputPropsAdditional
) => {
  const {
    leftName,
    rightName,
    leftSubProps = {},
    rightSubProps = {},
    useForm,
    name,
    leftOptions,
    inputStyle = "main",
  } = props;
  const { register } = useForm;
  return (
    <div className="flex w-full gap-3">
      <div className="w-2/5">
        <CustomSelect
          inputStyle={inputStyle}
          {...leftSubProps}
          {...register(`${name}.${leftName}`)}
        >
          {leftOptions.map(({ value, name }) => (
            <option value={value} key={value}>
              {name}
            </option>
          ))}
        </CustomSelect>
      </div>
      <div className="w-3/5">
        <CustomInput
          inputStyle={inputStyle}
          {...(rightSubProps as {})}
          {...register(`${name}.${rightName}`)}
        />
      </div>
    </div>
  );
};

export default SelectInput;
