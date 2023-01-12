import { UseFormReturn } from "react-hook-form";
import CustomImage from "./CustomImage";
import { CustomInputProps } from "./CustomInput";
import { CustomSelectProps } from "./CustomSelect";

export interface ImageInputProps {
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

export const ImageInput = (
	props: ImageInputProps & SelectInputPropsAdditional
) => {
	return (
		<div className="w-full flex gap-3">
			<div className="">
				<CustomImage></CustomImage>
			</div>
		</div>
	);
};

export default ImageInput;
