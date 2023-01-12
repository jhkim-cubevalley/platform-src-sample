import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { secondArgsFetcher } from "../../../utils/api";
import {
  createEventI,
  createEventTypeAPI,
  eventNameList,
  getEventTypeListAPI,
} from "../../../utils/api/event";
import {
  createProductAPI,
  getEachProductAPI,
  patchProductAPI,
  useProductDetail,
} from "../../../utils/api/product";
import { cls } from "../../../utils/cls";
import { openGlobalTextPopup } from "../../../utils/globalPopup";
import { loginType, useLoginCheck } from "../../../utils/useLogin";
import ButtonLine from "../../ButtonLine";
import GapMaker from "../../GapMaker";
import LeftRight from "../../LeftRight";
import MainButton from "../../MainButton";
import { MainContainer } from "../../MainContainer";
import MainTitle from "../../MainTitle";
import { editGetData } from "./data/editGetData";
import { validate, validateEventType } from "./data/validate";
import { ProductPacakgeDetail } from "./Detail";
import { ProductPackageEventInfo } from "./EventInfo";
import { ProductPackageFlight } from "./Flight";
import { ProductPackageInfo } from "./Info";
import { ProductPackageNote } from "./Note";
import { ProductPacakgeSchedule } from "./Schedule";
import { ProductPacakgeTerms } from "./Terms";
import { ProductPackageWarning } from "./Warning";

export const steps = [
  {
    name: "기본정보",
    component: ProductPackageEventInfo,
  },
  {
    name: "항공편",
    component: ProductPackageFlight,
  },
  {
    name: "상세일정",
    component: ProductPacakgeSchedule,
  },
];

export const ProductPacakgeEventIndex = (props: {
  type: loginType;
  id: number;
}) => {
  const { type, id } = props;
  const isNew = id === null;
  const loginCheck = useLoginCheck();
  const { data, mutate } = useProductDetail(id, true);
  const { data: typeData } = useSWR(
    loginCheck(["/product/event/type", id]),
    secondArgsFetcher(getEventTypeListAPI)
  );
  const nowType = typeData?.result
    ? eventNameList.filter(
        (t) => typeData.result.findIndex((d) => d.type === t) < 0
      )[0]
    : "-";
  const { replace } = useRouter();
  const [Step, setStep] = useState(0);
  const [Data, setData] = useState<any>({
    productId: id,
    type: nowType,
    description: "",
    fuelSurcharge: 0,
    priceAdult: 0,
    priceTeen: 0,
    priceKid: 0,
    dateFrom: "",
    tripNight: 0,
    tripDate: 0,
    dateTo: "",
    departurePeriod: [],
    plans: [],
    flights: {
      excluded: false,
      arrival: {
        flightType: "arrival",
        isLayover: false,
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
      },
      departure: {
        flightType: "departure",
        isLayover: false,
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
      },
      layover: {
        arrival: [],
        departure: [],
      },
    },
  });
  const useFormList = [useForm(), useForm(), useForm()];
  const doSave = (idx: number) => {
    useFormList[idx].handleSubmit(
      (data) => {
        // console.log({ idx, data });
        setData((d: any) => ({ ...d, ...data }));
      },
      (e) => console.log(e)
    )();
  };
  const saveCallback = (idx: number, callback: (data: any) => void) => {
    useFormList[idx].handleSubmit(
      (data) => {
        // console.log({ idx, data });
        setData((d: any) => {
          callback({ ...d, ...data });
          return { ...d, ...data };
        });
      },
      (e) => console.log(e)
    )();
  };
  useEffect(() => {
    console.log({ raw: Data, validate: validateEventType(Data) });
    // console.log(Data);
    useFormList.map(({ reset }) => reset(Data));
  }, [Data]);
  useEffect(() => {
    if (data) {
      const d = editGetData(data);
      setData({
        productId: id,
        type: nowType,
        description: "",
        fuelSurcharge: d.fuelSurcharge,
        priceAdult: d.priceAdult,
        priceTeen: d.priceAdult,
        priceKid: d.priceKid,
        dateFrom: d.dateFrom,
        dateTo: d.dateTo,
        departurePeriod: d.departurePeriod,
        plans: d.plans,
        flights: d.flights,
        tripNight: d.tripNight,
        tripDate: d.tripDate,
      });
    }
  }, [data]);
  useEffect(() => {
    setData((t: any) => ({ ...t, type: nowType }));
  }, [nowType]);
  const save = (isTemp?: boolean) => {
    saveCallback(Step, async (d) => {
      const data = validateEventType(d);
      console.log(JSON.stringify(data));
      const res = await createEventTypeAPI(data);
      console.log(res);
      if (res) {
        openGlobalTextPopup("저장이 완료되었습니다.");
        replace(`/${type}/product/package/${id}/event`);
      }
    });
  };

  const goNext = () => {
    setStep((t) => {
      doSave(t);
      const next = t + 1;
      if (next >= steps.length) return t;
      return next;
    });
  };
  const goStep = (target: number) => {
    setStep((t) => {
      doSave(t);
      return target;
    });
  };
  const TargetComponent = steps[Step].component;
  return (
    <MainContainer type={type}>
      <LeftRight>
        <MainTitle>새로운 행사 타입 만들기</MainTitle>
        <ButtonLine>
          <MainButton styleType="gray" onClick={() => save(true)}>
            저장하기
          </MainButton>
          {Step !== steps.length - 1 && (
            <MainButton styleType="black" onClick={goNext}>
              다음
            </MainButton>
          )}
        </ButtonLine>
      </LeftRight>
      <div className="w-full flex justify-start items-center gap-6 mt-10 mb-8">
        {steps.map(({ name }, i) => (
          <button
            type="button"
            onClick={() => goStep(i)}
            key={i}
            className="flex justify-center items-center gap-3"
          >
            <div
              className={cls(
                "w-10 h-10 rounded-full text-lg flex justify-center items-center",
                Step === i
                  ? "bg-[#FF5C00] text-white"
                  : "bg-[#D9D9D9] text-[#333333]"
              )}
            >
              {i + 1}
            </div>
            <div>{name}</div>
          </button>
        ))}
      </div>
      <div className="w-full flex justify-start">
        <div className="text-xl bg-white px-8 py-2 border border-[#D7D7D7] mb-8 font-bold">
          타입 {nowType}
        </div>
      </div>
      <TargetComponent useForm={useFormList[Step]} data={Data} />
      <GapMaker height={32} />
      <LeftRight>
        <MainTitle></MainTitle>
        <ButtonLine>
          <MainButton styleType="gray" onClick={() => save(true)}>
            저장하기
          </MainButton>
          {Step !== steps.length - 1 && (
            <MainButton styleType="black" onClick={goNext}>
              다음
            </MainButton>
          )}
        </ButtonLine>
      </LeftRight>
    </MainContainer>
  );
};
