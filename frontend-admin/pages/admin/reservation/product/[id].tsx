import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../../components/ButtonLine";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTextarea from "../../../../components/CustomTextarea";
import GapMaker from "../../../../components/GapMaker";
import { History } from "../../../../components/History";
import {
  LabelInputPropsType,
  NewLabelInput,
} from "../../../../components/LabelInput";
import LeftRight from "../../../../components/LeftRight";
import LittleButton from "../../../../components/LittleButton";
import LoginContainer from "../../../../components/LoginContainer";
import MainButton from "../../../../components/MainButton";
import { MainContainer } from "../../../../components/MainContainer";
import MainTable, { MainTableDiv } from "../../../../components/MainTable";
import MainTitle from "../../../../components/MainTitle";
import MiniBanner, { MiniBannerType } from "../../../../components/MiniBanner";
import RoundFullBanner from "../../../../components/RoundFullBanner";
import SearchGrid from "../../../../components/SearchGrid";
import { secondArgsFetcher } from "../../../../utils/api";
import { deleteLibraryAPI, getLibraryAPI } from "../../../../utils/api/menu";
import {
  changeStatusAPI,
  deleteProductAPI,
  getMyProductAPI,
  getProductAPI,
  productApproveAPI,
  productDenyAPI,
  setProductManagerAPI,
} from "../../../../utils/api/product";
import { getRegionAPI } from "../../../../utils/api/region";
import { getProductReservationAPI } from "../../../../utils/api/reservation";
import { useGroup } from "../../../../utils/api/useGroup";
import { formatDate } from "../../../../utils/formatDate";
import { formatPhone } from "../../../../utils/formatPhone";
import { openGlobalTextPopup } from "../../../../utils/globalPopup";
import { queryFilter } from "../../../../utils/queryFilter";
import useIconPopup from "../../../../utils/useIconPopup";
import useLogin, { useLoginCheck } from "../../../../utils/useLogin";
import usePopup from "../../../../utils/usePopup";
import { useRegionInput } from "../../../../utils/useRegionInput";
import { optionListI } from "../../../admin/library/[id]";
export const AddSvg = (
  <svg
    width="58"
    height="58"
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_983_12429)">
      <circle cx="29" cy="27" r="20" fill="white" />
      <rect
        x="20.4766"
        y="26.4688"
        width="16.916"
        height="1.34479"
        fill="#00192F"
      />
      <rect
        x="28.2656"
        y="35.5977"
        width="16.916"
        height="1.34479"
        transform="rotate(-90 28.2656 35.5977)"
        fill="#00192F"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_983_12429"
        x="0"
        y="0"
        width="58"
        height="58"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="4.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_983_12429"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_983_12429"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const statusList: {
  name: string;
  code: string;
  type: MiniBannerType;
}[] = [
  {
    name: "예약대기",
    code: "wait",
    type: "gray",
  },
  {
    name: "완납",
    code: "payment",
    type: "blue",
  },
  {
    name: "선금 미납",
    code: "not_before",
    type: "purple",
  },
  {
    name: "잔금 미납",
    code: "not_after",
    type: "darkgray",
  },
  {
    name: "완료",
    code: "done",
    type: "green",
  },
  {
    name: "취소-요청",
    code: "request_cancel",
    type: "red",
  },
  {
    name: "취소-접수",
    code: "doing_cancel",
    type: "yellow",
  },
  {
    name: "취소-완료",
    code: "done_cancel",
    type: "black",
  },
];

const referrerList: {
  name: string;
  code: string;
  type: MiniBannerType;
}[] = [
  {
    name: "상담",
    code: "inquiry",
    type: "yellow",
  },
  {
    name: "플랫폼",
    code: "platform",
    type: "green",
  },
  {
    name: "인센티브",
    code: "incentive",
    type: "purple",
  },
];

export const insuranceStatusList: {
  name: string;
  code: string;
  type: MiniBannerType;
}[] = [
  {
    name: "미가입",
    code: "not",
    type: "gray",
  },
  {
    name: "가입 진행중",
    code: "doing",
    type: "yellow",
  },
  {
    name: "가입 완료",
    code: "done",
    type: "green",
  },
];

