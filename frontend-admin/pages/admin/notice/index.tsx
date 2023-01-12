import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import ColorBanner from "../../../components/ColorBanner";
import CustomSelect from "../../../components/CustomSelect";
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
import SearchGrid from "../../../components/SearchGrid";
import { secondArgsFetcher } from "../../../utils/api";
import {
  getNoticeAPI,
  eachNoticeI,
  postNoticeAPI,
  deleteNoticeAPI,
  editNoticeAPI,
  editStatusNoticeAPI,
} from "../../../utils/api/notice";
import { formatDate } from "../../../utils/formatDate";
import { queryFilter } from "../../../utils/queryFilter";
import useIconPopup from "../../../utils/useIconPopup";
import useLogin, { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";

const statusList = [
  { name: "임시 저장", value: "temp" },
  { name: "공지", value: "notice" },
];

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
    labelName: "제목",
    inputName: "title",
    gridLabel: true,
    gridRow: 1,
    gridCol: 2,
  },
];

export const Notice = () => {
  const useFormReturn = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormReturn;
  const { component, openPopup, closePopup } = usePopup("big");
  const {
    openPopup: openIconPopup,
    closePopup: closeIconPopup,
    component: iconComponent,
  } = useIconPopup();
  const loginCheck = useLoginCheck();
  const { query } = useRouter();
  console.log(query);
  const [pageIndex, setPageIndex] = useState(1);

  const { data } = useSWR(
    ["/notice", queryFilter(query)],
    secondArgsFetcher(getNoticeAPI)
  );
  const { loginData } = useLogin();
  const [noticeList, setNoticeList] = useState<eachNoticeI[]>();

  const deleteHandler = (idx: string) => {
    openIconPopup({
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
  const doDelete = async (idx: string) => {
    const data = await deleteNoticeAPI(idx);
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
  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>공지사항</MainTitle>
        <ButtonLine>
          <MainButton
            styleType="black"
            onClick={() => Router.push("/admin/notice/createNotice")}
          >
            작성하기
          </MainButton>
        </ButtonLine>
      </LeftRight>

      <GapMaker height={24} />
      <form
        className="w-full"
        onSubmit={handleSubmit(
          (data) => {
            Router.replace({
              query: {
                ...queryFilter(data),
                limit: 8,
                offset: 1,
              },
            });
            setPageIndex(1);
          }
          // router.replace({ query: queryFilter(data) })
        )}
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
            <th>작성일</th>
            <th>상태</th>
            <th>상태변경</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {data?.result.data.map(({ id, title, createdAt, status }, i) => (
            <tr key={`${id}${i}`}>
              <td>{i + 1}</td>
              <td>{title}</td>
              <td>{formatDate(createdAt)}</td>
              <td>
                {status === "temp" ? (
                  <ColorBanner type="gray">임시 저장</ColorBanner>
                ) : (
                  <ColorBanner type="green">공지</ColorBanner>
                )}
              </td>
              <td>
                <MainTableDiv>
                  <CustomSelect
                    small
                    className="w-36"
                    defaultValue={status}
                    onChange={async (e: any) => {
                      console.log(e.target.value);
                      const result = await editStatusNoticeAPI(
                        e.target.value,
                        id
                      );
                      console.log("change status put", result);

                      location.reload();
                    }}
                  >
                    {statusList.map((v, i) => (
                      <option key={v.value} value={v.value}>
                        {v.name}
                      </option>
                    ))}
                  </CustomSelect>
                </MainTableDiv>
              </td>
              <td>
                <MainTableDiv>
                  <Link href={`/admin/notice/${id}`}>
                    <LittleButton svg="edit" />
                  </Link>
                </MainTableDiv>
              </td>
              <td>
                <MainTableDiv>
                  <LittleButton
                    svg="delete"
                    onClick={() => deleteHandler(id)}
                  />
                </MainTableDiv>
              </td>
            </tr>
          ))}
        </tbody>
      </MainTable>
      <GapMaker height={56} />
      {data?.result.data && (
        <Pagination
          useForm={useFormReturn}
          total={data.result.total}
          limit={10}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
    </MainContainer>
  );
};

export default Notice;
