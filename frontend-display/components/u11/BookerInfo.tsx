import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  AccompanyForm,
  Description,
  Form,
  Warning,
  SmallButton,
  reservationInfoI,
} from "../../pages/reservation/package/[packageId]";
import { YesNoButton } from "../SmallButton";
import PersonPlus from "../../public/images/person-plus.svg";
import PersonPlusMobile from "../../public/images/person-plus-mobile.svg";

const BookerInfo = (props: {
  info: reservationInfoI;
  isBooked?: boolean;
  useForm: UseFormReturn<any>;
}) => {
  const {
    info: { adultNum, childNum, infantNum, eventData, productData },
    isBooked = false,
    useForm,
  } = props;
  const { watch, setValue, control } = useForm;
  const { fields, append, remove } = useFieldArray({
    name: "people",
    control: control,
  });

  return (
    <div className="flex flex-col gap-[27px] lg:gap-[55px]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[31px]">
          <span className="m-0 font-['Pretendard'] text-[15px] font-bold leading-[17.92px] text-[#00192f] lg:text-[25px]">
            예약자 정보
          </span>
          <Description
            bold
            text={`성인 ${adultNum}명 / 아동 ${childNum}명 / 유아 ${infantNum}명`}
          />
        </div>
        <div>
          <Warning text="고객정보는 신분증 및 여권상 표기된 생년월일/성별/영문이름과 같아야 합니다. (만약 여권과 다른 영문이름일 경우 비행기 탑승에 제한을 받을 수도 있습니다.)" />
        </div>
      </div>

      <AccompanyForm
        disabled={isBooked}
        inputName={`booker`}
        useForm={useForm}
        topText={
          watch("isBookerParticipate")
            ? `대표자 정보 (${watch("people.0.showName")})`
            : "대표자 정보"
        }
        disableEmail
        showPassport={watch("isBookerParticipate")}
      />

      {/* <div className="flex flex-col gap-[32px]">
        <div className="flex-ic gap-[22px]">
          <span className="m-0 font-['Pretendard'] text-[12px] font-bold leading-[14.32px] text-[#00192f] lg:text-[25px]">
            대표자 정보
          </span>
          <SmallButton text="여권정보 입력" />
        </div>
        <Form disabled={isBooked} useForm={useForm} inputName={"booker"} />
      </div> */}

      <div className="flex-ic w-full  justify-between rounded-[10px] border-[2px] border-[#c1c1c1] px-[20px] py-[9.5px] lg:px-[40px] lg:py-[35px]">
        <div>
          <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[12.2px] font-bold leading-[14.5px] text-[#7e7e7e] lg:text-[24px] lg:leading-[28.6px] ">
            고객님도 여행에 참여하시나요?
          </span>
        </div>
        <div className="flex-ic gap-[9.9px] lg:gap-[15px] ">
          <div
            onClick={() => {
              !isBooked && setValue("isBookerParticipate", true);
            }}
          >
            <YesNoButton isYes active={watch("isBookerParticipate")} />
          </div>
          <div
            onClick={() => !isBooked && setValue("isBookerParticipate", false)}
          >
            <YesNoButton active={!watch("isBookerParticipate")} />
          </div>
        </div>
      </div>
      {fields.map((t, i) =>
        watch("isBookerParticipate") && i == 0 ? (
          <></>
        ) : (
          <AccompanyForm
            disabled={isBooked}
            key={t.id}
            inputName={`people.${i}`}
            topText={`동반 여행자 정보 (${(t as any).showName})`}
            useForm={useForm}
          />
        )
      )}

      <div className="hidden w-full items-center justify-center">
        <div
          onClick={() => {
            append({
              name: "",
              sex: "M",
              phone: "",
              birthday: "",
              email: "",
              passport: {
                country: "대한민국",
                issue: "대한민국",
                passportNumber: "",
                passportExpire: "",
                firstName: "",
                lastName: "",
              },
            });
          }}
          className="flex-center h-[21.2px] w-[41.11px] cursor-pointer rounded-[4.25px] border-[2px] border-[#00192f] lg:h-[41.67px] lg:w-[80.8px]"
        >
          <div className="hidden lg:block">
            <PersonPlus />
          </div>
          <div className="block lg:hidden">
            <PersonPlusMobile />
          </div>
        </div>
      </div>

      {/* {hasAccompany &&
        accompanyArr.map((item: any, index: any) => (
          <AccompanyForm
            toggleShowPassPortModal={toggleShowPassPortModal}
            setAccompanyCount={setAccompanyCount}
            key={index}
            disabled={isBooked}
            setIsMan={setIsMan}
          />
        ))} */}
    </div>
  );
};

export default BookerInfo;
