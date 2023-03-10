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
    name: "????????????",
    code: "wait",
    type: "gray",
  },
  {
    name: "??????",
    code: "payment",
    type: "blue",
  },
  {
    name: "?????? ??????",
    code: "not_before",
    type: "purple",
  },
  {
    name: "?????? ??????",
    code: "not_after",
    type: "darkgray",
  },
  {
    name: "??????",
    code: "done",
    type: "green",
  },
  {
    name: "??????-??????",
    code: "request_cancel",
    type: "red",
  },
  {
    name: "??????-??????",
    code: "doing_cancel",
    type: "yellow",
  },
  {
    name: "??????-??????",
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
    name: "??????",
    code: "inquiry",
    type: "yellow",
  },
  {
    name: "?????????",
    code: "platform",
    type: "green",
  },
  {
    name: "????????????",
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
    name: "?????????",
    code: "not",
    type: "gray",
  },
  {
    name: "?????? ?????????",
    code: "doing",
    type: "yellow",
  },
  {
    name: "?????? ??????",
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
  //       title: "????????? ?????????????????????.",
  //       type: "black",
  //     });
  //     mutate();
  //   }
  // };
  // const deleteHandler = (id: string | number) => {
  //   openIconPopup({
  //     title: "?????? ?????????????????????????",
  //     type: "orange",
  //     desc: "??????????????? ?????? ????????? ??????????????????.",
  //     buttonList: [
  //       { type: "close" },
  //       {
  //         type: "orange",
  //         text: "????????????",
  //         callback: () => doDelete(id),
  //       },
  //     ],
  //   });
  // };

  const CubeezLibraryListSearch: LabelInputPropsType[] = [
    {
      inputType: "input",
      labelName: "??????",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
    },
    {
      inputType: "input",
      labelName: "?????????",
      inputName: "phone",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
    },
    {
      inputType: "select",
      labelName: "??????",
      inputName: "status",
      optionList: [
        { value: "", name: "??????" },
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
        <MainTitle>???????????? - ????????? ??????</MainTitle>
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
            ??????
          </MainButton>
        </SearchGrid>
      </form>
      <GapMaker height={24} />
      <MainTable>
        <thead>
          <tr>
            <th>????????????</th>
            <th>?????? ?????????</th>
            <th>?????????</th>
            <th>?????????</th>
            <th>????????? ???</th>
            <th>?????????</th>
            <th>????????????</th>
            <th>??????</th>
            {/* <th>????????????</th> */}
            {/* <th>?????????</th> */}
            <th>??????</th>
            <th>?????? ??????</th>
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
              //     master: "?????????",
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
                                title: "?????????",
                              },
                            ]}
                          />
                        )
                      }
                    >
                      ??????
                    </MainButton>
                  </td> */}
                  {/* <td>
                    <MainTableDiv>
                      <Link href={`/admin/product/package/${id}/event`}>
                        <MainButton styleType="white" small>
                          ?????? ??? ??????
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
                          ?????? ??? ??????
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
