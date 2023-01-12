import React from "react";
import { reservationInfoI } from "../../pages/reservation/package/[packageId]";

const GridText = (props: any) => {
  const { text, normal, medium, semibold, bold } = props;

  return (
    <span
      className={`m-0 font-['Pretendard']  text-[24px] leading-[28.6px] text-[#7e7e7e] ${
        bold
          ? "font-bold"
          : semibold
          ? "font-semibold"
          : medium
          ? "font-medium"
          : normal
          ? "font-normal"
          : null
      } `}
    >
      {text}
    </span>
  );
};

GridText.defaultProps = {
  normal: true,
  medium: false,
  semibold: false,
  bold: false,
};

// const Grid = (props: any) => {
//   const { cols, rows, mainTitle, subTitle, data } = props;

//   return (
//     <div className={`grid grid-cols-${cols} grid-rows-${rows}`}>
//       {data.map((item: any, index: any) => (
//         <div
//           key={index}
//           className={`flex-center box-border border  py-[22px] col-start-${
//             (index % (cols - 1)) + 2
//           }  col-end-${(index % (cols - 1)) + 3} row-start-${
//             index + 1 < cols
//               ? 2
//               : index + 1 < cols + (cols - 1)
//               ? 3
//               : index + 1 < cols + 2 * (cols - 1)
//               ? 4
//               : 5
//           }`}
//         >
//           <GridText
//             text={item}
//             normal
//             bold={(index + 1) % (cols - 1) === 0 ? true : false}
//           />
//         </div>
//       ))}
//       {mainTitle.map((title: any, index: any) => (
//         <div
//           key={index}
//           className={`flex-center box-border border bg-[#efefef]  py-[22px] col-start-${
//             index + 1
//           } col-end-${index + 2} row-start-1 row-end-2`}
//         >
//           <GridText
//             text={title}
//             bold={mainTitle.length === index + 1 && true}
//           />
//         </div>
//       ))}
//       {subTitle.map((title: any, index: any) => (
//         <div
//           key={index}
//           className={`flex-center  col-start-1 col-end-2  box-border border py-[22px] row-start-${
//             index + 2
//           } row-end-${index + 3}`}
//         >
//           <GridText
//             text={title}
//             medium={subTitle.length === index + 1 && true}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

