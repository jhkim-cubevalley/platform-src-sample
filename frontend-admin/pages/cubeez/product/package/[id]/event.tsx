import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../../../components/ButtonLine";
import CustomTextarea from "../../../../../components/CustomTextarea";
import GapMaker from "../../../../../components/GapMaker";
import { History } from "../../../../../components/History";
import {
  LabelInputPropsType,
  NewLabelInput,
} from "../../../../../components/LabelInput";
import LeftRight from "../../../../../components/LeftRight";
import LittleButton from "../../../../../components/LittleButton";
import MainButton from "../../../../../components/MainButton";
import { MainContainer } from "../../../../../components/MainContainer";
import MainTable, { MainTableDiv } from "../../../../../components/MainTable";
import MainTitle from "../../../../../components/MainTitle";
import MiniBanner, {
  MiniBannerType,
} from "../../../../../components/MiniBanner";
import RoundFullBanner from "../../../../../components/RoundFullBanner";
import SearchGrid from "../../../../../components/SearchGrid";
import { secondArgsFetcher } from "../../../../../utils/api";
import {
  getEventAPI,
  postEventEditAPI,
  postEventEndAPI,
} from "../../../../../utils/api/event";
import { formatDate } from "../../../../../utils/formatDate";
import { openGlobalTextPopup } from "../../../../../utils/globalPopup";
import { queryFilter } from "../../../../../utils/queryFilter";
import useIconPopup from "../../../../../utils/useIconPopup";
import useLogin, { useLoginCheck } from "../../../../../utils/useLogin";
import usePopup from "../../../../../utils/usePopup";
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
    name: "?????????",
    code: "display",
    type: "yellow",
  },
  {
    name: "????????????",
    code: "display_stop",
    type: "red",
  },
  {
    name: "????????????",
    code: "trip_confirm",
    type: "green",
  },
  {
    name: "????????????",
    code: "trip_end",
    type: "gray",
  },
];

const EventEditRequest = ({
  id,
  closePopup,
  mutate,
}: {
  id: string | number;
  closePopup: any;
  mutate: any;
}) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <div>
        <MainTitle>?????? ?????? ???????????????????</MainTitle>
      </div>

      <div className="text-[#FF5C00] whitespace-pre-wrap text-center">
        ????????? ????????? ??????, ??? ??????????????? ?????? ????????? ?????? ?????????. ??? ?????????
        ??????????????? ???????????? ???????????????, ?????? ?????? ?????? ????????????.
      </div>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const text = ((e.target as any)[0].value || "") as string;
          const res = await postEventEditAPI(id, text);
          closePopup();
          if (!res) return;
          mutate();
          openGlobalTextPopup("?????? ??????????????????.");
        }}
      >
        <CustomTextarea
          rows={4}
          placeholder="???????????? ??? ????????? ????????? ??????????????????."
        />
        <ButtonLine>
          <MainButton
            styleType="gray"
            onClick={() => closePopup()}
            type="button"
          >
            ??????
          </MainButton>
          <MainButton styleType="orange" type="submit">
            ????????????
          </MainButton>
        </ButtonLine>
      </form>
    </div>
  );
};

