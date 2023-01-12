import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  reservationInfoI,
  TermText,
  Title,
} from "../../pages/reservation/package/[packageId]";
import { useEachTosAPI } from "../../utils/api/tos";
import { SingleAccordion } from "../Accordion";
import H_Separator from "../H_Separator";
import MyInput from "./MyInput";

const EachTerm = (props: {
  id: string | number;
  useForm: UseFormReturn<any>;
  idx: string | number;
}) => {
  const { id, useForm, idx } = props;
  const { data } = useEachTosAPI(`${id}`);
  return (
    <SingleAccordion headerTitle={data?.name} headerSize="lg" column>
      <H_Separator />
      <div className="box-border flex flex-col gap-[20px] p-[17px] lg:gap-[45px] lg:p-[35px]">
        <TermText text={data?.content} />
        <div className="flex-ic gap-[16px]">
          <input
            type="checkbox"
            value={id}
            id={`${id}${idx}`}
            {...useForm.register("agree")}
            className="h-3 w-3 accent-[#7e7e7e] lg:h-7 lg:w-7"
          />
          <TermText label text="약관에 동의합니다." htmlFor={`${id}${idx}`} />
        </div>
      </div>
    </SingleAccordion>
  );
};

const TermsInfo = (props: {
  info: reservationInfoI;
  useForm: UseFormReturn<any>;
  idx: string | number;
}) => {
  const {
    info: { eventData, productData },
    useForm,
    idx,
  } = props;
  const { watch, setValue, register } = useForm;
  const tosList = productData.tos.map((t) => t.tos);
  console.log(watch("agree"));
  return (
    <div className="flex flex-col gap-[23px] lg:gap-[47px]">
      <div className="flex items-center">
        <Title text="약관동의" size={15} />
        <div className="flex-center ml-[12px]">
          <div className="flex-center flex h-3 w-3 overflow-hidden rounded-full lg:h-7 lg:w-7">
            <input
              type={"checkbox"}
              className="h-7 w-7 accent-[#00192f]"
              id={`check-all-booking-terms${idx}`}
              checked={watch("agree").length === tosList.length}
              onChange={(e) => {
                if (e.target.checked === true)
                  setValue(
                    "agree",
                    tosList.map((t) => t.id)
                  );
                else setValue("agree", []);
              }}
            />
          </div>
        </div>
        <label
          htmlFor={`check-all-booking-terms${idx}`}
          className="ml-[23px] font-['Pretendard'] text-[10px] font-semibold leading-[11.9px] text-[#7e7e7e] lg:text-[22px] lg:leading-[26.3px]"
        >
          <span className="m-0">모든 약관에 동의합니다.</span>
        </label>
      </div>

      {/* Accordion S*/}
      <div className="flex flex-col gap-[14px] lg:gap-[33px]">
        {tosList.map((t, i) => (
          <div
            className="flex rounded-[10px] border-[0.9px] border-[#c1c1c1] bg-[#ffffff] lg:border-[2px]"
            key={i}
          >
            <EachTerm useForm={useForm} id={t.id} idx={idx} />
          </div>
        ))}

        {/* <div className="flex rounded-[10px] border-[0.9px] border-[#c1c1c1] bg-[#ffffff] lg:border-[2px]">
          <SingleAccordion headerTitle="약관제목2" headerSize="lg" column>
            <H_Separator />
            <div className="box-border flex flex-col gap-[20px] p-[17px] lg:gap-[45px] lg:p-[35px]">
              <TermText text="약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다.약관 내용입니다." />
              <div className="flex-ic gap-[16px]">
                <MyInput
                  type="checkbox"
                  labelId="book-term2"
                  checked={isTerm2Checked}
                  onChange={() => setIsTerm2Checked((prev: any) => !prev)}
                />
                <TermText
                  label
                  text="약관에 동의합니다."
                  htmlFor="book-term2"
                />
              </div>
            </div>
          </SingleAccordion>
        </div> */}
      </div>
      {/* Accordion E*/}
    </div>
  );
};

export default TermsInfo;
