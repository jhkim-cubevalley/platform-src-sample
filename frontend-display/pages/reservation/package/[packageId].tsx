import React, { useContext, useEffect, useState } from "react";
import { Label, Modal, Spinner } from "reactstrap";
import H_Separator from "../../../components/H_Separator";
import { MyButton } from "../../../components/SmallButton";
import MyInput from "../../../components/u11/MyInput";
import PersonPlus from "../../../public/images/person-plus.svg";
import PersonPlusMobile from "../../../public/images/person-plus-mobile.svg";
import ArrowLeftSvg from "../../../public/images/arrow-left.svg";
import PassportModal from "../../../components/u11/PassportModal";
import CouponModal from "../../../components/u11/CouponModal";
import ProgressBar from "../../../components/u11/ProgressBar";
import ProductInfo from "../../../components/u11/ProductInfo";
import BookerInfo from "../../../components/u11/BookerInfo";
import ExpenseInfo from "../../../components/u11/ExpenseInfo";
import TermsInfo from "../../../components/u11/TermsInfo";
import StickyMenu from "../../../components/u11/StickyMenu";
import { useRouter } from "next/router";
import { UserContext } from "../../../contexts/UserStore";
import MobileBottomBar from "../../../components/MobileBottomBar";
import {
  eachFlightI,
  eachProductI,
  useProductDetail2,
} from "../../../utils/api/product";
import useSWR from "swr";
import { secondArgsFetcher } from "../../../utils/api";
import {
  eachEventI,
  getEachEventAPI,
  getOverrideEventData,
} from "../../../utils/api/event";
import { dateToString, formatDate } from "../../../utils/formatDate";
import { addDate } from "../../../components/productsPage/FlightBookMenu";
import { computeFlightInfo, flightToInfo } from "../../product/[productid]";
import { useForm, UseFormReturn } from "react-hook-form";
import usePopup from "../../../components/usePopup";
import { useEachTosAPI } from "../../../utils/api/tos";
import { makeReservationAPI } from "../../../utils/api/reservation";
import useLogin from "../../../utils/useLogin";

export const getEndDate = (startDate: string, addDay: number) => {
  const endDate = dateToString(addDate(new Date(startDate), addDay));
  return endDate;
};

export interface reservationInfoI {
  adultNum: number;
  childNum: number;
  infantNum: number;
  eventData: eachEventI;
  productData: eachProductI;
}

