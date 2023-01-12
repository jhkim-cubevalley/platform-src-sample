import { PropsWithChildren } from "react";
import { useLoginCheck } from "../utils/useLogin";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import MainTitle from "./MainTitle";
import usePopup from "./usePopup";
import useIconPopup, { openIconPopupType } from "../utils/useIconPopup";
import LeftRight from "./LeftRight";
import RoundMiniBanner from "./RoundMiniBanner";
import ButtonLine from "./ButtonLine";
import LittleButton from "./LittleButton";
import GapMaker from "./GapMaker";
import { eachTosI } from "../utils/api/tos";

interface TermsProps {
  term: eachTosI;
  className?: string;
}

export const rightArrowSvg = (
  <svg
    width="39"
    height="16"
    viewBox="0 0 39 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className=" group-hover:fill-white"
      d="M38.7071 8.70711C39.0976 8.31659 39.0976 7.68342 38.7071 7.2929L32.3431 0.928935C31.9526 0.538411 31.3195 0.538411 30.9289 0.928935C30.5384 1.31946 30.5384 1.95262 30.9289 2.34315L36.5858 8L30.9289 13.6569C30.5384 14.0474 30.5384 14.6805 30.9289 15.0711C31.3195 15.4616 31.9526 15.4616 32.3431 15.0711L38.7071 8.70711ZM-8.74227e-08 9L38 9L38 7L8.74227e-08 7L-8.74227e-08 9Z"
      fill="#909090"
    />
  </svg>
);
export const rightWhiteArrowSvg = (
  <svg
    width="39"
    height="16"
    viewBox="0 0 39 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M38.7071 8.70711C39.0976 8.31659 39.0976 7.68342 38.7071 7.2929L32.3431 0.928935C31.9526 0.538411 31.3195 0.538411 30.9289 0.928935C30.5384 1.31946 30.5384 1.95262 30.9289 2.34315L36.5858 8L30.9289 13.6569C30.5384 14.0474 30.5384 14.6805 30.9289 15.0711C31.3195 15.4616 31.9526 15.4616 32.3431 15.0711L38.7071 8.70711ZM-8.74227e-08 9L38 9L38 7L8.74227e-08 7L-8.74227e-08 9Z"
      fill="#909090"
    />
  </svg>
);

export const TermsBox = (props: PropsWithChildren<TermsProps>) => {
  const { term, children, className = "" } = props;
  const useFormReturn = useForm();
  const { register, handleSubmit } = useFormReturn;
  const loginCheck = useLoginCheck();
  const router = useRouter();
  const { query } = router;

  const { component, openPopup, closePopup } = usePopup();
  const {
    component: bigComponent,
    openPopup: openBigPopup,
    closePopup: closeBigPopup,
  } = usePopup();
  const {
    openPopup: openIconPopup,
    closePopup: closeIconPopup,
    component: iconComponent,
  } = useIconPopup();
  return (
    <div
      className="group flex w-full cursor-pointer rounded-[7px]  p-8 shadow-[0_1px_4px_rgba(0,0,0,0.25)] hover:bg-[#FF5C00] hover:text-white  group-hover:text-white lg:h-[252px] lg:w-[380px]
     lg:flex-col lg:items-stretch lg:justify-between lg:p-10"
      onClick={() => {
        openPopup(
          <TermsContainer
            type="editDefault"
            closePopup={closePopup}
            openIconPopup={openIconPopup}
            term={term}
          />
        );
      }}
    >
      {component}
      {iconComponent}
      {bigComponent}
      <div className="w-full text-lg font-bold text-[#FF5C00] group-hover:text-white lg:mb-4 lg:flex lg:w-full lg:flex-col lg:gap-1 lg:p-5 lg:text-xl lg:text-[24px] ">
        {term.name}
      </div>
      <div className="flex w-fit items-center justify-between lg:relative lg:left-48">
        <button className="lg:flex lg:items-center lg:justify-center lg:gap-3">
          <div className="hidden lg:visible lg:flex">약관보기</div>
          <div className="flex">{rightArrowSvg}</div>
        </button>
      </div>
    </div>
  );
};

export const AdminTermsBox = (props: PropsWithChildren<TermsProps>) => {
  const { term, children, className = "" } = props;
  const useFormReturn = useForm();
  const { register, handleSubmit } = useFormReturn;
  const loginCheck = useLoginCheck();
  const router = useRouter();
  const { query } = router;

  const { component, openPopup, closePopup } = usePopup();
  const {
    component: bigComponent,
    openPopup: openBigPopup,
    closePopup: closeBigPopup,
  } = usePopup();
  const {
    openPopup: openIconPopup,
    closePopup: closeIconPopup,
    component: iconComponent,
  } = useIconPopup();

  return (
    <div className="flex h-[136px] w-[255px] flex-col items-stretch justify-between rounded-[10px] border border-[#BABABA] bg-white bg-opacity-50 p-6">
      {component}
      {iconComponent}
      {bigComponent}
      <div className="flex">
        <div className="flex h-full gap-3">
          <RoundMiniBanner type={"orange"}>활성</RoundMiniBanner>
          <MainTitle mainTitle={term.name} />
        </div>
      </div>
      <LeftRight>
        <div className="font-[20px] w-fit font-medium leading-6 ">
          {"0000.00.00"}
        </div>
        <ButtonLine>
          {/* <Link href={``}> */}
          <LittleButton
            svg="edit"
            onClick={() => {
              openPopup(
                <TermsContainer
                  term={term}
                  type="editAdmin"
                  closePopup={closePopup}
                  openIconPopup={openIconPopup}
                />
              );
            }}
          />
          {/* </Link> */}
          <LittleButton
            svg="delete"
            onClick={
              () => {}
              // deleteHandler(
              //   id,
              //   productPlanDetail ? productPlanDetail.length : 0
              // )
            }
          />
        </ButtonLine>
      </LeftRight>
    </div>
  );
};

export const TermsContainer = ({
  type,
  openIconPopup,
  closePopup,
  term,
}: {
  type: string;
  openIconPopup: openIconPopupType;
  closePopup: (a?: () => void) => void;
  term: eachTosI;
}) => {
  const useFormReturn = useForm();
  const { handleSubmit, setValue } = useFormReturn;

  return (
    <div className={"flex w-full flex-col items-center group-hover:text-black"}>
      <div className="mt-12 mb-4 flex w-full flex-col items-center gap-1 px-5 lg:mt-24 lg:mb-10 lg:px-0">
        <div className="text-xl font-bold lg:mb-2 lg:text-[31px]">
          {term.name}
        </div>
      </div>
      <GapMaker height={24} />
      <div>
        {term && (
          <div
            className="font-[15px] h-screen w-full overflow-y-auto bg-[#FAFAFA]"
            dangerouslySetInnerHTML={{ __html: term.content }}
          ></div>
        )}
        {/* <textarea className="font-[15px] h-screen w-full overflow-y-scroll bg-[#FAFAFA]">
          {term.content}
        </textarea> */}
      </div>
    </div>
  );
};
