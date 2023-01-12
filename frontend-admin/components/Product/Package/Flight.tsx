import { watch } from "fs";
import { useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { cls } from "../../../utils/cls";
import CustomInput from "../../CustomInput";
import CustomSelect from "../../CustomSelect";
import FullCard from "../../FullCard";
import { EmptyInput, NewLabelInput } from "../../LabelInput";
import MainTitle from "../../MainTitle";

const EachFlight = (props: {
  useForm: UseFormReturn;
  flightType: "arrival" | "departure";
  name: string;
  isLayover?: boolean;
}) => {
  const { useForm, flightType, isLayover = false, name } = props;
  const { register } = useForm;
  return (
    <>
      <div
        className={cls(
          "w-full grid grid-cols-3 py-8 px-8 rounded gap-y-4 gap-x-8",
          isLayover ? "bg-[#F2F2F2]" : ""
        )}
      >
        <div className=" col-start-1 row-start-1">
          <MainTitle>
            {isLayover
              ? "경유"
              : flightType === "arrival"
              ? "오는 날"
              : "가는 날"}{" "}
            항공편
          </MainTitle>
        </div>
        {!isLayover && (
          <EmptyInput labelName="경유횟수" isRequired gridCol={3} gridRow={1}>
            <CustomSelect
              value={useForm.watch(`flights.layover.${flightType}`).length}
              onChange={(e) =>
                useForm.setValue(
                  `flights.layover.${flightType}`,
                  Array(parseInt(e.target.value))
                    .fill(0)
                    .map(() => ({
                      flightType,
                      isLayover: true,
                      flightName: "",
                      company: "",
                      seatRank: "이코노미",
                      canChange: false,
                      departureTime: "",
                      arrivalTime: "",
                      moveTime: {
                        hour: 0,
                        minute: 0,
                      },
                    }))
                )
              }
            >
              <option value="0">없음</option>
              <option value="1">1회</option>
              <option value="2">2회</option>
              <option value="3">3회</option>
              <option value="4">4회</option>
              <option value="5">5회</option>
            </CustomSelect>
          </EmptyInput>
        )}
        <NewLabelInput
          labelName="항공편"
          inputName={`${name}.flightName`}
          useForm={useForm}
          isRequired
          gridRow={2}
          gridCol={1}
        />
        <NewLabelInput
          labelName="운영사"
          inputName={`${name}.company`}
          useForm={useForm}
          isRequired
          gridRow={2}
          gridCol={2}
        />
        <NewLabelInput
          labelName="출발시간"
          inputName={`${name}.departureTime`}
          useForm={useForm}
          isRequired
          gridRow={3}
          gridCol={1}
          type="time"
          step={30}
        />
        <NewLabelInput
          labelName="도착시간"
          inputName={`${name}.arrivalTime`}
          useForm={useForm}
          isRequired
          gridRow={3}
          gridCol={2}
          type="time"
          step="30"
        />
        <EmptyInput labelName="좌석등급" isRequired gridRow={2} gridCol={3}>
          <div className="flex justify-center items-center gap-4">
            <CustomSelect {...register(`${name}.seatRank`)}>
              <option value="이코노미">이코노미</option>
              <option value="비즈니스">비즈니스</option>
              <option value="일등석">일등석</option>
            </CustomSelect>
            <label className="flex justify-center items-center gap-2 shrink-0">
              <input type="checkbox" className="w-6 h-6" />
              변경가능여부
            </label>
          </div>
        </EmptyInput>
        <EmptyInput labelName="이동시간" isRequired gridRow={3} gridCol={3}>
          <div className="flex justify-center items-center gap-2">
            <CustomInput type="number" {...register(`${name}.moveTime.hour`)} />
            <span className="flex-shrink-0 mr-6">시간</span>
            <CustomInput
              type="number"
              {...register(`${name}.moveTime.minute`)}
            />
            <span>분</span>
          </div>
        </EmptyInput>
      </div>
    </>
  );
};

export const ProductPackageFlight = ({
  useForm,
}: {
  useForm: UseFormReturn;
}) => {
  const { control } = useForm;
  const departureLayoverArray = useFieldArray({
    control,
    name: "flights.layover.departure",
  });
  const arrivalLayoverArray = useFieldArray({
    control,
    name: "flights.layover.arrival",
  });
  return (
    <div className="w-full flex flex-col gap-4 items-start">
      <label className="flex justify-center items-center gap-4 text-[#FF5C00] text-xl font-bold">
        <input
          type="checkbox"
          className="w-6 h-6"
          {...useForm.register("flights.excluded")}
        />
        항공 미포함일 경우 체크해주세요!
      </label>
      <FullCard>
        {useForm.watch("flights.excluded") ? (
          <MainTitle>항공 미포함입니다.</MainTitle>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <EachFlight
              useForm={useForm}
              flightType="departure"
              name="flights.departure"
            />
            {departureLayoverArray.fields.map(({ id }, i) => (
              <EachFlight
                useForm={useForm}
                flightType="departure"
                name={`flights.layover.departure.${i}`}
                key={id}
                isLayover
              />
            ))}
            <div className="w-full h-[1px] bg-[#D9D9D9]" />
            <EachFlight
              useForm={useForm}
              flightType="arrival"
              name="flights.arrival"
            />
            {arrivalLayoverArray.fields.map(({ id }, i) => (
              <EachFlight
                useForm={useForm}
                flightType="arrival"
                name={`flights.layover.arrival.${i}`}
                key={id}
                isLayover
              />
            ))}
          </div>
        )}
      </FullCard>
    </div>
  );
};