const PackageReservation = (props: any) => {
  const { loginData } = useLogin();
  const [isAllTermChecked, setIsAllTermChecked] = useState(false);
  const [isTerm1Checked, setIsTerm1Checked] = useState(false);
  const [isTerm2Checked, setIsTerm2Checked] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isMan, setIsMan] = useState(false);
  const [hasAccompany, setHasAccompany] = useState(false);
  const [accompanyCount, setAccompanyCount] = useState(1);
  const [accompanyArr, setAccompanyArr] = useState<Array<any>>([]);
  const [showPassPortModal, setShowPassPortModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [reservationResultInfo, setReservationResultInfo] = useState<null | {
    code: string;
    id: number;
  }>(null);
  const useFormReturn = useForm({
    defaultValues: {
      eventId: 0,
      referrer: "platform",
      booker: {
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
      },
      isBookerParticipate: true,
      people: [] as any[],
      agree: [],
      point: 0,
      price: 0,
    },
  });
  const [mobileStage, setMobileStage] = useState(1);
  const router = useRouter();
  const {
    adultNum: _adultNum,
    childNum: _childNum,
    infantNum: _infantNum,
    packageId,
    event,
  } = router.query as {
    adultNum: string;
    childNum: string;
    infantNum: string;
    packageId: string;
    event: string;
  };
  const adultNum = _adultNum ? parseInt(_adultNum) : 0;
  const childNum = _childNum ? parseInt(_childNum) : 0;
  const infantNum = _infantNum ? parseInt(_infantNum) : 0;
  console.log(router.query);
  //Form States//
  const { data: productData } = useProductDetail2(packageId as string, true);
  const { data: eventData } = useSWR(
    event !== null && ["event", event],
    secondArgsFetcher(getEachEventAPI)
  );
  //Form States//

  const toggleIsBooked = () => {
    setIsBooked((prev) => !prev);
  };

  const toggleShowPassPortModal = () => {
    setShowPassPortModal((prev) => !prev);
  };

  const toggleShowCouponModal = () => {
    setShowCouponModal((prev) => !prev);
  };

  const toggleCheckAllTerm = () => {
    if (isTerm1Checked && isTerm2Checked) {
      setIsTerm1Checked(false);
      setIsTerm2Checked(false);
    }
    setIsAllTermChecked((prev) => !prev);
  };

  const handleMobileBack = () => {
    if (mobileStage !== 1) {
      setMobileStage((prev) => prev - 1);
    } else if (mobileStage === 1) {
      router.back();
    }
  };

  const handleMobileNext = () => {
    if (mobileStage !== 5) {
      setMobileStage((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else if (mobileStage === 5) {
      return;
    }
  };

  const handleMobileBookEdit = () => {
    setIsBooked(false);
    setMobileStage(2);
    window.scrollTo(0, 0);
  };

  const handleMobileCancel = () => {
    router.back();
  };

  useEffect(() => {
    if (isAllTermChecked) {
      setIsTerm1Checked(true);
      setIsTerm2Checked(true);
    }
  }, [isAllTermChecked]);

  useEffect(() => {
    if (isTerm1Checked && isTerm2Checked) {
      setIsAllTermChecked(true);
    }
  }, [isTerm1Checked, isTerm2Checked]);

  useEffect(() => {
    let tempArr = Array(accompanyCount).fill(1);
    setAccompanyArr([...tempArr]);
  }, [accompanyCount]);

  useEffect(() => {
    if (!eventData?.result || !productData) return;
    const combinedData =
      eventData?.result && eventData.result.eventType
        ? { ...productData, ...getOverrideEventData(eventData.result) }
        : productData;
    console.log({ combinedData });
    const totalPrice =
      adultNum * combinedData.priceAdult +
      childNum * combinedData.priceTeen +
      infantNum * combinedData.priceKid +
      (adultNum + childNum + infantNum) * combinedData.fuelSurcharge;
    const peopleList = (
      [
        ...Array(adultNum)
          .fill(0)
          .map((_, i) => ({
            code: "adult",
            name: "성인",
            idx: i + 1,
          })),
        ...Array(childNum)
          .fill(0)
          .map((_, i) => ({
            code: "teen",
            name: "아동",
            idx: i + 1,
          })),
        ...Array(infantNum)
          .fill(0)
          .map((_, i) => ({
            code: "kid",
            name: "유아",
            idx: i + 1,
          })),
      ] as { code: string; name: string; idx: number }[]
    ).map(({ code, name, idx }) => ({
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
      type: code,
      showName: `${name} ${idx}`,
    }));
    useFormReturn.reset({
      eventId: parseInt(event),
      referrer: "platform",
      booker: {
        name: "",
        sex: "M",
        phone: "",
        birthday: "",
        email: loginData.login ? loginData.info.email : "",
        passport: {
          country: "대한민국",
          issue: "대한민국",
          passportNumber: "",
          passportExpire: "",
          firstName: "",
          lastName: "",
        },
      },
      isBookerParticipate: true,
      people: peopleList,
      point: 0,
      price: totalPrice,
      agree: [],
    });
  }, [router.query, eventData, productData]);

  useEffect(() => {
    if (!loginData.login) return;
    useFormReturn.setValue("booker.email", loginData.info.email);
  }, [loginData]);

  if (!eventData?.result || !productData) {
    return (
      <div className="flex-center h-screen">
        <Spinner />
      </div>
    );
  }

  const reservationHandler = () => {
    if (!loginData?.login) {
      alert("로그인이 필요합니다.");
      return;
    }
    const allChecked =
      useFormReturn.watch("agree").length === combinedData.tos.length;
    if (!allChecked) {
      alert("약관에 모두 동의해주세요.");
      return;
    }
    useFormReturn.handleSubmit(async (d) => {
      const validatedData = validateInfo(d as any);
      console.log(validatedData);
      console.log(JSON.stringify(validatedData));
      const data = await makeReservationAPI(validatedData);
      // const data = { result: { code: "123123123", id: 11 } };
      if (!("result" in data)) {
        alert(
          "message" in data ? data.message : data || "오류가 발생했습니다."
        );
        return;
      }
      toggleIsBooked();
      setMobileStage(5);
      setReservationResultInfo(data.result);
      window.scrollTo(0, 0);
    })();
  };

  const combinedData =
    eventData?.result && eventData.result.eventType
      ? { ...productData, ...getOverrideEventData(eventData.result) }
      : productData;
  console.log({ combinedData });
  const totalPrice =
    adultNum * combinedData.priceAdult +
    childNum * combinedData.priceTeen +
    infantNum * combinedData.priceKid +
    (adultNum + childNum + infantNum) * combinedData.fuelSurcharge;

  const startDate = eventData.result.startDate;
  const endDate = getEndDate(startDate, eventData.result.product.tripDate - 1);
  const reservationInfo: reservationInfoI = {
    adultNum,
    childNum,
    infantNum,
    eventData: eventData.result,
    productData,
  };
  // console.log(useFormReturn.watch("booker"));
  return (
    <div className=" box-border flex w-full flex-col items-center bg-[#fafafa] pt-[41px] lg:px-[300px] lg:py-[114px] lg:pb-[109px]">
      <div className="flex w-full max-w-[1320px] flex-col">
        {isBooked && (
          <>
            <div className="flex w-full flex-col px-[32px] lg:mb-[56px] lg:gap-0 lg:px-0">
              <div
                className="lg:hidden"
                onClick={() => {
                  // handleMobileBack();
                  // setIsBooked(false);
                  router.replace("/");
                }}
              >
                <ArrowLeft />
              </div>
              <div className="mt-[28px] mb-[25px] flex w-full items-center lg:m-0 lg:mb-0 lg:justify-center ">
                <h1 className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[23.87px] text-[#000000] lg:text-[40px] lg:font-semibold lg:leading-[47.7px] lg:text-[#171717] ">
                  예약이 접수되었습니다.
                </h1>
              </div>
            </div>

            <H_Separator mobileThick />

            <div>
              <div className="mt-[17px] px-[32px] lg:mt-[63px] lg:px-0">
                <ProgressBar />
              </div>

              <div className="relative mb-[30px] block w-full lg:hidden">
                <div className="mt-[16px]  block w-full lg:mt-[48px] lg:hidden">
                  <MyButton width="full" color="#00192f" igpadding>
                    <span className="mb-0 ml-[32px] font-['Pretendard'] font-semibold text-[#FFFFFF] lg:text-[28px] lg:leading-[33.4px] ">
                      예약 번호{" "}
                      {reservationResultInfo?.code
                        ? reservationResultInfo.code
                        : ""}
                    </span>
                  </MyButton>
                </div>
              </div>

              <div className="mt-[16px] mb-[56px] hidden lg:mt-[48px] lg:block">
                <MyButton width="full" color="#00192f" igpadding>
                  <span className="m-0 font-['Pretendard'] font-semibold text-[#FFFFFF] lg:text-[28px] lg:leading-[33.4px] ">
                    예약 번호{" "}
                    {reservationResultInfo?.code
                      ? reservationResultInfo.code
                      : ""}
                  </span>
                </MyButton>
              </div>
            </div>
          </>
        )}

        {!isBooked && (
          <>
            <div className="flex w-full flex-col gap-[28px] px-[32px] lg:flex-row  lg:items-center lg:justify-center lg:gap-0 lg:px-0">
              <div className="lg:hidden" onClick={handleMobileBack}>
                <ArrowLeft />
              </div>
              <h1 className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[23.87px] text-[#171717] lg:text-[40px] lg:font-semibold lg:leading-[47.7px] ">
                예약하기
              </h1>
            </div>
            <div className="flex-center my-[20px] w-full lg:my-[90px]">
              <H_Separator mobileThick />
            </div>
          </>
        )}
      </div>

      {/* Pc S*/}
      <div className="hidden lg:relative lg:flex lg:w-full lg:justify-center lg:gap-[57px]">
        {/* 예약메뉴  S*/}
        <div className="flex w-full flex-col lg:max-w-[843px]">
          {/* 상품정보 S*/}
          <ProductInfo
            type="package"
            info={reservationInfo}
            // adultPrice={combinedData.priceAdult}
            // childPrice={combinedData.priceTeen}
            // infantPrice={combinedData.priceKid}
            // totalPrice={totalPrice}
            // productName={combinedData.name}
            // productCode={eventData.result.code}
            // productLong={`${combinedData.tripNight}박 ${combinedData.tripDate}일`}
            // flightCompany={`${formatDate(startDate)} ~ ${formatDate(
            //   endDate || ""
            // )}`}
            // fuelSurcharge={combinedData.fuelSurcharge}
          />
          {/* 상품정보 E*/}

          <div className="my-[45px]">
            <H_Separator />
          </div>

          {/* 예약자 정보 S*/}
          <BookerInfo
            info={reservationInfo}
            useForm={useFormReturn}
            isBooked={isBooked}
          />
          {/* 예약자 정보 E*/}

          <div className="mt-[69px] mb-[54px] ">
            <H_Separator />
          </div>

          {/* 경비내역 S*/}
          <ExpenseInfo
            // toggleShowCouponModal={toggleShowCouponModal}
            // selectedCoupon={selectedCoupon}
            info={reservationInfo}
            type="package"
          />
          {/* 경비내역 E*/}

          <div className="mt-[19px] mb-[51px] lg:mt-[45px] lg:mb-[76px]">
            <H_Separator />
          </div>

          {/* 약관동의 S*/}
          {mobileStage !== 4 && (
            <TermsInfo useForm={useFormReturn} info={reservationInfo} idx={1} />
          )}
          {/* 약관동의 E*/}
        </div>
        {/* 예약메뉴  E*/}

        {/* sticky 메뉴 S*/}
        <StickyMenu
          isBooked={isBooked}
          onReservationClick={reservationHandler}
          info={reservationInfo}
        />
        {/* sticky 메뉴 E*/}
      </div>
      {/* Pc E*/}

      {/* mobile S */}
      <div className="flex w-full flex-col justify-center gap-[50px] px-[32px] pb-[100px] lg:hidden lg:px-0">
        {mobileStage === 1 && (
          <ProductInfo type="package" info={reservationInfo} />
        )}
        {mobileStage === 2 && (
          <BookerInfo
            info={reservationInfo}
            useForm={useFormReturn}
            isBooked={isBooked}
          />
        )}
        {mobileStage === 3 && (
          <ExpenseInfo
            // toggleShowCouponModal={toggleShowCouponModal}
            // selectedCoupon={selectedCoupon}
            info={reservationInfo}
            type="package"
          />
        )}
        {mobileStage === 4 && (
          <TermsInfo useForm={useFormReturn} info={reservationInfo} idx={2} />
        )}
        {mobileStage === 5 && (
          <>
            <ProductInfo type="package" info={reservationInfo} />
            <BookerInfo
              info={reservationInfo}
              useForm={useFormReturn}
              isBooked={isBooked}
            />
            <ExpenseInfo
              // toggleShowCouponModal={toggleShowCouponModal}
              // selectedCoupon={selectedCoupon}
              info={reservationInfo}
              type="package"
            />
          </>
        )}

        {mobileStage === 1 && (
          <div onClick={handleMobileNext}>
            <MyButton mobileNext />
          </div>
        )}
        {mobileStage === 2 && (
          <div onClick={handleMobileNext}>
            <MyButton mobileNext />
          </div>
        )}
        {mobileStage === 3 && (
          <div onClick={handleMobileNext}>
            <MyButton mobileNext />
          </div>
        )}
        {mobileStage === 4 && (
          <div
            onClick={() => {
              // setIsBooked(true);
              reservationHandler();
              // handleMobileNext();
            }}
          >
            <MyButton mobileBook />
          </div>
        )}

        {mobileStage === 5 && (
          <div className="flex-ic w-full justify-between gap-[11px]">
            {/* <div className="flex w-full" onClick={handleMobileBookEdit}>
              <MyButton mobileEdit />
            </div>
            <div className="flex w-full" onClick={handleMobileCancel}>
              <MyButton mobileCancel />
            </div> */}
          </div>
        )}
      </div>
      {/* mobile E */}

      {/* <Modal
        style={{ maxWidth: "930px" }}
        isOpen={showPassPortModal}
        toggle={toggleShowPassPortModal}
        centered
        fade={false}
      >
        <PassportModal toggle={toggleShowPassPortModal} />
      </Modal> */}

      <Modal
        style={{ maxWidth: "930px" }}
        isOpen={showCouponModal}
        toggle={toggleShowCouponModal}
        centered
        scrollable={true}
        fade={false}
      >
        <CouponModal
          toggle={toggleShowCouponModal}
          setSelectedCoupon={setSelectedCoupon}
        />
      </Modal>

      <MobileBottomBar />
    </div>
  );
};

const ArrowLeft = () => {
  return <ArrowLeftSvg />;
};

export const BigButton = (props: any) => {
  const { text, isOrange } = props;
  return (
    <div
      className={`flex-center box-border w-full cursor-pointer rounded-[10px] lg:h-[64px] ${
        isOrange ? "bg-[#ff5c00]" : "bg-[#000000]"
      }`}
    >
      <span
        className={`m-0 font-['Pretendard'] text-[22px] font-medium leading-[26px] ${
          isOrange ? "text-[#ffffff]" : "text-[#ffffff]"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export const SmallButton = (props: any) => {
  const { text, isOrange } = props;

  return (
    <div className=" flex cursor-pointer items-center justify-center rounded-[3.8px] bg-[#ff5c00] py-[6px] px-[7px] lg:py-[9px]  lg:px-[15px]">
      <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[9.16px] font-semibold leading-[11px] text-[#ffffff] lg:text-[18px] lg:leading-[21.5px]">
        {text}
        {">"}
      </span>
    </div>
  );
};

SmallButton.defaultProps = {
  isOrange: true,
};

export const Form = (props: {
  disabled?: boolean;
  useForm: UseFormReturn;
  inputName: string;
  disableEmail?: boolean;
}) => {
  const { disabled = false, useForm, inputName, disableEmail = false } = props;

  return (
    <form className="flex flex-col gap-[25px]">
      <div className="flex items-center ">
        <div className="flex w-[25%] items-center ">
          <FormLabel text="이름(한글)" />
        </div>
        <div className="flex w-[100%] items-center">
          <MyInput
            disabled={disabled}
            type="text"
            placeholder="이름을 입력해주세요"
            useForm={useForm}
            inputName={`${inputName}.name`}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-[25%] items-center ">
          <FormLabel text="생년월일" />
        </div>
        <div className="flex w-[100%] items-center">
          <MyInput
            disabled={disabled}
            type="date"
            useForm={useForm}
            inputName={`${inputName}.birthday`}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-[25%] items-center ">
          <FormLabel text="성별" />
        </div>
        <div className="flex w-[100%] items-center">
          <MyInput
            disabled={disabled}
            type="select"
            useForm={useForm}
            inputName={`${inputName}.sex`}
          >
            <option value="M">남자</option>
            <option value="F">여자</option>
          </MyInput>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-[25%] items-center ">
          <FormLabel text="연락처" />
        </div>
        <div className="flex w-[100%] items-center">
          <MyInput
            disabled={disabled}
            type="tel"
            placeholder="연락처를 입력해주세요"
            useForm={useForm}
            inputName={`${inputName}.phone`}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-[25%] items-center ">
          <FormLabel text="이메일" />
        </div>
        <div className="flex w-[100%] items-center">
          <MyInput
            disabled={disabled || disableEmail}
            type="email"
            placeholder="이메일을 입력해주세요"
            useForm={useForm}
            inputName={`${inputName}.email`}
          />
        </div>
      </div>
    </form>
  );
};

export const AccompanyForm = (props: {
  disabled?: boolean;
  useForm: UseFormReturn;
  inputName: string;
  topText?: string;
  showPassport?: boolean;
  onDelete?: () => void;
  disableEmail?: boolean;
}) => {
  const {
    disabled = false,
    useForm,
    inputName,
    topText = "동반 여행자 정보",
    showPassport = true,
    disableEmail = false,
    onDelete,
  } = props;
  const { openPopup, closePopup, component } = usePopup();
  return (
    <>
      <H_Separator />
      <div className="flex flex-col gap-[32px]">
        {component}
        <div className="flex-ic justify-between">
          <div className="flex-ic gap-[13.6px] lg:gap-[19px]">
            <h1 className="m-0 font-['Pretendard'] text-[12px] font-bold leading-[14.32px] text-[#00192f] lg:text-[25px] lg:leading-[29.83px] ">
              {topText}
            </h1>
            {showPassport && (
              <div
                className="flex-center"
                onClick={() => {
                  // console.log(openPopup);
                  openPopup(
                    <PassportModal
                      disabled={disabled}
                      firstValue={useForm.getValues(`${inputName}.passport`)}
                      callback={(data?: any) => {
                        if (data) {
                          useForm.setValue(`${inputName}.passport`, data);
                        }
                        closePopup();
                      }}
                    />
                  );
                }}
              >
                <SmallButton text="여권정보 입력" />
              </div>
            )}
          </div>
          {onDelete && (
            <div
              onClick={() => {
                onDelete();
              }}
              className="flex-center h-[21.2px] w-[41.11px] cursor-pointer rounded-[4.25px] border-[2px] border-[#00192f] lg:h-[41.67px] lg:w-[80.8px]"
            >
              <div className="hidden lg:block">삭제</div>
              <div className="block text-xs lg:hidden">삭제</div>
            </div>
          )}
        </div>
        <Form
          disabled={disabled}
          disableEmail={disableEmail}
          useForm={useForm}
          inputName={inputName}
        />
      </div>
    </>
  );
};

export const Title = (props: any) => {
  const { text } = props;

  return (
    <h1 className="m-0 font-['Pretendard'] text-[20px] font-bold leading-[18px] text-[#00192f] lg:text-[25px] lg:leading-[30px]">
      {text}
    </h1>
  );
};

export const FormLabel = (props: any) => {
  const { text } = props;
  return (
    <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[12px] font-medium leading-[14.3px] text-[#414141] lg:text-[24px] lg:leading-[28.6px]">
      {text}
    </span>
  );
};

export const RadioLabel = (props: any) => {
  const { text } = props;
  return (
    <span className="m-0 font-['Pretendard'] text-[24px] font-normal leading-[28.6px] text-[#7e7e7e]">
      {text}
    </span>
  );
};

export const Warning = (props: any) => {
  const { text } = props;
  return (
    <p className="m-0 font-['Pretendard'] text-[10px] font-normal leading-[14.75px] text-[#a9a9a9] lg:text-[20px] lg:leading-[29px]">
      {text}
    </p>
  );
};

export const SubTitle = (props: any) => {
  const { text } = props;
  return (
    <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[12px] font-medium leading-[14.3px] text-[#414141] lg:text-[24px] lg:leading-[28.6px]">
      {text}
    </span>
  );
};

export const Description = (props: any) => {
  const { text, normal, semibold, bold } = props;
  return (
    <span
      className={`whitespace-nowrap font-['Pretendard'] text-[11.8px] leading-[14px] text-[#7e7e7e] lg:text-[22px] lg:leading-[25.3px] ${
        bold ? "font-bold" : semibold ? "font-semibold" : "font-normal"
      } `}
    >
      {text}
    </span>
  );
};

export const TermText = (props: {
  label?: string | boolean;
  text?: string;
  htmlFor?: string;
}) => {
  const { label, text, htmlFor } = props;
  if (label) {
    return (
      <label
        className="m-0 font-['Pretendard'] text-[10.9px] font-semibold leading-[13px] text-[#7e7e7e] lg:text-[24px] lg:leading-[28.6px]"
        htmlFor={htmlFor}
      >
        {text}
      </label>
    );
  }

  return (
    <p
      className="m-0 font-['Pretendard'] text-[10.9px] font-normal leading-[15px] text-[#7e7e7e] lg:text-[24px] lg:leading-[33px]"
      dangerouslySetInnerHTML={{ __html: text || "" }}
    ></p>
  );
};

export const StickyTitle = (props: any) => {
  const { text } = props;
  return (
    <h1 className="m-0 font-['Pretendard'] text-[24px] font-bold leading-[28.6px] text-[#7e7e7e] ">
      {text}
    </h1>
  );
};

export const FlightInfo = (props: { info: eachFlightI[] }) => {
  const { info } = props;
  const flightInfo = computeFlightInfo(info);
  return (
    <>
      {/* PC  S*/}
      <div className="box-border hidden gap-[62px]  rounded-[10px] border-[2px] px-[35px] py-[26px] lg:flex ">
        <div className="flex w-2/4 flex-col">
          <div className="flex-ic gap-[25px]">
            <Description text="가는 일정" semibold />
            <Description
              text={[
                flightInfo.departure.flightName,
                ...flightInfo.layover.departure.map((t) => t?.flightName),
              ].join(" - ")}
              semibold
            />
          </div>
          <div className="flex-ic mt-[35px] gap-[25px] whitespace-nowrap ">
            <Description text="한국 출발" semibold />
            {/* <Description text="2022.01.27" normal /> */}
            <Description
              text={flightInfo.departure.arrivalTime.slice(0, 5)}
              normal
            />
          </div>
          {/* <div className="flex-ic mt-[22px] gap-[25px] whitespace-nowrap ">
            <Description text="현지 도착" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div> */}
        </div>
        <div className="flex w-2/4 flex-col">
          <div className="flex-ic gap-[25px] ">
            <Description text="오는 일정" semibold />
            <Description
              text={[
                flightInfo.arrival.flightName,
                ...flightInfo.layover.arrival.map((t) => t?.flightName),
              ].join(" - ")}
              semibold
            />
          </div>
          <div className="flex-ic mt-[35px] gap-[25px] whitespace-nowrap ">
            <Description text="현지 출발" semibold />
            {/* <Description text="2022.01.27" normal /> */}
            <Description
              text={flightInfo.arrival.arrivalTime.slice(0, 5)}
              normal
            />
          </div>
          {/* <div className="flex-ic mt-[22px] gap-[25px] whitespace-nowrap ">
            <Description text="현지 도착" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div> */}
        </div>
      </div>
      {/* PC  E*/}
      {/* 모바일 S*/}
      <div className="box-border flex flex-col gap-[8px] lg:hidden">
        <div className="flex w-full flex-col gap-[12px] rounded-[5.34px] border border-[#e7e7e7] px-[15px] py-[13px]">
          <div className="flex-ic gap-[13.24px]">
            <Description text="가는 일정" bold />
            <Description
              text={[
                flightInfo.departure.flightName,
                ...flightInfo.layover.departure.map((t) => t?.flightName),
              ].join(" - ")}
              bold
            />
          </div>
          <div className="flex-ic gap-[13.24px] whitespace-nowrap ">
            <Description text="한국 출발" semibold />
            {/* <Description text="2022.01.27" normal /> */}
            <Description
              text={flightInfo.departure.arrivalTime.slice(0, 5)}
              normal
            />
          </div>
          {/* <div className="flex-ic gap-[13.24px] whitespace-nowrap ">
            <Description text="현지 도착" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div> */}
        </div>
        <div className="flex w-full flex-col gap-[12px] rounded-[5.34px] border border-[#e7e7e7] px-[15px] py-[13px]">
          <div className="flex-ic gap-[13.24px]">
            <Description text="오는 일정" bold />
            <Description
              text={[
                flightInfo.arrival.flightName,
                ...flightInfo.layover.arrival.map((t) => t?.flightName),
              ].join(" - ")}
              bold
            />
          </div>
          <div className="flex-ic gap-[13.24px] whitespace-nowrap ">
            <Description text="현지 출발" semibold />
            {/* <Description text="2022.01.27" normal /> */}
            <Description
              text={flightInfo.arrival.arrivalTime.slice(0, 5)}
              normal
            />
          </div>
          {/* <div className="flex-ic gap-[13.24px] whitespace-nowrap ">
            <Description text="현지 도착" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div> */}
        </div>
      </div>
      {/* 모바일 E*/}
    </>
  );
};

export interface bookEachPersonInfoI {
  name: string;
  sex: string;
  phone: string;
  birthday: string;
  email: string;
  passport: {
    country: string;
    issue: string;
    passportNumber: string;
    passportExpire: string;
    firstName: string;
    lastName: string;
  };
}

export const validateInfo = (data: {
  eventId: number;
  referrer: string;
  booker: bookEachPersonInfoI;
  isBookerParticipate: boolean;
  people: (bookEachPersonInfoI & { type: string })[];
  point: number;
  price: number;
  agree: string[];
}) => {
  const {
    eventId,
    referrer,
    booker,
    isBookerParticipate,
    people,
    point,
    price,
    agree,
  } = data;
  return {
    eventId: eventId,
    referrer: referrer,
    bookerName: booker.name,
    bookerBirthday: booker.birthday,
    bookerSex: booker.sex,
    bookerPhone: booker.phone,
    bookerEmail: booker.email,
    people: [
      ...(isBookerParticipate ? [booker] : []),
      ...people.slice(isBookerParticipate ? 1 : 0),
    ].map(
      (
        t: bookEachPersonInfoI | (bookEachPersonInfoI & { type: string }),
        i
      ) => {
        const { name, sex, phone, birthday, email, passport } = t;
        const type = "type" in t ? t.type : people[0].type;
        return {
          isMaster: i === 0 && isBookerParticipate,
          name,
          sex,
          phone: phone.replace(/[^0-9]/g, ""),
          birthday,
          email,
          type,
          passport: {
            birthday: birthday,
            country: passport.country,
            issue: passport.issue,
            passportNumber: passport.passportNumber,
            passportExpire: passport.passportExpire,
          },
        };
      }
    ),
    point: point,
    price: price,
  };
};

export default PackageReservation;
