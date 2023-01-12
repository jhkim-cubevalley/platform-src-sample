import Image from "next/image";
import React, { useState } from "react";

export interface CustomImageProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	className?: string;
	inputStyle?: "login" | "main";
	small?: boolean;
}
// eslint-disable-next-line react/display-name
export const CustomImage = React.forwardRef<HTMLInputElement, CustomImageProps>(
	(props, ref) => {
		const {
			className = "",
			inputStyle = "main",
			small = false,
			...etc
		} = props;

		const [showImages, setShowImages] = useState([]);
		const handleAddImages = (event: any) => {
			const imageLists = event.target.files;
			let imageUrlLists = [...showImages];

			for (let i = 0; i < imageLists.length; i++) {
				const currentImageUrl = URL.createObjectURL(imageLists[i]);
				imageUrlLists.push(currentImageUrl as never);
			}

			if (imageUrlLists.length > 5) {
				imageUrlLists = imageUrlLists.slice(0, 5);
			}

			setShowImages(imageUrlLists);
		};

		const handleDeleteImage = (id: number) => {
			setShowImages(showImages.filter((_, index) => index !== id));
		};
		https: return (
			<div className="flex flex-col gap-4 justify-center">
				<input
					id="upload"
					type={"file"}
					hidden
					{...etc}
					ref={ref}
					accept="image/*"
					multiple
					onChange={handleAddImages}
				/>
				<div className="flex gap-4">
					<label
						htmlFor="upload"
						className="flex justify-center items-center rounded-lg font-semibold text-xl cursor-pointer bg-[#00192F] text-white w-36 h-12"
					>
						등록
					</label>
					<span className="text-[#ff3939] flex items-end">
						이미지는 5개까지 등록 가능하며, 용량이 10Mb를 초과할 수 없습니다.
						권장 해상도 800x450(px)
					</span>
				</div>
				<div className="flex gap-4">
					{!showImages && (
						<div>
							<Image
								src={"/images/tmp/temp.png"}
								alt={`temp`}
								layout="fixed"
								width={200}
								height={150}
							/>
						</div>
					)}
					{showImages &&
						showImages.map((image, id) => (
							<div key={`${image}-${id}`}>
								<Image
									src={image}
									alt={`${image}-${id}`}
									layout="fixed"
									width={200}
									height={150}
								/>
							</div>
						))}
				</div>
			</div>
		);
	}
);

export default CustomImage;
