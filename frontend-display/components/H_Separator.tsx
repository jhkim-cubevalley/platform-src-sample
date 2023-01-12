import React from "react";

const H_Separator = (props: any) => {
  const { mobileThick, gray } = props;

  if (mobileThick) {
    if (gray) {
      return (
        <div
          className={`h-[6px] w-full border-[1px] border-solid bg-[#efefef] lg:hidden `}
        />
      );
    }

    return (
      <div
        className={` h-[6px] w-full border-[1px] border-solid bg-[#f0f0f0] lg:hidden`}
      />
    );
  }

  return (
    <div
      className={` h-[1px] w-full border-[1px] border-solid border-[#eaeaea]`}
    />
  );
};

H_Separator.defaultProps = {
  width: "100%",
  height: "1",
};

export default H_Separator;