export const CubeezLibrary = () => {
  const useFormReturn = useForm();
  const loginCheck = useLoginCheck();
  const { loginData } = useLogin();
  const router = useRouter();
  const { query } = router;
  const { id: _id } = query;
  const id = `${_id || ""}`;

  // const productData = useSWR(loginCheck("/region"), getRegionAPI);
  const { data, mutate } = useSWR(
    loginCheck([`/event/all/${id}`, queryFilter(query)]),
    secondArgsFetcher((q: any) => getEventAPI(id, q))
  );
  const { register, handleSubmit } = useFormReturn;
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
      inputType: "select",
      labelName: "??????",
      inputName: "type",
      optionList: [{ value: "", name: "??????" }],
      gridLabel: true,
      gridRow: 1,
      gridCol: 1,
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
        <MainTitle>
          {data && data.result.data.length > 0
            ? `${data.result.data[0].product.name}??? ??????`
            : "????????? ????????????"}
        </MainTitle>
        {/* <ButtonLine>
          <Link href={"/cubeez/product/package/new"}>
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
        <SearchGrid rows={1}>
          {CubeezLibraryListSearch.map((d) => (
            <NewLabelInput
              {...d}
              useForm={useFormReturn}
              key={d.inputName}
              small
            />
          ))}
          <Link href={`/cubeez/product/package/${id}/event/new`}>
            <MainButton
              styleType="orange"
              className=" row-start-1 col-start-2"
              forGrid
              type="button"
            >
              <span className="mr-2">+</span>
              ???????????? ??????
            </MainButton>
          </Link>
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
            <th>???????????????</th>
            <th>?????????</th>
            <th>????????????</th>
            <th>????????????</th>
            <th>
              <div>?????? ?????????</div>
              <div className=" text-xs font-normal">(??????)</div>
            </th>
            <th>?????? ??????</th>
            <th>????????????</th>
            {/* <th>??????</th> */}
            <th>????????????</th>
            <th>??????/????????????</th>
          </tr>
        </thead>
        <tbody>
          {data?.result?.data &&
            data.result.data.map(
              (
                {
                  id,
                  code,
                  product,
                  status,
                  startDate,
                  eventType,
                  isRequestStop,
                  histories,
                  editMessage,
                },
                i
              ) => (
                <tr key={`${id}`}>
                  <td className=" whitespace-pre">
                    {code.replace("-", "-\n")}
                  </td>
                  <td className="font-bold">{product.name}</td>
                  <td>{formatDate(startDate)}</td>
                  <td>
                    <RoundFullBanner type="orange">
                      {eventType.type}
                    </RoundFullBanner>
                  </td>
                  <td>
                    <MainTableDiv>
                      <MainButton styleType="white" small>
                        ??????
                      </MainButton>
                    </MainTableDiv>
                  </td>
                  <td>
                    <div>{eventType.priceAdult.toLocaleString()}???</div>
                    <div className="text-xs">
                      ({product.priceAdult.toLocaleString()}???)
                    </div>
                  </td>
                  <td>{getStatusComponent(status)}</td>
                  <td>
                    <MainTableDiv>
                      <MainButton
                        styleType="white"
                        small
                        onClick={() =>
                          openPopup(<History historyList={histories} />)
                        }
                      >
                        ??????
                      </MainButton>
                    </MainTableDiv>
                  </td>
                  <td>
                    <RoundFullBanner type={editMessage ? "orange" : "black"}>
                      {editMessage ? "Y" : "N"}
                    </RoundFullBanner>
                  </td>
                  {/* <td>
                    <MainTableDiv>
                      <MainButton styleType="white" small>
                        ??????
                      </MainButton>
                    </MainTableDiv>
                  </td> */}
                  <td>
                    <MainTableDiv>
                      <ButtonLine>
                        <LittleButton
                          svg="edit"
                          onClick={() =>
                            openPopup(
                              <EventEditRequest
                                id={id}
                                closePopup={closePopup}
                                mutate={mutate}
                              />
                            )
                          }
                        />
                        <LittleButton
                          svg="ban"
                          onClick={() =>
                            openIconPopup({
                              title: "?????? ?????? ???????????????????",
                              desc: "???????????? ??????, ??? ??????????????? ?????? ????????? ?????? ?????????. ??? ????????? ??????????????? ???????????? ???????????????, ?????? ?????? ?????? ????????????.",
                              type: "orange",
                              buttonList: [
                                { type: "close", text: "??????" },
                                {
                                  type: "orange",
                                  text: "????????????",
                                  callback: async () => {
                                    const res = await postEventEndAPI(id);
                                    closeIconPopup();
                                    if (!res) return;
                                    mutate();
                                    openGlobalTextPopup("?????? ??????????????????.");
                                  },
                                },
                              ],
                            })
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
    </MainContainer>
  );
};

export default CubeezLibrary;
