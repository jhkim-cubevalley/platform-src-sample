import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../../components/ButtonLine";
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
  deleteProductAPI,
  getMyProductAPI,
  getProductAPI,
  getProductHistoryAPI,
  requestApproveAPI,
  requestApproveCancelAPI,
} from "../../../../utils/api/product";
import { getRegionAPI } from "../../../../utils/api/region";
import { formatDate } from "../../../../utils/formatDate";
import { openGlobalTextPopup } from "../../../../utils/globalPopup";
import { queryFilter } from "../../../../utils/queryFilter";
import useIconPopup from "../../../../utils/useIconPopup";
import useLogin, { useLoginCheck } from "../../../../utils/useLogin";
import usePopup from "../../../../utils/usePopup";
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
    name: "승인",
    code: "approve",
    type: "yellow",
  },
  {
    name: "판매중",
    code: "sale",
    type: "green",
  },
  {
    name: "검수중",
    code: "inspect",
    type: "purple",
  },
  {
    name: "승인요청",
    code: "request_approve",
    type: "blue",
  },
  {
    name: "임시저장",
    code: "temp",
    type: "gray",
  },
  {
    name: "판매종료",
    code: "sale_end",
    type: "darkgray",
  },
  {
    name: "반려",
    code: "deny",
    type: "red",
  },
];

export const RequestApprove = ({
  closePopup,
  id,
  mutate,
}: {
  closePopup: any;
  id: number | string;
  mutate: any;
}) => {
  return (
    <form
      className="w-full flex flex-col gap-8"
      onSubmit={async (e) => {
        e.preventDefault();
        const message = (e.target as any)[0].value;
        closePopup();
        const result = await requestApproveAPI(id, message);
        if (!result) return;
        mutate();
        openGlobalTextPopup("승인요청 되었습니다.");
      }}
    >
      <div className="w-full text-center font-bold text-2xl">
        승인요청 하시겠습니까?
      </div>
      <CustomTextarea
        cols={4}
        placeholder="관리자에게 전할 말을 적어주세요."
      ></CustomTextarea>
      <ButtonLine>
        <MainButton styleType="gray" type="button" onClick={() => closePopup()}>
          취소
        </MainButton>
        <MainButton styleType="orange">승인요청</MainButton>
      </ButtonLine>
    </form>
  );
};

