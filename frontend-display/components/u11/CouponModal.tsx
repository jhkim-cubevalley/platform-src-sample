import React from "react";
import X_Gray from "../../public/images/xGray.svg";
import Info_Gray from "../../public/images/info-gray.svg";

const tempCoupon = [
  {
    expireAt: "2022.10.28",
    type: "discount",
    rate: "10",
    name: "쿠폰명1",
    threshold: "500,000",
    usable: true,
  },
  {
    expireAt: "2022.10.28",
    type: "point",
    rate: "500",
    name: "쿠폰명2",
    threshold: "500,000",
    usable: true,
  },
  {
    expireAt: "2022.10.28",
    type: "discount",
    rate: "10",
    name: "쿠폰명3",
    threshold: "500,000",
    usable: true,
  },
  {
    expireAt: "2022.10.28",
    type: "point",
    rate: "1000",
    name: "쿠폰명4",
    threshold: "500,000",
    usable: true,
  },
];

const ModalTitle = (props: any) => {
  const { text } = props;
  return (
    <h1 className="m-0 font-['Pretendard'] text-[17px] font-bold leading-[20.2px] text-[#0e0e0e]  lg:text-[26px] lg:leading-[31px]">
      {text}
    </h1>
  );
};

const CouponExpireDate = (props: any) => {
  const { text } = props;
  return (
    <span className="m-0 font-['Pretendard'] text-[13.5px] font-medium leading-[16.1px] text-[#ff5c00] lg:text-[16.2px] lg:leading-[19.4px]">
      {`~${text}`}
    </span>
  );
};

const CouponRate = (props: any) => {
  const { text, type } = props;

  return (
    <span className="m-0 font-['Pretendard'] text-[13.4px] font-semibold leading-[16.1px] text-[#000000] lg:text-[16.2px] lg:leading-[19.4px]">
      {type === "discount" ? `${text}% 할인` : `${text}P 적립`}
    </span>
  );
};

const CouponName = (props: any) => {
  const { text } = props;
  return (
    <span className="m-0 font-['Pretendard'] text-[13.27px] font-bold leading-[15.83px] text-[#505050] lg:text-[18.5px] lg:leading-[22px]">
      {text}
    </span>
  );
};

const CouponButton = (props: any) => {
  const { usable } = props;
  if (usable) {
    return (
      <div className="flex-center h-[20px] w-[48px] cursor-pointer rounded-[2.8px] bg-[#ff5c00]  lg:h-[33.3px] lg:w-[90px] lg:rounded-[3.7px]">
        <span className="m-0 font-['Pretendard'] text-[9.44px] font-bold leading-[11.27px] text-[#ffffff] lg:text-[17.6px] lg:leading-[21.1px]">
          미사용
        </span>
      </div>
    );
  }

  return <div></div>;
};

const CouponThreshold = (props: any) => {
  const { text } = props;
  return (
    <div className="flex-ic gap-[6px]">
      <Info_Gray />
      <span className="m-0 font-['Pretendard'] text-[9.94px] font-normal leading-[11.86px] text-[#797979] underline lg:text-[14.8px] lg:leading-[17.7px]">
        {`${text}원 이상 구매시 사용가능`}
      </span>
    </div>
  );
};

const CouponItem = (props: any) => {
  const { data, setSelectedCoupon, toggle } = props;
  const { type } = data;

  return (
    <div className="flex w-full flex-col justify-center gap-[13px] rounded-[3.7px] bg-[#ffffff] py-[20px] px-[14px] shadow-[0px_3px_3px_rgba(0,0,0,0.1)] lg:h-[159px] lg:min-h-[159px] lg:w-full lg:px-[40px]">
      <div className="flex-ic gap-[13.5px]">
        <CouponExpireDate text={data.expireAt} />
        <CouponRate text={data.rate} type={type} />
      </div>
      <div className="flex-ic w-full justify-between">
        <CouponName text={data.name} />
        <div
          className="hidden lg:block"
          onClick={() => {
            setSelectedCoupon(data.name);
            toggle();
          }}
        >
          <CouponButton usable={data.usable} />
        </div>
      </div>
      <div className="flex-ic justify-between ">
        <CouponThreshold text={data.threshold} />
        <div
          className="block lg:hidden"
          onClick={() => {
            setSelectedCoupon(data.name);
            toggle();
          }}
        >
          <CouponButton usable={data.usable} />
        </div>
      </div>
    </div>
  );
};

const CouponModal = (props: any) => {
  const { toggle, setSelectedCoupon } = props;

  return (
    <div className=" flex max-h-[70vh] w-full  flex-col rounded-[11px] bg-[#f2f2f2] p-[28px] lg:h-fit lg:max-h-[891px] lg:max-w-none lg:pb-[122px]">
      <div className="cursor-pointer" onClick={toggle}>
        <X_Gray />
      </div>
      <div className="flex-center w-full flex-col lg:mt-[29px] lg:gap-[75px] ">
        <ModalTitle text="쿠폰함" />
      </div>

      <div className="flex-ic mt-[43px] w-full flex-col gap-[37px] self-center overflow-scroll lg:mt-0 lg:w-[783px] lg:gap-[30px] ">
        <div className="flex flex-col  lg:w-full">
          <div className="flex-ic gap-[14px]">
            <h2 className="m-0 font-['Pretendard'] text-[17px] font-bold leading-[20.2px] text-[#000000] lg:text-[21.4px] lg:leading-[25.6px]">
              사용 가능한 쿠폰:{" "}
            </h2>
            <h2 className="m-0 font-['Pretendard'] text-[17px] font-bold leading-[20.2px] text-[#ff5c00] lg:text-[21.4px] lg:leading-[25.6px]">
              {tempCoupon.length}개
            </h2>
          </div>
        </div>
        <div className="no-scrollbar flex w-full flex-col gap-[30px] overflow-scroll lg:max-h-[537px]">
          {tempCoupon.map((item: any, index: any) => (
            <CouponItem
              key={index}
              data={item}
              setSelectedCoupon={setSelectedCoupon}
              toggle={toggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