export const CubeezLibrary = () => {
  const useFormReturn = useForm();
  const loginCheck = useLoginCheck();
  const { loginData } = useLogin();
  const router = useRouter();
  const regionInput = useRegionInput({ useForm: useFormReturn });
  const { query } = router;
  const { id } = query as { id: string };

  const { data, mutate } = useSWR(
    loginCheck([`/reservation/product/${id}`, queryFilter(query)]),
    secondArgsFetcher((q: any) => getProductReservationAPI(id, q))
  );
  // const { data, mutate } = useSWR(
  //   loginCheck(["/product", queryFilter(query)]),
  //   secondArgsFetcher(getProductAPI)
  // );
  // console.log(data);
  const { register, handleSubmit } = useFormReturn;
  const { data: adminGroupData, mutate: adminGroupMutate } = useGroup("ADMIN");
  const { component, openPopup, closePopup } = usePopup();
  const {
    openPopup: openIconPopup,
    closePopup: closeIconPopup,
    component: iconComponent,
  } = useIconPopup();
  // const doDelete = async (id: string | number) => {
  //   const result = await deleteProductAPI(id);
  //   if (result) {
  //     openIconPopup({
  //       title: "삭제가 완료되었습니다.",
  //       type: "black",
  //     });
  //     mutate();
  //   }
  // };
  // const deleteHandler = (id: string | number) => {
  //   openIconPopup({
  //     title: "정말 삭제하시겠습니까?",
  //     type: "orange",
  //     desc: "삭제하시면 다시 복구가 불가능합니다.",
  //     buttonList: [
  //       { type: "close" },
  //       {
  //         type: "orange",
  //         text: "삭제하기",
  //         callback: () => doDelete(id),
  //       },
  //     ],
  //   });
  // };

  const CubeezLibraryListSearch: LabelInputPropsType[] = [
    {
      inputType: "input",
      labelName: "이름",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
    },
    {
      inputType: "input",
      labelName: "연락처",
      inputName: "phone",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
    },
    {
      inputType: "select",
      labelName: "상태",
      inputName: "status",
      optionList: [
        { value: "", name: "모두" },
        ...statusList.map(({ name, code }) => ({ name, value: code })),
      ],
      gridLabel: true,
      gridRow: 1,
      gridCol: 3,
    },
  ];
  const getStatusComponent = (
    status: string,
    targetList?: {
      name: string;
      code: string;
      type: MiniBannerType;
    }[]
  ) => {
    const list = targetList || statusList;
    const target = list.find((t) => t.code === status);
    if (!target) return <MiniBanner type="gray">-</MiniBanner>;
    else return <MiniBanner type={target.type}>{target.name}</MiniBanner>;
  };

  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>예약관리 - 예약자 명단</MainTitle>
        <ButtonLine>
          {/* <Link href={"/admin/reservation/reservation/new"}>
            <button type="button">{AddSvg}</button>
          </Link> */}
        </ButtonLine>
      </LeftRight>
      <GapMaker height={24} />
      <form
        className="w-full"
        onSubmit={handleSubmit((data) =>
          router.replace({ query: queryFilter(data) })
        )}
      >
        <SearchGrid rows={1}>
          {CubeezLibraryListSearch.map((d) => (
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
            <th>예약번호</th>
            <th>대표 예약자</th>
            <th>이메일</th>
            <th>연락처</th>
            <th>동행자 수</th>
            <th>예약일</th>
            <th>예약경로</th>
            <th>상태</th>
            {/* <th>히스토리</th> */}
            {/* <th>계약서</th> */}
            <th>보험</th>
            <th>예약 정보</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.result.data.map(
              // Array(10)
              //   .fill(0)
              //   .map((_, i) => ({
              //     id: i,
              //     code: "NVM135215-221010KE001",
              //     master: "이대표",
              //     email: "testtest@gmail.com",
              //     phone: "01012341234",
              //     people: (i % 6) + 1,
              //     reservationDate: `2022-11-0${(i % 9) + 1}`,
              //     referrer: referrerList[i % 3].code,
              //     status: statusList[i % 8].code,
              //     insurance: insuranceStatusList[i % 3].code,
              //   }))
              //   .map(
              (
                {
                  id,
                  code,
                  insuranceStatus,
                  referrer,
                  status,
                  bookerName,
                  bookerEmail,
                  bookerPhone,
                  reservationPeoples,
                  createdAt,
                },
                i
              ) => (
                <tr key={`${id}`}>
                  <td className=" whitespace-pre-wrap">
                    {code.replace("-", "-\n")}
                  </td>
                  <td className="font-bold">{bookerName}</td>
                  <td>{bookerEmail}</td>
                  <td>{formatPhone(bookerPhone)}</td>
                  <td>{reservationPeoples.length}</td>
                  <td>{formatDate(createdAt)}</td>
                  <td>{getStatusComponent(referrer, referrerList)}</td>
                  <td>{getStatusComponent(status)}</td>
                  {/* <td>
                    <MainButton
                      styleType="gray"
                      small
                      onClick={() =>
                        openPopup(
                          <History
                            historyList={[
                              {
                                createdAt: createdAt,
                                updatedAt: "",
                                id: "",
                                message: "dddd",
                                title: "테스트",
                              },
                            ]}
                          />
                        )
                      }
                    >
                      보기
                    </MainButton>
                  </td> */}
                  {/* <td>
                    <MainTableDiv>
                      <Link href={`/admin/product/package/${id}/event`}>
                        <MainButton styleType="white" small>
                          보기 및 수정
                        </MainButton>
                      </Link>
                    </MainTableDiv>
                  </td> */}
                  <td>
                    {getStatusComponent(insuranceStatus, insuranceStatusList)}
                  </td>
                  <td>
                    <MainTableDiv>
                      <Link href={`/admin/reservation/reservation/${id}`}>
                        <MainButton styleType="orange" small>
                          보기 및 편집
                        </MainButton>
                      </Link>
                    </MainTableDiv>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </MainTable>
    </MainContainer>
  );
};

export default CubeezLibrary;
