import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import ColorBanner from "../../../components/ColorBanner";
import CustomSelect from "../../../components/CustomSelect";
import GapMaker from "../../../components/GapMaker";
import { IncentiveInquiry } from "../../../components/IncentiveInquiry";
import Inquiry from "../../../components/Inquiry";
import {
  LabelInputPropsType,
  NewLabelInput,
} from "../../../components/LabelInput";
import LeftRight from "../../../components/LeftRight";
import LoginContainer from "../../../components/LoginContainer";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTable, { MainTableDiv } from "../../../components/MainTable";
import MainTitle from "../../../components/MainTitle";
import { Pagination } from "../../../components/Pagination";
import SearchGrid from "../../../components/SearchGrid";
import { secondArgsFetcher } from "../../../utils/api";
import { getAdminInfoAPI } from "../../../utils/api/admin/admin";
import {
  getIncentiveAPI,
  postIncentiveManagerAPI,
} from "../../../utils/api/incentive";
import { postManagerInquiryAPI } from "../../../utils/api/inquiry";
import { formatDate } from "../../../utils/formatDate";
import { queryFilter } from "../../../utils/queryFilter";
import useIconPopup from "../../../utils/useIconPopup";
import { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";

const statusList = [
  { value: "no_answer", name: "미답변" },
  { value: "answer", name: "답변완료" },
  { value: "end_trip", name: "여행종료" },
];

// const dummyData = Array(10).fill({
//   code: "1N",
//   title: "문의사항입니다.문의사항입니다.문의사항입니다.",
//   category: "상품 관련",
//   manager: "M1",
//   author: "큐비즈",
//   status: "answered",
//   createdAt: "2022.07.01",
//   answeredAt: "2022.07.01",
// });

const AdminCubeezListSearch: LabelInputPropsType[] = [
  {
    inputType: "select",
    labelName: "상태",
    inputName: "status",
    optionList: [{ value: "all", name: "모두" }, ...statusList],
    gridLabel: true,
    gridRow: 1,
    gridCol: 1,
  },
  {
    inputType: "input",
    labelName: "이메일",
    inputName: "userEmail",
    gridLabel: true,
    gridRow: 1,
    gridCol: 2,
    type: "text",
  },
];

export const AdminUserIndex = () => {
  const useFormReturn = useForm();
  const { handleSubmit, setValue } = useFormReturn;
  const loginCheck = useLoginCheck();
  const router = useRouter();
  const { query } = router;
  const [pageIndex, setPageIndex] = useState(1);
  useEffect(() => {
    router.replace({
      query: {
        ...queryFilter(router.query),
        limit: 8,
        offset: pageIndex,
      },
    });
  }, []);
  const {
    component: bigComponent,
    openPopup: bigOpenPopUp,
    closePopup: bigClosePopup,
  } = usePopup("big");
  const { component, openPopup, closePopup } = usePopup("big");
  const { openPopup: openIconPopup, component: iconComponent } = useIconPopup();

  console.log(router.pathname, router.query);
  const { data } = useSWR(
    loginCheck([`/incentive`, queryFilter(query)]),
    secondArgsFetcher(getIncentiveAPI)
  );
  console.log(data?.result.data);
  const adminList = useSWR(loginCheck(`/admin`), getAdminInfoAPI);
  console.log(adminList);
  const managerList = [{ name: "미배정", value: "" }];
  // useEffect(() => {
  adminList.data?.result.data.map((v) => {
    managerList.push({ name: v.name, value: v.uid });
  });
  console.log(managerList);

  return (
    <MainContainer type="admin">
      {component}
      {bigComponent}
      {iconComponent}
      <LeftRight>
        <MainTitle>인센티브 여행상담</MainTitle>
        {/* <Link href="/admin/product/event">
          <MainButton styleType="gray" small>
            행사 관리
          </MainButton>
        </Link> */}
      </LeftRight>
      <GapMaker height={24} />
      <form
        className="w-full"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          router.replace({
            query: {
              ...queryFilter(data),
              limit: 8,
              offset: 1,
            },
          });
          setPageIndex(1);
        })}
      >
        <SearchGrid rows={1}>
          {AdminCubeezListSearch.map((d) => (
            <NewLabelInput
              {...d}
              useForm={useFormReturn}
              key={d.inputName}
              small
            />
          ))}
          <MainButton
            styleType="black"
            className=" row-start-1 col-start-4"
            forGrid
          >
            검색
          </MainButton>
        </SearchGrid>
      </form>
      <GapMaker height={24} />
      <MainTable>
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>문의자</th>
            <th>이메일</th>
            <th>내용</th>
            <th>상태</th>
            <th>문의일시</th>
            <th>상품(행사)</th>
            <th>담당자</th>
          </tr>
        </thead>
        <tbody>
          {data?.result.data.map(
            ({ id, title, user, createdAt, isEndTrip, answer, manager }, i) => (
              <tr key={`${id}${i}`}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{user.nickname}</td>
                <td>{user.email}</td>
                <td>
                  <MainTableDiv>
                    <button
                      onClick={() =>
                        bigOpenPopUp(
                          <IncentiveInquiry
                            id={id}
                            closePopup={bigClosePopup}
                            openIconPopup={openIconPopup}
                          />
                        )
                      }
                    >
                      <ColorBanner type="white">보기</ColorBanner>
                    </button>
                  </MainTableDiv>
                </td>
                <td>
                  {isEndTrip ? (
                    <ColorBanner type="yellow">여행 종료</ColorBanner>
                  ) : answer !== null ? (
                    <ColorBanner type="green">답변 완료</ColorBanner>
                  ) : (
                    <ColorBanner type="gray">미답변</ColorBanner>
                  )}
                </td>
                <td>{formatDate(createdAt)}</td>
                <td>
                  <MainTableDiv>
                    <button>
                      {}
                      <ColorBanner type="black">생성하기</ColorBanner>
                    </button>
                  </MainTableDiv>
                </td>
                <td>
                  <MainTableDiv>
                    <CustomSelect
                      small
                      className="w-36"
                      name="manager"
                      defaultValue={manager.uid}
                      onChange={async (e: any) => {
                        if (e.target.value === "") return;
                        console.log("manager", e.target.value);
                        const result = await postIncentiveManagerAPI(
                          id,
                          e.target.value
                        );
                        if (result) {
                          console.log("change manager", result);
                          openPopup(
                            <LoginContainer>
                              <div className=" w-[466px] px-12 pb-12 pt-4 bg-[#F2F2F2] flex flex-col rounded-xl relative text-center">
                                <MainTitle little>
                                  관리자 변경이 완료되었습니다.
                                </MainTitle>
                              </div>
                              <ButtonLine>
                                <MainButton
                                  forGrid
                                  className="w-[453px] h-[70px] py-4"
                                  styleType="orange"
                                  onClick={() => closePopup()}
                                >
                                  닫기
                                </MainButton>
                              </ButtonLine>
                            </LoginContainer>
                          );
                        }
                        console.log(result);
                        setValue("manager", manager.uid);
                        location.reload();
                      }}
                    >
                      {managerList.map((v) => (
                        <option key={v.value} value={v.value}>
                          {v.name}
                        </option>
                      ))}
                    </CustomSelect>
                  </MainTableDiv>
                </td>
              </tr>
            )
          )}
        </tbody>
      </MainTable>
      <GapMaker height={56} />
      {data?.result.data && (
        <Pagination
          useForm={useFormReturn}
          total={data.result.total}
          limit={8}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
    </MainContainer>
  );
};

export default AdminUserIndex;
