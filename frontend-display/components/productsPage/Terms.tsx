import React, { useState } from "react";
import ChevronRight from "../../public/images/chevron-right.svg";
import ChevronRightMobile from "../../public/images/chevron-right-mobile.svg";
import X_Gray from "../../public/images/xGray.svg";
import { Modal } from "reactstrap";
import { eachTosI } from "../../utils/api/product";
import { useEachTosAPI } from "../../utils/api/tos";

const tempTerms = [
  {
    termName: "약관1",
    content:
      "이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관",
  },
  {
    termName: "약관2",
    content:
      "이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관",
  },
  {
    termName: "약관3",
    content:
      "이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관",
  },
  {
    termName: "약관4",
    content:
      "이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관이용약관",
  },
];

export const TermPopup = (props: any) => {
  const { toggleModal, id } = props;
  const { data } = useEachTosAPI(id);
  return (
    <div className="no-scrollbar popup-box  w-full flex-col justify-center px-[25px] py-[20px] pb-[25px] lg:max-h-full lg:w-[645px] lg:gap-[38.2px] lg:py-0 lg:px-[45px]  lg:pb-[48.32px] lg:pt-7">
      <div className=" popup-header relative  flex items-center justify-between">
        <div>
          <X_Gray onClick={toggleModal} className="cursor-pointer" />
        </div>
        <div>
          <h1 className="font-['Pretendard'] text-[16px] font-bold leading-[35px] text-[#292929] lg:text-[25px] lg:leading-[30px]">
            이용약관
          </h1>
        </div>
        <div></div>
      </div>

      <div className="popup-content no-scrollbar mt-[35px] flex max-h-[481px] overflow-scroll lg:mt-[38.2px] lg:max-h-[631px]">
        <p
          className=" whitespace-pre-wrap font-['Pretendard'] text-[12px] font-normal leading-[20px] text-[#2c2c2c] lg:text-[16px] lg:leading-[30px]"
          dangerouslySetInnerHTML={{ __html: data?.content || "" }}
        ></p>
      </div>
    </div>
  );
};

const TermBtn = (props: { data: eachTosI; id: string }, args: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // const { data } = props;
  const { data } = useEachTosAPI(props.id);
  return (
    <>
      <div
        onClick={toggleModal}
        className="flex w-full cursor-pointer items-center justify-between rounded-[5.1px]  border border-[#cecece] py-[17px] px-[17px] lg:max-h-[73.65px] lg:max-w-[420px] lg:rounded-[6px] lg:px-[27px] lg:py-[22px]"
      >
        <h1 className="m-0 font-['Pretendard'] text-[14px]  font-medium leading-[16.8px] text-[#292929] lg:text-[22px] lg:leading-[26px]">
          {data?.name || ""}
        </h1>
        <div className="hidden lg:block">
          <ChevronRight />
        </div>
        <div className="block lg:hidden">
          <ChevronRightMobile />
        </div>
      </div>

      <Modal
        style={{ maxWidth: "645px" }}
        isOpen={isModalOpen}
        toggle={toggleModal}
        centered={true}
        fade={false}
        {...args}
      >
        <TermPopup toggleModal={toggleModal} id={props.id} />
      </Modal>
    </>
  );
};

const Terms = ({ termsList }: { termsList: eachTosI[] }) => {
  console.log(termsList);
  return (
    <div className="mt-[32px] mb-[58px] grid w-full grid-cols-2 gap-[15px] px-[20px] lg:mb-0 lg:mt-[61px] lg:gap-[30px] lg:px-0">
      {termsList.map((term, index) => (
        <TermBtn key={index} data={term} id={term.tos.id} />
      ))}
    </div>
  );
};

export default Terms;
