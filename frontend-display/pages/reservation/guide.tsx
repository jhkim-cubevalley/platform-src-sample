import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import H_Separator from "../../components/H_Separator";
import { MyButton, YesNoButton } from "../../components/SmallButton";
import MyInput from "../../components/u11/MyInput";
import PersonPlus from "../../public/images/person-plus.svg";
import PersonPlusMobile from "../../public/images/person-plus-mobile.svg";
import ArrowLeftSvg from "../../public/images/arrow-left.svg";
import PassportModal from "../../components/u11/PassportModal";
import CouponModal from "../../components/u11/CouponModal";
import ProgressBar from "../../components/u11/ProgressBar";
import ProductInfo from "../../components/u11/ProductInfo";
import BookerInfo from "../../components/u11/BookerInfo";
import ExpenseInfo from "../../components/u11/ExpenseInfo";
import TermsInfo from "../../components/u11/TermsInfo";
import StickyMenu from "../../components/u11/StickyMenu";
import { useRouter } from "next/router";

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

export const Form = (props: any) => {
  const { disabled, isMan, setIsMan } = props;

  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex items-center ">
        <div className="flex w-[25%] items-center ">
          <FormLabel
            text="이름(한글)"
            placeholder="이름을 입력해주세요"
            type="text"
          />
        </div>
        <div className="flex w-[100%] items-center">
          {/* <MyInput
            disabled={disabled}
            type="text"
            placeholder="이름을 입력해주세요"
          /> */}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-[25%] items-center ">
          <FormLabel text="생년월일" />
        </div>
        <div className="flex w-[100%] items-center">
          {/* <MyInput disabled={disabled} type="date" /> */}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-[25%] items-center ">
          <FormLabel text="성별" />
        </div>
        <div className="flex-ic w-[100%] gap-[50px] ">
          <div className="lg:flex-ic hidden gap-[10px] ">
            <div onClick={() => setIsMan(true)}>
              {/* <MyInput disabled={disabled} type="radio" checked={isMan} /> */}
            </div>
            <RadioLabel text="남자" />
          </div>
          <div className="lg:flex-ic hidden gap-[10px]">
            <div onClick={() => setIsMan(false)}>
              {/* <MyInput disabled={disabled} type="radio" checked={!isMan} /> */}
            </div>
            <RadioLabel text="여자" />
          </div>
          <div className="flex-ic lg:hidden">
            <select className=" w-[89px] py-[7.7px] px-[18.2px] font-['Pretendard'] text-[12.2px] font-normal leading-[15px] text-[#7e7e7e] ">
              <option>남자</option>
              <option>여자</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-[25%] items-center ">
          <FormLabel text="연락처" />
        </div>
        <div className="flex w-[100%] items-center">
          {/* <MyInput
            disabled={disabled}
            type="text"
            placeholder="연락처를 입력해주세요"
          /> */}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex w-[25%] items-center ">
          <FormLabel text="이메일" />
        </div>
        <div className="flex w-[100%] items-center">
          {/* <MyInput
            disabled={disabled}
            type="email"
            placeholder="이메일을 입력해주세요"
          /> */}
        </div>
      </div>
    </div>
  );
};

