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
    name: "??????",
    code: "approve",
    type: "yellow",
  },
  {
    name: "?????????",
    code: "sale",
    type: "green",
  },
  {
    name: "?????????",
    code: "inspect",
    type: "purple",
  },
  {
    name: "????????????",
    code: "request_approve",
    type: "blue",
  },
  {
    name: "????????????",
    code: "temp",
    type: "gray",
  },
  {
    name: "????????????",
    code: "sale_end",
    type: "darkgray",
  },
  {
    name: "??????",
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
    openGlobalTextPopup(`${type}????????????.`);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <MainTitle>????????? ?????? ?????????????????????????</MainTitle>
      <div className="w-full p-4 bg-white rounded">{text}</div>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const reason = (e.target as any)[0].value as string;
          const result = await productDenyAPI(id, reason);
          if (!result) return;
          finishHandler("??????");
        }}
      >
        <CustomTextarea
          rows={3}
          placeholder="?????? ??? ??????????????? ?????? ???????????? ???????????????."
        />
        <ButtonLine>
          <MainButton styleType="black" type="submit">
            ??????
          </MainButton>
          <MainButton
            styleType="orange"
            type="button"
            onClick={async () => {
              const result = await productApproveAPI(id);
              if (!result) return;
              finishHandler("??????");
            }}
          >
            ??????
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
        openGlobalTextPopup(`????????? ??????????????????.`);
      })}
    >
      <div>
        <MainTitle>?????? ????????????</MainTitle>
      </div>
      <div className="text-[#FF5C00]">
        ?????? ?????? ???????????? ????????? ???????????????.
      </div>
      <NewLabelInput
        useForm={useFormReturn}
        inputName="status"
        labelName="??????"
        inputType="select"
        optionList={statusList.map((t) => ({ name: t.name, value: t.code }))}
      ></NewLabelInput>
      <ButtonLine>
        <MainButton styleType="gray" type="button" onClick={() => closePopup()}>
          ??????
        </MainButton>
        <MainButton styleType="orange" type="submit">
          ??????
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
        title: "????????? ?????????????????????.",
        type: "black",
      });
      mutate();
    }
  };
  const deleteHandler = (id: string | number) => {
    openIconPopup({
      title: "?????? ?????????????????????????",
      type: "orange",
      desc: "??????????????? ?????? ????????? ??????????????????.",
      buttonList: [
        { type: "close" },
        {
          type: "orange",
          text: "????????????",
          callback: () => doDelete(id),
        },
      ],
    });
  };

  const CubeezLibraryListSearch: LabelInputPropsType[] = [
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
      gridCol: 1,
    },
    {
      inputType: "input",
      labelName: "?????????",
      inputName: "name",
      gridLabel: true,
      gridRow: 1,
      gridCol: 2,
    },
    {
      inputType: "input",
      labelName: "?????????",
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
      labelName: "??????",
      inputName: "continent",
      optionList: regionInput.continentList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 1,
    },
    {
      inputType: "select",
      labelName: "??????",
      inputName: "country",
      optionList: regionInput.countryList,
      gridLabel: true,
      gridRow: 2,
      gridCol: 2,
    },
    {
      inputType: "select",
      labelName: "??????",
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
    const koreanText = status === "approve" ? "??????" : "??????";
    openIconPopup({
      type: "orange",
      title: `?????? ????????? ?????? ?????? ${koreanText}???????????????????`,
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
            openGlobalTextPopup(`${koreanText}???????????????`);
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
        <MainTitle>????????? ???????????? ??????</MainTitle>
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
            ??????
          </MainButton>
        </SearchGrid>
      </form>
      <GapMaker height={24} />
      <MainTable>
        <thead>
          <tr>
            <th>?????? ????????????</th>
            <th>???????????????</th>
            <th>??????????????? ??????</th>
            <th>?????????</th>
            <th>?????? ??????</th>
            <th>?????????</th>
            <th>????????????</th>
            <th>????????????</th>
            <th>??????</th>
            <th>????????????</th>
            <th>????????????</th>
            <th>????????????</th>
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
                              "?????? ?????? ????????? ??????????????????."
                            );
                            return;
                          }
                          const result = await setProductManagerAPI(
                            id,
                            groupId
                          );
                          if (!result) return;
                          mutate();
                          openGlobalTextPopup("?????????????????????.");
                        }}
                      >
                        <option value="">??????</option>
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
                          ??????
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
                        ??????
                      </MainButton>
                    ) : status === "request_approve" ? (
                      "?????? ??????"
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
                      ??????
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
                      ??????
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