export const CubeezLibrary = () => {
  const useFormReturn = useForm();
  const loginCheck = useLoginCheck();
  const { loginData } = useLogin();
  const router = useRouter();
  const { query } = router;

  const productData = useSWR(loginCheck("/region"), getRegionAPI);
  const { data, mutate } = useSWR(
    loginCheck(["/product/me", queryFilter(query)]),
    secondArgsFetcher(getMyProductAPI)
  );
  // console.log(data);
  let continentId: string[] = [],
    countryId: string[] = [],
    cityId: string[] = [],
    continentName: string[] = [],
    countryName: string[] = [],
    cityName: string[] = [];

  productData.data?.result.data.forEach((element) => {
    if (element.depth === 1) {
      continentId = [...continentId, element.id];
      continentName = [...continentName, element.name];
    } else if (element.depth === 2) {
      countryId = [...countryId, element.id];
      countryName = [...countryName, element.name];
    } else if (element.depth === 3) {
      cityId = [...cityId, element.id];
      cityName = [...cityName, element.name];
    }
  });
  let continentList: optionListI[] = [
    {
      value: "",
      name: "",
    },
  ];
  for (let i = 0; i < continentId.length; i++) {
    continentList = [
      ...continentList,
      { value: continentId[i], name: continentName[i] },
    ];
  }
  let countryList: optionListI[] = [
    {
      value: "",
      name: "",
    },
  ];
  for (let i = 0; i < countryId.length; i++) {
    countryList = [
      ...countryList,
      { value: countryId[i], name: countryName[i] },
    ];
  }
  let cityList: optionListI[] = [
    {
      value: "",
      name: "",
    },
  ];
  for (let i = 0; i < cityId.length; i++) {
    cityList = [...cityList, { value: cityId[i], name: cityName[i] }];
  }

  const { register, handleSubmit } = useFormReturn;
  const { component, openPopup, closePopup } = usePopup();
  const {
    openPopup: openIconPopup,
    closePopup: closeIconPopup,
    component: iconComponent,
  } = useIconPopup();
  const doDelete = async (id: string | number) => {
    const result = await deleteProductAPI(id);
    if (result) {
      openIconPopup({
        title: "삭제가 완료되었습니다.",
        type: "black",
      });
      mutate();
    }
  };
  const deleteHandler = (id: string | number) => {
    openIconPopup({
      title: "정말 삭제하시겠습니까?",
      type: "orange",
      desc: "삭제하시면 다시 복구가 불가능합니다.",
      buttonList: [
        { type: "close" },
        {
          type: "orange",
          text: "삭제하기",
          callback: () => doDelete(id),
        },
      ],
    });
  };

  const CubeezLibraryListSearch: LabelInputPropsType[] = [
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
      gridCol: 1,
    },
    {
      inputType: "input",
      labelName: "상품명",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
    },
    {
      inputType: "input",
      labelName: "생성일",
      inputName: "createdFrom",
      gridLabel: true,
      gridRow: 1,
      gridCol: 3,
      type: "date",
    },
    {
      inputType: "input",
      labelName: "~",
      inputName: "createdTo",
      gridLabel: true,
      gridRow: 1,
      gridCol: 4,
      type: "date",
    },
    {
      inputType: "select",
      labelName: "지역",
      inputName: "continent",
      optionList: continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
    },
    {
      inputType: "select",
      labelName: "국가",
      inputName: "country",
      optionList: countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
    },
    {
      inputType: "select",
      labelName: "도시",
      inputName: "city",
      optionList: cityList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 3,
    },
  ];
  const getStatusComponent = (status: string) => {
    const target = statusList.find((t) => t.code === status);
    if (!target) return <MiniBanner type="gray">-</MiniBanner>;
    else return <MiniBanner type={target.type}>{target.name}</MiniBanner>;
  };

  return (
    <MainContainer type="cubeez">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>패키지 여행상품 관리</MainTitle>
        <ButtonLine>
          <Link href={"/cubeez/product/package/new"}>
            <button type="button">{AddSvg}</button>
          </Link>
        </ButtonLine>
      </LeftRight>
      <GapMaker height={24} />
      <form
        className="w-full"
        onSubmit={handleSubmit((data) =>
          router.replace({ query: queryFilter(data) })
        )}
      >
        <SearchGrid rows={2}>
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
            className=" row-start-2 col-start-4"
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
            <th>대표 상품코드</th>
            <th>여행상품명</th>
            <th>매니지먼트 신청</th>
            <th>출발지</th>
            <th>행사 기간</th>
            <th>담당자</th>
            <th>행사보기</th>
            <th>상태</th>
            <th>승인요청</th>
            <th>히스토리</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.result.data.map(
              (
                {
                  id,
                  code,
                  name,
                  isManagement,
                  departure,
                  dateFrom,
                  dateTo,
                  admin,
                  status,
                  history,
                },
                i
              ) => (
                <tr key={`${id}`}>
                  <td>{code}</td>
                  <td className="font-bold">{name}</td>
                  <td>
                    <RoundFullBanner type={isManagement ? "orange" : "black"}>
                      {isManagement ? "Y" : "N"}
                    </RoundFullBanner>
                  </td>
                  <td>{departure}</td>
                  <td>
                    {formatDate(dateFrom)}
                    <br />~{formatDate(dateTo)}
                  </td>
                  <td>{admin ? admin.name : "미정"}</td>
                  <td>
                    <MainTableDiv>
                      <Link href={`/cubeez/product/package/${id}/event`}>
                        <MainButton styleType="white" small>
                          보기
                        </MainButton>
                      </Link>
                    </MainTableDiv>
                  </td>
                  <td>{getStatusComponent(status)}</td>
                  <td>
                    {status === "temp" ? (
                      <MainButton
                        styleType="black"
                        small
                        onClick={() =>
                          openPopup(
                            <RequestApprove
                              id={id}
                              closePopup={closePopup}
                              mutate={mutate}
                            />
                          )
                        }
                      >
                        요청
                      </MainButton>
                    ) : status === "request_approve" ? (
                      <MainButton
                        styleType="orange"
                        small
                        onClick={() =>
                          openIconPopup({
                            title: "승인 요청을 취소하시겠습니까?",
                            desc: "상품이 다시 임시저장 상태로 돌아갑니다.",
                            type: "orange",
                            buttonList: [
                              { type: "close", text: "아니요" },
                              {
                                type: "orange",
                                text: "요청취소",
                                callback: async () => {
                                  const res = await requestApproveCancelAPI(id);
                                  closeIconPopup();
                                  if (!res) return;
                                  mutate();
                                  openGlobalTextPopup("취소되었습니다.");
                                },
                              },
                            ],
                          })
                        }
                      >
                        취소
                      </MainButton>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <MainButton
                      styleType="gray"
                      small
                      onClick={() =>
                        openPopup(
                          <History id={id} fetcher={getProductHistoryAPI} />
                        )
                      }
                    >
                      보기
                    </MainButton>
                  </td>
                  <td>
                    <MainTableDiv>
                      <ButtonLine>
                        <Link href={`/cubeez/product/package/${id}`}>
                          <LittleButton svg="edit" />
                        </Link>
                        <LittleButton
                          svg="delete"
                          onClick={() => deleteHandler(id)}
                        />
                      </ButtonLine>
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