export const AccompanyForm = (props: any) => {
  const { toggleShowPassPortModal, setAccompanyCount, disabled, setIsMan } =
    props;
  return (
    <>
      <H_Separator />
      <div className="flex flex-col gap-[32px]">
        <div className="flex-ic justify-between">
          <div className="flex-ic gap-[13.6px] lg:gap-[19px]">
            <h1 className="m-0 font-['Pretendard'] text-[12px] font-bold leading-[14.32px] text-[#00192f] lg:text-[25px] lg:leading-[29.83px] ">
              동반 여행자 정보
            </h1>
            <div
              className="flex-center"
              onClick={() => toggleShowPassPortModal()}
            >
              <SmallButton
                text="여권정보 입력"
                onClick={() => console.log("wow")}
              />
            </div>
          </div>
          <div
            onClick={() => setAccompanyCount((prev: any) => prev + 1)}
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
        <Form disabled={disabled} setIsMan={setIsMan} />
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

export const TermText = (props: any) => {
  const { text, label, htmlFor } = props;

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
    <p className="m-0 font-['Pretendard'] text-[10.9px] font-normal leading-[15px] text-[#7e7e7e] lg:text-[24px] lg:leading-[33px]">
      {text}
    </p>
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

export const FlightInfo = (props: any) => {
  return (
    <>
      {/* PC  S*/}
      <div className="box-border hidden gap-[62px]  rounded-[10px] border-[2px] px-[35px] py-[26px] lg:flex ">
        <div className="flex w-2/4 flex-col">
          <div className="flex-ic gap-[25px]">
            <Description text="가는 일정" semibold />
            <Description text="KE101" semibold />
          </div>
          <div className="flex-ic mt-[35px] gap-[25px] whitespace-nowrap ">
            <Description text="한국 출발" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div>
          <div className="flex-ic mt-[22px] gap-[25px] whitespace-nowrap ">
            <Description text="현지 도착" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div>
        </div>
        <div className="flex w-2/4 flex-col">
          <div className="flex-ic gap-[25px] ">
            <Description text="오는 일정" semibold />
            <Description text="KE101" semibold />
          </div>
          <div className="flex-ic mt-[35px] gap-[25px] whitespace-nowrap ">
            <Description text="한국 출발" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div>
          <div className="flex-ic mt-[22px] gap-[25px] whitespace-nowrap ">
            <Description text="현지 도착" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div>
        </div>
      </div>
      {/* PC  E*/}
      {/* 모바일 S*/}
      <div className="box-border flex flex-col gap-[8px] lg:hidden">
        <div className="flex w-full flex-col gap-[12px] rounded-[5.34px] border border-[#e7e7e7] px-[15px] py-[13px]">
          <div className="flex-ic gap-[13.24px]">
            <Description text="가는 일정" bold />
            <Description text="KE101" bold />
          </div>
          <div className="flex-ic gap-[13.24px] whitespace-nowrap ">
            <Description text="한국 출발" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div>
          <div className="flex-ic gap-[13.24px] whitespace-nowrap ">
            <Description text="현지 도착" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div>
        </div>
        <div className="flex w-full flex-col gap-[12px] rounded-[5.34px] border border-[#e7e7e7] px-[15px] py-[13px]">
          <div className="flex-ic gap-[13.24px]">
            <Description text="오는 일정" bold />
            <Description text="KE101" bold />
          </div>
          <div className="flex-ic gap-[13.24px] whitespace-nowrap ">
            <Description text="한국 출발" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div>
          <div className="flex-ic gap-[13.24px] whitespace-nowrap ">
            <Description text="현지 도착" semibold />
            <Description text="2022.01.27" normal />
            <Description text="10:00" normal />
          </div>
        </div>
      </div>
      {/* 모바일 E*/}
    </>
  );
};

const GuideTour = (props: any) => {
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

  const [mobileStage, setMobileStage] = useState(1);

  const router = useRouter();

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
    router.push("/products");
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
  return <></>;

  const a = ` return (
    <div className=" box-border flex w-full flex-col items-center bg-[#fafafa] pt-[41px] lg:px-[300px] lg:py-[114px] lg:pb-[109px]">
      <div className="flex w-full max-w-[1320px] flex-col">
        {isBooked && (
          <>
            <div className="flex w-full flex-col px-[32px] lg:mb-[56px] lg:gap-0 lg:px-0">
              <div
                className="lg:hidden"
                onClick={() => {
                  handleMobileBack();
                  setIsBooked(false);
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
                <div className="mt-[16px] block w-full lg:mt-[48px] lg:hidden">
                  <MyButton width="full" color="#00192f" igpadding>
                    <span className="mb-0 ml-[32px] font-['Pretendard'] font-semibold text-[#FFFFFF] lg:text-[28px] lg:leading-[33.4px] ">
                      예약 번호 000000-000000
                    </span>
                  </MyButton>
                </div>
              </div>

              <div className="mt-[16px] mb-[56px] hidden lg:mt-[48px] lg:block">
                <MyButton width="full" color="#00192f" igpadding>
                  <span className="m-0 font-['Pretendard'] font-semibold text-[#FFFFFF] lg:text-[28px] lg:leading-[33.4px] ">
                    예약 번호 000000-000000
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
          <ProductInfo />
          {/* 상품정보 E*/}

          <div className="my-[45px]">
            <H_Separator />
          </div>

          {/* 예약자 정보 S*/}
          <BookerInfo
            isMan={isMan}
            setIsMan={setIsMan}
            isBooked={isBooked}
            hasAccompany={hasAccompany}
            setHasAccompany={setHasAccompany}
            accompanyArr={accompanyArr}
            toggleShowPassPortModal={toggleShowPassPortModal}
            setAccompanyCount={setAccompanyCount}
          />
          {/* 예약자 정보 E*/}

          <div className="mt-[69px] mb-[54px] ">
            <H_Separator />
          </div>

          {/* 경비내역 S*/}
          <ExpenseInfo
            toggleShowCouponModal={toggleShowCouponModal}
            selectedCoupon={selectedCoupon}
            type="guide"
          />
          {/* 경비내역 E*/}

          <div className="mt-[19px] mb-[51px] lg:mt-[45px] lg:mb-[76px]">
            <H_Separator />
          </div>

          {/* 약관동의 S*/}
          <TermsInfo
            toggleCheckAllTerm={toggleCheckAllTerm}
            isAllTermChecked={isAllTermChecked}
            isTerm1Checked={isTerm1Checked}
            setIsTerm1Checked={setIsTerm1Checked}
            isTerm2Checked={isTerm2Checked}
            setIsTerm2Checked={setIsTerm2Checked}
          />
          {/* 약관동의 E*/}
        </div>
        {/* 예약메뉴  E*/}

        {/* sticky 메뉴 S*/}
        <StickyMenu isBooked={isBooked} toggleIsBooked={toggleIsBooked} />
        {/* sticky 메뉴 E*/}
      </div>
      {/* Pc E*/}

      {/* mobile S */}

      <div className="flex w-full flex-col justify-center gap-[50px] px-[32px] pb-[100px] lg:hidden lg:px-0">
        {mobileStage === 1 && <ProductInfo />}
        {mobileStage === 2 && (
          <BookerInfo
            isMan={isMan}
            setIsMan={setIsMan}
            isBooked={isBooked}
            hasAccompany={hasAccompany}
            setHasAccompany={setHasAccompany}
            accompanyArr={accompanyArr}
            toggleShowPassPortModal={toggleShowPassPortModal}
            setAccompanyCount={setAccompanyCount}
          />
        )}
        {mobileStage === 3 && (
          <ExpenseInfo
            toggleShowCouponModal={toggleShowCouponModal}
            selectedCoupon={selectedCoupon}
          />
        )}
        {mobileStage === 4 && (
          <TermsInfo
            toggleCheckAllTerm={toggleCheckAllTerm}
            isAllTermChecked={isAllTermChecked}
            isTerm1Checked={isTerm1Checked}
            setIsTerm1Checked={setIsTerm1Checked}
            isTerm2Checked={isTerm2Checked}
            setIsTerm2Checked={setIsTerm2Checked}
          />
        )}
        {mobileStage === 5 && (
          <>
            <ProductInfo />
            <BookerInfo
              isMan={isMan}
              setIsMan={setIsMan}
              isBooked={isBooked}
              hasAccompany={hasAccompany}
              setHasAccompany={setHasAccompany}
              accompanyArr={accompanyArr}
              toggleShowPassPortModal={toggleShowPassPortModal}
              setAccompanyCount={setAccompanyCount}
            />
            <ExpenseInfo
              toggleShowCouponModal={toggleShowCouponModal}
              selectedCoupon={selectedCoupon}
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
              setIsBooked(true);
              handleMobileNext();
            }}
          >
            <MyButton mobileBook />
          </div>
        )}

        {mobileStage === 5 && (
          <div className="flex-ic w-full justify-between gap-[11px]">
            <div className="flex w-full" onClick={handleMobileBookEdit}>
              <MyButton mobileEdit />
            </div>
            <div className="flex w-full" onClick={handleMobileCancel}>
              <MyButton mobileCancel />
            </div>
          </div>
        )}
      </div>
      {/* mobile E */}

      <Modal
        style={{ maxWidth: "930px" }}
        isOpen={showPassPortModal}
        toggle={toggleShowPassPortModal}
        centered
        fade={false}
      >
        <PassportModal toggle={toggleShowPassPortModal} />
      </Modal>

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
    </div>
  );`;
};

export default GuideTour;
