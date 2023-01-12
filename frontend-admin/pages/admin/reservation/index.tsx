import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import CustomSelect from "../../../components/CustomSelect";
import GapMaker from "../../../components/GapMaker";
import { History } from "../../../components/History";
import {
  LabelInputPropsType,
  NewLabelInput,
} from "../../../components/LabelInput";
import LeftRight from "../../../components/LeftRight";
import LittleButton from "../../../components/LittleButton";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTable, { MainTableDiv } from "../../../components/MainTable";
import MainTitle from "../../../components/MainTitle";
import MiniBanner, { MiniBannerType } from "../../../components/MiniBanner";
import RoundFullBanner from "../../../components/RoundFullBanner";
import SearchGrid from "../../../components/SearchGrid";
import { secondArgsFetcher } from "../../../utils/api";
import {
  changeStatusAPI,
  deleteProductAPI,
  getProductAPI,
  getProductHistoryAPI,
  setProductManagerAPI,
} from "../../../utils/api/product";
import { useGroup } from "../../../utils/api/useGroup";
import { formatDate } from "../../../utils/formatDate";
import { openGlobalTextPopup } from "../../../utils/globalPopup";
import { queryFilter } from "../../../utils/queryFilter";
import useIconPopup from "../../../utils/useIconPopup";
import useLogin, { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";
import { useRegionInput } from "../../../utils/useRegionInput";
import { statusList } from "../product/package";
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

export const CubeezLibrary = () => {
  const useFormReturn = useForm();
  const loginCheck = useLoginCheck();
  const { loginData } = useLogin();
  const router = useRouter();
  const regionInput = useRegionInput({
    useForm: useFormReturn,
    continent: "continentId",
    country: "countryId",
    city: "cityId",
  });
  const { query } = router;

  // const productData = useSWR(loginCheck("/region"), getRegionAPI);
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
    // const result = await deleteProductAPI(id);
    // if (result) {
    //   openIconPopup({
    //     title: "삭제가 완료되었습니다.",
    //     type: "black",
    //   });
    //   mutate();
    // }
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
      labelName: "행사상태",
      inputName: "eventStatus",
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
      labelName: "출발일",
      inputName: "dateFrom",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
      type: "date",
    },
    {
      inputType: "input",
      labelName: "~",
      inputName: "dateTo",
      gridLabel: true,
      gridRow: 1,
      gridCol: 3,
      type: "date",
    },
    {
      inputType: "select",
      labelName: "지역",
      inputName: "continentId",
      optionList: regionInput.continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
    },
    {
      inputType: "select",
      labelName: "국가",
      inputName: "countryId",
      optionList: regionInput.countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
    },
    {
      inputType: "select",
      labelName: "도시",
      inputName: "cityId",
      optionList: regionInput.cityList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 3,
    },
    {
      inputType: "input",
      labelName: "출발지",
      inputName: "departure",
      gridLabel: true,
      gridRow: 2,
      gridCol: 4,
    },
    {
      inputType: "input",
      labelName: "큐비즈명",
      inputName: "cubeezName",
      gridLabel: true,
      gridRow: 3,
      gridCol: 1,
    },
    {
      inputType: "input",
      labelName: "상품명",
      inputName: "productName",
      gridLabel: true,
      gridRow: 3,
      gridCol: 2,
    },
  ];
  const getStatusComponent = (status: string) => {
    const target = statusList.find((t) => t.code === status);
    if (!target) return <MiniBanner type="gray">-</MiniBanner>;
    else return <MiniBanner type={target.type}>{target.name}</MiniBanner>;
  };
  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>예약 관리</MainTitle>
        {/* <ButtonLine>
          <Link href={"/admin/product/package/new"}>
            <button type="button">{AddSvg}</button>
          </Link>
        </ButtonLine> */}
      </LeftRight>
      <GapMaker height={24} />
      <form
        className="w-full"
        onSubmit={handleSubmit((data) =>
          router.replace({ query: queryFilter(data) })
        )}
      >
        <SearchGrid rows={3}>
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
            className=" row-start-3 col-start-4"
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
            <th>행사코드</th>
            <th>행사명</th>
            <th>큐비즈</th>
            {/* <th>인센티브</th> */}
            <th>행사기간</th>
            <th>출발지</th>
            <th className=" whitespace-pre-wrap">{"출발인원\n(최소/최대)"}</th>
            {/* <th>예약현황</th> */}
            <th>예약자 명단</th>
            <th>취소 명단</th>
            <th>상태</th>
            <th>히스토리</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.result.data.map(
              // Array(10)
              //   .fill(0)
              //   .map((_, i) => ({
              //     id: i,
              //     name: "정통 대륙 횡단 (LA in) 19Days",
              //     cubeez: "큐비즈명",
              //     incentive: i % 2 === 0,
              //     departureDate: `2022-08-0${(i % 9) + 1}`,
              //     place: "인천/서울",
              //     departureMax: 20,
              //     departureMin: 5,
              //     people: i + 3,
              //     status: statusList[i % 4].code,
              //     code: "NVM135215",
              //   }))
              //   .map(
              // (
              //   {
              //     id,
              //     name,
              //     cubeez,
              //     incentive,
              //     departureDate,
              //     place,
              //     departureMax,
              //     departureMin,
              //     people,
              //     status,
              //     code,
              //   },
              //   i
              // ) => (
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
                  maxPeople,
                  minPeople,
                },
                i
              ) => (
                <tr key={`${id}`}>
                  <td>{code}</td>
                  <td className="font-bold">{name}</td>
                  <td className="font-bold">
                    {cubeez
                      ? cubeez.businessName || cubeez.nickname
                      : admin
                      ? admin.name
                      : "-"}
                  </td>
                  {/* <td>
                      <RoundFullBanner type={incentive ? "orange" : "black"}>
                        {incentive ? "Y" : "N"}
                      </RoundFullBanner>
                    </td> */}
                  <td>
                    {formatDate(dateFrom)}
                    <br />~{formatDate(dateTo)}
                  </td>
                  <td>{departure}</td>
                  <td className="font-bold">{`${minPeople}명/${maxPeople}명`}</td>
                  {/* <td className="font-bold">{`${people}명`}</td> */}
                  {/* <td>
                    {cubeez
                      ? cubeez.businessName || cubeez.nickname
                      : admin
                      ? admin.name
                      : ""}
                  </td> */}
                  <td>
                    <MainTableDiv>
                      <Link href={`/admin/reservation/product/${id}`}>
                        <MainButton styleType="white" small>
                          보기
                        </MainButton>
                      </Link>
                    </MainTableDiv>
                  </td>
                  <td>
                    <MainTableDiv>
                      <Link href={`/admin/reservation/product/${id}/cancel`}>
                        <MainButton styleType="white" small>
                          보기
                        </MainButton>
                      </Link>
                    </MainTableDiv>
                  </td>
                  <td>{getStatusComponent(status)}</td>
                  <td>
                    <MainButton
                      styleType="gray"
                      small
                      onClick={() => {
                        openPopup(
                          <History id={id} fetcher={getProductHistoryAPI} />
                        );
                      }}
                    >
                      보기
                    </MainButton>
                  </td>
                  {/* <td>
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
                  </td> */}
                </tr>
              )
            )}
        </tbody>
      </MainTable>
    </MainContainer>
  );
};

export default CubeezLibrary;
