import Image from "next/image";
import React from "react";
import Tmp1 from "../public/images/tmp/tmpProfile.png";
import Tmp2 from "../public/images/tmp/tmpProfile2.png";
import Tmp3 from "../public/images/tmp/tmpProfile3.png";
import Tmp4 from "../public/images/tmp/tmpProfile4.png";
import Tmp5 from "../public/images/tmp/tmpProfile5.png";

const ProfileCircleDiv = (props: any) => {
  const images = [Tmp1, Tmp2, Tmp3, Tmp4, Tmp5];
  const { url, index } = props;
  const currentImg = images[index - 1];

  if (url) {
    return (
      <div className="flex h-[83px] w-[83px] overflow-hidden rounded-[50%]">
        <Image src={url} alt="" width={"83px"} height={"83px"} />
      </div>
    );
  }

  return (
    <div className="flex h-[83px] w-[83px] overflow-hidden rounded-[50%]">
      <Image src={`${currentImg.src}`} alt="" width={"83px"} height={"83px"} />
    </div>
  );
};

ProfileCircleDiv.defaultProps = {
  index: 1,
  url: "",
};

export default ProfileCircleDiv;
