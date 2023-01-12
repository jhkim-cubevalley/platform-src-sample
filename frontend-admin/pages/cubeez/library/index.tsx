import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import GapMaker from "../../../components/GapMaker";
import {
  LabelInputPropsType,
  NewLabelInput,
} from "../../../components/LabelInput";
import LeftRight from "../../../components/LeftRight";
import LittleButton from "../../../components/LittleButton";
import LoginContainer from "../../../components/LoginContainer";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTable, { MainTableDiv } from "../../../components/MainTable";
import MainTitle from "../../../components/MainTitle";
import { Pagination } from "../../../components/Pagination";
import RoundFullBanner from "../../../components/RoundFullBanner";
import SearchGrid from "../../../components/SearchGrid";
import { secondArgsFetcher } from "../../../utils/api";
import { deleteLibraryAPI, getLibraryAPI } from "../../../utils/api/menu";
import { getRegionAPI } from "../../../utils/api/region";
import { formatDate } from "../../../utils/formatDate";
import { queryFilter } from "../../../utils/queryFilter";
import useIconPopup from "../../../utils/useIconPopup";
import useLogin, { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";
import { useRegionInput } from "../../../utils/useRegionInput";
import { optionListI } from "../../admin/library/[id]";
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
  const regionInput = useRegionInput({
    useForm: useFormReturn,
  });
  const loginCheck = useLoginCheck();
  const { loginData } = useLogin();
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
  const productData = useSWR(loginCheck("/region"), getRegionAPI);
  const { data } = useSWR(
    loginCheck([`/library`, queryFilter(query)]),
    secondArgsFetcher(getLibraryAPI)
  );
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
  console.log(data);
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

  const { handleSubmit } = useFormReturn;
  const { component, openPopup, closePopup } = usePopup();
  const { openPopup: openIconPopup, component: iconComponent } = useIconPopup();
  const doDelete = async (idx: string) => {
    const data = await deleteLibraryAPI(idx);
    if ("error" in data) {
      alert(data.message);
    } else {
      console.log(data.result);
    }
    console.log(`${idx} 삭제`);
    openIconPopup({
      title: "삭제가 완료되었습니다.",
      type: "black",
    });
    location.reload();
  };

  const deleteHandler = (idx: string, link: number) => {
    link
      ? openPopup(
          <LoginContainer>
            <div className=" w-[466px] px-12 pb-12 pt-4 bg-[#F2F2F2] flex flex-col rounded-xl relative text-center">
              <MainTitle little>
                이 카드는 연결된 상품이 있어 삭제가 불가능합니다.
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
        )
      : openIconPopup({
          title: "정말 삭제하시겠습니까?",
          type: "orange",
          desc: "삭제하시면 다시 복구가 불가능합니다.",
          buttonList: [
            { type: "close" },
            {
              type: "orange",
              text: "삭제하기",
              callback: () => doDelete(idx),
            },
          ],
        });
  };

  const selectCategoryHandler = () => {
    openPopup(
      <LoginContainer className="gap-2">
        <div className=" w-[466px] px-12 pb-4 bg-[#F2F2F2] flex flex-col rounded-xl relative text-center">
          <MainTitle little>
            추가하실 라이브러리 카드의 종류를 선택해 주세요.
          </MainTitle>
        </div>
        <div className="w-[432px] h-px mb-4 border-[1.7px] border-[#DBDBDB] rounded" />
        <ButtonLine little>
          <Link href={"/cubeez/library/createHotel"}>
            <MainButton
              styleType="orange"
              className="w-[144px] h-[52px]"
              onClick={() => closePopup()}
            >
              호텔
            </MainButton>
          </Link>
          <Link href={"/cubeez/library/createTour"}>
            <MainButton
              styleType="orange"
              className="w-[144px] h-[52px]"
              onClick={() => closePopup()}
            >
              관광지
            </MainButton>
          </Link>
          <Link href={"/cubeez/library/createMeating"}>
            <MainButton
              styleType="orange"
              className="w-[144px] h-[52px]"
              onClick={() => closePopup()}
            >
              미팅정보
            </MainButton>
          </Link>
        </ButtonLine>
        <ButtonLine little>
          <Link href={"/cubeez/library/createShopping"}>
            <MainButton
              styleType="orange"
              className="w-[144px] h-[52px]"
              onClick={() => closePopup()}
            >
              쇼핑
            </MainButton>
          </Link>
          <Link href={"/cubeez/library/createOption"}>
            <MainButton
              styleType="orange"
              className="w-[144px] h-[52px]"
              onClick={() => closePopup()}
            >
              선택관광
            </MainButton>
          </Link>
        </ButtonLine>
      </LoginContainer>
    );
  };
  const CubeezLibraryListSearch: LabelInputPropsType[] = [
    {
      inputType: "select",
      labelName: "상태",
      inputName: "status",
      optionList: [
        { value: "all", name: "모든 카드" },
        { value: "me", name: "내가 만든 카드" },
        { value: "admin", name: "공식카드" },
      ],
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
    },
    {
      inputType: "input",
      labelName: "카드명",
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

  return (
    <MainContainer type="cubeez">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>라이브러리 관리</MainTitle>
        <ButtonLine>
          <button onClick={() => selectCategoryHandler()}>{AddSvg}</button>
        </ButtonLine>
      </LeftRight>
      <GapMaker height={24} />
      <form
        className="w-full"
        onSubmit={handleSubmit((data) => {
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
            <th>카드명</th>
            <th>카테고리</th>
            <th>국가</th>
            <th>도시</th>
            <th>생성일</th>
            <th>From</th>
            <th>상태</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.result.data.map(
              ({
                id,
                isUse,
                name,
                category,
                country,
                city,
                createdAt,
                cubeez,
                admin,
                productPlanDetail,
              }) => (
                <tr key={`${id}`}>
                  <td className="font-bold">{name}</td>
                  <td className="font-bold">{category}</td>
                  <td>{country.name}</td>
                  <td>{city.name}</td>
                  <td>{formatDate(createdAt)}</td>
                  <td>
                    {loginData.login
                      ? (admin && loginData.info.uid === admin.uid) ||
                        (cubeez && loginData.info.uid === cubeez.uid)
                        ? "me"
                        : admin !== null
                        ? admin.name
                        : cubeez !== null
                        ? cubeez.name
                        : ""
                      : ""}
                  </td>
                  <td>
                    <RoundFullBanner type={isUse ? "orange" : "black"}>
                      {isUse ? "Y" : "N"}
                    </RoundFullBanner>
                  </td>
                  <td>
                    <MainTableDiv>
                      <ButtonLine>
                        <Link href={`/cubeez/library/${id}`}>
                          <LittleButton svg="edit" />
                        </Link>
                        <LittleButton
                          svg="delete"
                          onClick={() =>
                            deleteHandler(
                              id,
                              productPlanDetail ? productPlanDetail.length : 0
                            )
                          }
                        />
                      </ButtonLine>
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

export default CubeezLibrary;
