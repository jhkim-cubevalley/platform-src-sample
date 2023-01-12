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
  getProductHistoryAPI,
  productApproveAPI,
  productDenyAPI,
  setProductManagerAPI,
} from "../../../../utils/api/product";
import { getRegionAPI } from "../../../../utils/api/region";
import { useGroup } from "../../../../utils/api/useGroup";
import { formatDate } from "../../../../utils/formatDate";
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

const ApproveProduct = ({
  id,
  text = "",
  mutate,
  closePopup,
}: {
  id: number;
  text?: string;
  mutate: any;
  closePopup: any;
}) => {
  const finishHandler = (type: string) => {
    mutate();
    closePopup();
    openGlobalTextPopup(`${type}했습니다.`);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <MainTitle>상품에 대해 승인하시겠습니까?</MainTitle>
      <div className="w-full p-4 bg-white rounded">{text}</div>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const reason = (e.target as any)[0].value as string;
          const result = await productDenyAPI(id, reason);
          if (!result) return;
          finishHandler("반려");
        }}
      >
        <CustomTextarea
          rows={3}
          placeholder="반려 시 큐비즈에게 전할 메시지를 적어주세요."
        />
        <ButtonLine>
          <MainButton styleType="black" type="submit">
            반려
          </MainButton>
          <MainButton
            styleType="orange"
            type="button"
            onClick={async () => {
              const result = await productApproveAPI(id);
              if (!result) return;
              finishHandler("승인");
            }}
          >
            승인
          </MainButton>
        </ButtonLine>
      </form>
    </div>
  );
};

const ChangeStatus = ({
  id,
  currentStatus,
  mutate,
  closePopup,
}: {
  id: number;
  currentStatus: string;
  mutate: any;
  closePopup: any;
}) => {
  const useFormReturn = useForm({ defaultValues: { status: currentStatus } });
  return (
    <form
      className="w-full flex flex-col gap-4 items-center"
      onSubmit={useFormReturn.handleSubmit(async (t) => {
        const { status } = t;
        const res = await changeStatusAPI(id, status);
        closePopup();
        mutate();
        if (!res) return;
        openGlobalTextPopup(`상태를 변경했습니다.`);
      })}
    >
      <div>
        <MainTitle>상태 직권변경</MainTitle>
      </div>
      <div className="text-[#FF5C00]">
        요청 없이 직권으로 상태를 변경합니다.
      </div>
      <NewLabelInput
        useForm={useFormReturn}
        inputName="status"
        labelName="상태"
        inputType="select"
        optionList={statusList.map((t) => ({ name: t.name, value: t.code }))}
      ></NewLabelInput>
      <ButtonLine>
        <MainButton styleType="gray" type="button" onClick={() => closePopup()}>
          닫기
        </MainButton>
        <MainButton styleType="orange" type="submit">
          변경
        </MainButton>
      </ButtonLine>
    </form>
  );
};

export const CubeezLibrary = () => {
  const useFormReturn = useForm();
  const loginCheck = useLoginCheck();
  const { loginData } = useLogin();
  const router = useRouter();
  const regionInput = useRegionInput({ useForm: useFormReturn });
  const { query } = router;

  const productData = useSWR(loginCheck("/region"), getRegionAPI);
  const { data, mutate } = useSWR(
    loginCheck(["/product", queryFilter(query)]),
    secondArgsFetcher(getProductAPI)
  );
  // console.log(data);
  const { register, handleSubmit } = useFormReturn;
  const { data: adminGroupData, mutate: adminGroupMutate } = useGroup("ADMIN");
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
      optionList: regionInput.continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
    },
    {
      inputType: "select",
      labelName: "국가",
      inputName: "country",
      optionList: regionInput.countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
    },
    {
      inputType: "select",
      labelName: "도시",
      inputName: "city",
      optionList: regionInput.cityList,
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
  const changeStatus = (id: string | number, status: string) => {
    const koreanText = status === "approve" ? "승인" : "전시";
    openIconPopup({
      type: "orange",
      title: `해당 상품을 요청 없이 ${koreanText}하시겠습니까?`,
      buttonList: [
        { type: "close" },
        {
          type: "orange",
          text: koreanText,
          callback: async () => {
            const res = await changeStatusAPI(id, status);
            closeIconPopup();
            if (!res) return;
            mutate();
            openGlobalTextPopup(`${koreanText}되었습니다`);
          },
        },
      ],
    });
  };

  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>패키지 여행상품 관리</MainTitle>
        <ButtonLine>
          <Link href={"/admin/product/package/new"}>
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
            <th>큐비즈</th>
            <th>담당그룹</th>
            <th>행사보기</th>
            <th>상태</th>
            <th>승인요청</th>
            <th>상태변경</th>
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
                  cubeez,
                  manageGroup,
                  requestMessage,
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
                  <td>
                    {cubeez
                      ? cubeez.businessName || cubeez.nickname
                      : admin
                      ? admin.name
                      : ""}
                  </td>
                  <td className="w-32">
                    <div className="w-full flex justify-center items-center px-2">
                      <CustomSelect
                        value={manageGroup ? manageGroup.id : ""}
                        onChange={async (e) => {
                          const groupId = e.target.value;
                          if (groupId === "") {
                            openGlobalTextPopup(
                              "그룹 배정 해제는 불가능합니다."
                            );
                            return;
                          }
                          const result = await setProductManagerAPI(
                            id,
                            groupId
                          );
                          if (!result) return;
                          mutate();
                          openGlobalTextPopup("변경되었습니다.");
                        }}
                      >
                        <option value="">미정</option>
                        {adminGroupData &&
                          adminGroupData.map((t) => (
                            <option value={t.id} key={t.id}>
                              {t.name}
                            </option>
                          ))}
                      </CustomSelect>
                    </div>
                  </td>
                  <td>
                    <MainTableDiv>
                      <Link href={`/admin/product/package/${id}/event`}>
                        <MainButton styleType="white" small>
                          보기
                        </MainButton>
                      </Link>
                    </MainTableDiv>
                  </td>
                  <td>{getStatusComponent(status)}</td>
                  <td>
                    {loginData.login &&
                    status === "request_approve" &&
                    manageGroup &&
                    manageGroup.id === loginData.info.group.id ? (
                      <MainButton
                        styleType="black"
                        small
                        onClick={() =>
                          openPopup(
                            <ApproveProduct
                              id={id}
                              text={requestMessage || ""}
                              mutate={mutate}
                              closePopup={closePopup}
                            />
                          )
                        }
                      >
                        응답
                      </MainButton>
                    ) : status === "request_approve" ? (
                      "담당 아님"
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <MainButton
                      styleType="white"
                      small
                      onClick={() =>
                        openPopup(
                          <ChangeStatus
                            id={id}
                            currentStatus={status}
                            mutate={mutate}
                            closePopup={closePopup}
                          />
                        )
                      }
                    >
                      변경
                    </MainButton>
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
                        <Link href={`/admin/product/package/${id}`}>
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
