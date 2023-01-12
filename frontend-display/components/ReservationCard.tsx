import React, { useEffect, useState } from "react";
import X_Gray from "../public/images/xGray.svg";
import Warning from "../public/images/warning.svg";
import Check from "../public/images/check.svg";
import { Modal } from "reactstrap";

const CancelReservPopup = (props: any) => {
  const [secondPage, setSecondPage] = useState(false);

  const { toggleModal } = props;
  return (
    <div className="box-border flex h-[472px] w-full flex-col rounded-[20px] py-[55px] px-[45px]">
      <div
        className="flex cursor-pointer items-center"
        onClick={() => toggleModal()}
      >
        <X_Gray />
      </div>
      <div className="mt-[38px] flex flex-col items-center justify-center">
        <div>{secondPage ? <Check /> : <Warning />}</div>
        <div className="mt-[39px] flex flex-col items-center justify-center">
          {secondPage ? (
            <>
              <h1 className="m-0 whitespace-nowrap  font-['Pretendard'] text-[25px] font-bold leading-[30px] text-[#383838]">
                취소가 요청되었습니다.
              </h1>
              <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[20px] font-medium leading-[24px] text-[#383838]">
                담당 관리자가 확인 후 연락드릴 예정입니다.
              </span>
            </>
          ) : (
            <>
              <h1 className="m-0 whitespace-nowrap  font-['Pretendard'] text-[25px] font-bold leading-[30px] text-[#383838]">
                정말 취소 요청 하시겠습니까?
              </h1>
              <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[20px] font-medium leading-[24px] text-[#ff5c00]">
                취소하시면 다시 복구가 불가능합니다.
              </span>
            </>
          )}
        </div>
        <div className="mt-[90px] flex w-full justify-between ">
          {secondPage ? (
            <div
              className="box-border flex w-full cursor-pointer items-center justify-center rounded-[7px] bg-[#ff5c00] py-[16px] px-[60px]"
              onClick={() => toggleModal()}
            >
              <span className="m-0 whitespace-nowrap  font-['Pretendard'] text-[25px] font-semibold leading-[30px] text-[#ffffff] ">
                확인
              </span>
            </div>
          ) : (
            <>
              <div
                className="box-border flex cursor-pointer items-center justify-center rounded-[7px] bg-[#c7c7c7] py-[16px] px-[60px]"
                onClick={() => toggleModal()}
              >
                <span className="m-0 whitespace-nowrap  font-['Pretendard'] text-[25px] font-semibold leading-[30px] text-[#000000] ">
                  아니오
                </span>
              </div>
              <div
                className="box-border flex cursor-pointer items-center justify-center rounded-[7px] bg-[#ff5c00] py-[16px] px-[60px]"
                onClick={() => setSecondPage(true)}
              >
                <span className="m-0 whitespace-nowrap  font-['Pretendard'] text-[25px] font-semibold leading-[30px] text-[#ffffff] ">
                  취소하기
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PendingButton = () => {
  return (
    <div className="flex cursor-pointer items-center justify-center rounded-[5px] bg-[#b9b9b9] px-[22px] py-[7px]">
      <span className="m-0 font-['Pretendard'] text-[16px] font-bold leading-[19px] text-[#000000]">
        예약 대기
      </span>
    </div>
  );
};

const CancelButton = (props: any) => {
  const { toggleModal } = props;
  return (
    <div
      className="flex cursor-pointer items-center justify-center rounded-[5px] bg-[#3f3f3f] px-[22px] py-[7px]"
      onClick={() => toggleModal()}
    >
      <span className="m-0 font-['Pretendard'] text-[16px] font-bold leading-[19px] text-[#ffffff]">
        예약 취소
      </span>
    </div>
  );
};

const ConfirmButton = () => {
  return (
    <div className="flex cursor-pointer items-center justify-center rounded-[5px] bg-[#ff5c00] px-[22px] py-[7px]">
      <span className="m-0 font-['Pretendard'] text-[16px] font-bold leading-[19px] text-[#000000]">
        예약 확정
      </span>
    </div>
  );
};

const InsuranceButton = () => {
  return (
    <div className="flex cursor-pointer items-center justify-center rounded-[5px] border-[2px] border-[#ff5c00]  px-[15px] py-[7px]">
      <span className="m-0 whitespace-nowrap font-['Pretendard'] text-[18px] font-bold leading-[19px] text-[#ff5c00]">
        보험 가입
      </span>
    </div>
  );
};

const ReservationCard = (props: any) => {
  const { data } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState({
    code: "VNBJ1352415",
    name: "정통 대륙 횡단",
    cubeez: "큐브밸리",
    departure: Date.now(),
    departurePlace: "인천/서울",
    peopleCount: 5,
    status: "예약 대기",
    category: "여행상품",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (data) {
      try {
        setLoadedData({ ...data });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div className="flex w-full items-center rounded-[5px] border-[1.16px] border-[#eaeaea] bg-[#ffffff] py-[17px] px-[20px] ">
      <div className="flex w-[10%] items-center justify-center">
        <span className="m-0 font-['Pretendard'] text-[18.5px] font-semibold leading-[22px] text-[#787878]">
          {loadedData.code}
        </span>
      </div>
      <div className="flex w-[20%] items-center justify-center">
        <span className="m-0 font-['Pretendard'] text-[18.5px] font-semibold leading-[22px] text-[#373737]">
          {loadedData.name}
        </span>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <span className="m-0 font-['Pretendard'] text-[18.5px] font-semibold leading-[22px] text-[#373737]">
          {loadedData.cubeez}
        </span>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <span className="m-0 font-['Pretendard'] text-[18.5px] font-semibold leading-[22px] text-[#373737]">
          {loadedData.category}
        </span>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <span className="m-0 font-['Pretendard'] text-[18.5px] font-semibold leading-[22px] text-[#373737]">
          {loadedData.departure}
        </span>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <span className="m-0 font-['Pretendard'] text-[18.5px] font-semibold leading-[22px] text-[#373737]">
          {loadedData.departurePlace}
        </span>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <span className="m-0 font-['Pretendard'] text-[18.5px] font-semibold leading-[22px] text-[#373737]">
          {loadedData.peopleCount}명
        </span>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <div className="flex flex-col items-center justify-items-center gap-[12px]">
          {data.status === "예약 대기" && <PendingButton />}
          {data.status === "예약 확정" && <ConfirmButton />}
          <CancelButton toggleModal={toggleModal} />
        </div>
      </div>
      <div className="flex w-[10%] items-center justify-center">
        <InsuranceButton />
      </div>

      <Modal
        centered
        scrollable
        size="lg"
        style={{ maxWidth: "520px" }}
        className="modal-reserve"
        contentClassName="modal-content"
        fade={false}
        isOpen={isModalOpen}
        toggle={toggleModal}
      >
        <CancelReservPopup toggleModal={toggleModal} />
      </Modal>
    </div>
  );
};

export default ReservationCard;