const Grid = (props: { type?: "package"; info: reservationInfoI }) => {
  const {
    info: { adultNum, childNum, infantNum, eventData, productData },
    type,
  } = props;

  const totalPrice =
    adultNum * productData.priceAdult +
    childNum * productData.priceTeen +
    infantNum * productData.priceKid +
    (adultNum + childNum + infantNum) * productData.fuelSurcharge;

  if (type === "package")
    return (
      <div className={`grid grid-cols-4 grid-rows-4`}>
        <div
          className={`flex-center col-start-1 row-start-1 box-border  border bg-[#efefef] py-[22px] `}
        >
          <GridText text={"상품 금액"} bold />
        </div>
        <div
          className={`flex-center col-start-2 row-start-1 box-border border  bg-[#efefef] py-[22px] `}
        >
          <GridText text={"기본상품가"} bold />
        </div>
        <div
          className={`flex-center col-start-3 row-start-1 box-border border bg-[#efefef] py-[22px] `}
        >
          <GridText text={"유류할증료"} bold />
        </div>
        <div
          className={`flex-center col-start-4 row-start-1 box-border border  bg-[#efefef] py-[22px] `}
        >
          <GridText text={"총 상품금액"} bold />
        </div>

        {(
          [
            ...Array(adultNum).fill({
              name: "성인",
              price: productData.priceAdult,
              fuel: productData.fuelSurcharge,
            }),
            ...Array(childNum).fill({
              name: "아동",
              price: productData.priceTeen,
              fuel: productData.fuelSurcharge,
            }),
            ...Array(infantNum).fill({
              name: "유아",
              price: productData.priceKid,
              fuel: productData.fuelSurcharge,
            }),
          ] as { name: string; price: number; fuel: number }[]
        ).map(({ name, price, fuel }, i) => (
          <>
            <div
              className={`flex-center col-start-1 box-border  border py-[22px] `}
              style={{ gridRowStart: `${i + 2}` }}
            >
              <GridText text={name} medium />
            </div>
            <div
              className={`flex-center col-start-2 box-border  border py-[22px] `}
              style={{ gridRowStart: `${i + 2}` }}
            >
              <GridText text={`${price.toLocaleString()}원`} normal />
            </div>
            <div
              className={`flex-center col-start-3 box-border  border py-[22px] `}
              style={{ gridRowStart: `${i + 2}` }}
            >
              <GridText text={`${fuel.toLocaleString()}원`} normal />
            </div>
            <div
              className={`flex-center col-start-4 box-border  border py-[22px] `}
              style={{ gridRowStart: `${i + 2}` }}
            >
              <GridText text={`${(price + fuel).toLocaleString()}원`} bold />
            </div>
          </>
        ))}

        {/* */}
        {/* <div
          className={`flex-center col-start-1 row-start-2 box-border  border py-[22px] `}
        >
          <GridText text={"성인"} medium />
        </div>
        <div
          className={`flex-center col-start-1 row-start-3 box-border  border py-[22px] `}
        >
          <GridText text={"성인"} medium />
        </div>
        <div
          className={`flex-center col-start-1 row-start-4 box-border  border py-[22px] `}
        >
          <GridText text={"성인"} medium />
        </div> */}

        {/* */}

        {/* <div
          className={`flex-center col-start-2 row-start-2  box-border  border py-[22px] `}
        >
          <GridText text={"1,800,000원"} normal />
        </div>
        <div
          className={`flex-center col-start-3 row-start-2 box-border  border py-[22px] `}
        >
          <GridText text={"200,000원"} normal />
        </div>
        <div
          className={`flex-center col-start-4 row-start-2 box-border  border py-[22px] `}
        >
          <GridText text={"2,000,000원"} bold />
        </div>

        <div
          className={`flex-center col-start-2 row-start-3 box-border  border py-[22px] `}
        >
          <GridText text={"800,000원"} normal />
        </div>
        <div
          className={`flex-center col-start-3 row-start-3 box-border  border py-[22px] `}
        >
          <GridText text={"200,000원"} normal />
        </div>
        <div
          className={`flex-center col-start-4 row-start-3 box-border  border py-[22px] `}
        >
          <GridText text={"1,000,000원"} bold />
        </div>

        <div
          className={`flex-center col-start-2 row-start-4 box-border  border py-[22px] `}
        >
          <GridText text={"800,000원"} normal />
        </div>
        <div
          className={`flex-center col-start-3 row-start-4 box-border  border py-[22px] `}
        >
          <GridText text={"200,000원"} normal />
        </div>
        <div
          className={`flex-center col-start-4 row-start-4 box-border  border py-[22px] `}
        >
          <GridText text={"1,000,000원"} bold />
        </div> */}
      </div>
    );

  return (
    <div className={`grid grid-cols-3 grid-rows-4`}>
      <div
        className={`flex-center col-start-1 row-start-1 box-border border bg-[#efefef] py-[22px] `}
      >
        <GridText text={"상품 금액"} bold />
      </div>
      <div
        className={`flex-center col-start-2  row-start-1 box-border border bg-[#efefef] py-[22px] `}
      >
        <GridText text={"기본상품가"} bold />
      </div>

      <div
        className={`flex-center col-start-3 row-start-1 box-border border bg-[#efefef] py-[22px] `}
      >
        <GridText text={"총 상품금액"} bold />
      </div>

      {/* */}
      <div
        className={`flex-center col-start-1 row-start-2 box-border  border py-[22px] `}
      >
        <GridText text={"성인"} medium />
      </div>
      <div
        className={`flex-center col-start-1 row-start-3 box-border  border py-[22px] `}
      >
        <GridText text={"아동"} medium />
      </div>
      <div
        className={`flex-center col-start-1 row-start-4 box-border  border py-[22px] `}
      >
        <GridText text={"유아"} medium />
      </div>

      {/* */}

      <div
        className={`flex-center col-start-2 row-start-2 box-border  border py-[22px] `}
      >
        <GridText text={"1,800,000원"} normal />
      </div>

      <div
        className={`flex-center col-start-3 row-start-2 box-border  border py-[22px] `}
      >
        <GridText text={"2,000,000원"} bold />
      </div>

      <div
        className={`flex-center col-start-2 row-start-3 box-border  border py-[22px] `}
      >
        <GridText text={"800,000원"} normal />
      </div>

      <div
        className={`flex-center col-start-3 row-start-3 box-border  border py-[22px] `}
      >
        <GridText text={"1,000,000원"} bold />
      </div>

      <div
        className={`flex-center col-start-2 row-start-4 box-border  border py-[22px] `}
      >
        <GridText text={"800,000원"} normal />
      </div>

      <div
        className={`flex-center col-start-3 row-start-4 box-border  border py-[22px] `}
      >
        <GridText text={"1,000,000원"} bold />
      </div>
    </div>
  );
};

Grid.defaultProps = {};

export default Grid;
