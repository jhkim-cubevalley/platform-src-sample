import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import GapMaker from "../../../components/GapMaker";
import {
  GridTitleInput,
  GridTitleSelect,
} from "../../../components/GridTitleInput";
import {
  LabelInputPropsType,
  NewLabelInput,
} from "../../../components/LabelInput";
import LeftRight from "../../../components/LeftRight";
import LittleButton from "../../../components/LittleButton";
import LoginButton from "../../../components/LoginButton";
import LoginContainer from "../../../components/LoginContainer";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainInput from "../../../components/MainInput";
import MainSelect from "../../../components/MainSelect";
import MainTable, { MainTableDiv } from "../../../components/MainTable";
import MainTitle from "../../../components/MainTitle";
import SearchGrid from "../../../components/SearchGrid";
import { secondArgsFetcher } from "../../../utils/api";
import { setMultiGroupAPI } from "../../../utils/api/admin/group";
import { deleteEachUserAPI, getUserAPI } from "../../../utils/api/admin/user";
import { useGroup } from "../../../utils/api/useGroup";
import { formatDate } from "../../../utils/formatDate";
import { formatPhone } from "../../../utils/formatPhone";
import { queryFilter } from "../../../utils/queryFilter";
import useIconPopup from "../../../utils/useIconPopup";
import { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";

const dummyData = Array(10).fill({
  code: "1N",
  email: "test123@gmail.com",
  name: "홍길동",
  group: "그룹1",
  nickname: "닉네임닉네임",
  phone: "010-1234-1234",
  registerDate: "2022.08.01",
  buttons: "asdfsadf",
});

const AdminUserListSearch: LabelInputPropsType[] = [
  // {
  //   inputType: "select",
  //   labelName: "상태",
  //   inputName: "status",
  //   optionList: [{ value: "ALL", name: "모두" }],
  //   gridLabel: true,
  //   gridRow: 1,
  //   gridCol: 1,
  // },
  {
    inputType: "input",
    labelName: "가입일",
    inputName: "createdFrom",
    gridLabel: true,
    gridRow: 2,
    gridCol: 1,
    type: "date",
  },
  {
    inputType: "input",
    labelName: "~",
    inputName: "createdTo",
    gridLabel: true,
    gridRow: 2,
    gridCol: 2,
    type: "date",
  },
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
    labelName: "닉네임",
    inputName: "nickname",
    gridLabel: true,
    gridRow: 1,
    gridCol: 2,
  },
  {
    inputType: "select",
    labelName: "그룹",
    inputName: "gropuId",
    optionList: [{ value: "ALL", name: "모두" }],
    gridLabel: true,
    gridRow: 1,
    gridCol: 3,
  },
];

const AssignGroup = ({
  selected,
  closePopup,
}: {
  selected: string[];
  closePopup: () => void;
}) => {
  const useFormReturn = useForm();
  const { handleSubmit } = useFormReturn;
  const { data } = useGroup("USER");
  const onSubmit = async (d: any) => {
    const groupId = d.targetGroupId === "" ? null : d.targetGroupId;
    await setMultiGroupAPI(
      selected.map((uid) => ({
        uid,
        type: "USER",
        groupId,
      }))
    );
    closePopup();
  };
  return (
    <LoginContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full gap-5 flex-col flex justify-center items-center"
      >
        <NewLabelInput
          inputType="select"
          optionList={[
            { value: "", name: "그룹배정 해제" },
            ...data.map((info) => ({
              value: info.id,
              name: info.name,
            })),
          ]}
          inputName="targetGroupId"
          labelName="그룹명"
          gridLabel
          useForm={useFormReturn}
        />
        <MainButton styleType="black">배정하기</MainButton>
      </form>
    </LoginContainer>
  );
};

export const AdminUserIndex = () => {
  const useFormReturn = useForm();
  const loginCheck = useLoginCheck();
  const router = useRouter();
  const { query } = router;
  const { data, mutate } = useSWR(
    loginCheck(["/admin/account/user", query]),
    secondArgsFetcher(getUserAPI)
  );
  const { register, handleSubmit } = useFormReturn;
  const [Checked, setChecked] = useState<boolean[]>([]);
  useEffect(() => {
    setChecked(data?.result.data.map(() => false) || []);
  }, [data]);

  const { component, openPopup, closePopup } = usePopup();
  const {
    openPopup: openIconPopup,
    closePopup: closeIconPopup,
    component: iconComponent,
  } = useIconPopup();
  const doDelete = async (uid: string) => {
    await deleteEachUserAPI(uid);
    mutate();
    openIconPopup({
      title: "삭제가 완료되었습니다.",
      type: "black",
    });
  };
  const deleteHandler = (uid: string) => {
    openIconPopup({
      title: "정말 삭제하시겠습니까?",
      type: "orange",
      desc: "삭제하시면 다시 복구가 불가능합니다.",
      buttonList: [
        { type: "close" },
        {
          type: "orange",
          text: "삭제하기",
          callback: () => doDelete(uid),
        },
      ],
    });
  };
  const checkedChangeHandler = (idx: number) => {
    const newChecked = [...Checked];
    newChecked[idx] = !newChecked[idx];
    setChecked(newChecked);
  };
  const getAllChecked = (list: boolean[]) =>
    list.reduce((prev, curr) => prev && curr, true);
  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>일반회원관리</MainTitle>
        <ButtonLine>
          <MainButton styleType="gray" small>
            다운로드
          </MainButton>
          <MainButton styleType="gray" small>
            인쇄
          </MainButton>
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
          {AdminUserListSearch.map((d) => (
            <NewLabelInput
              {...d}
              useForm={useFormReturn}
              key={d.inputName}
              small
            />
          ))}
          <MainButton
            styleType="black"
            forGrid
            className=" row-start-2 col-start-4"
          >
            검색
          </MainButton>
        </SearchGrid>
      </form>
      <GapMaker height={24} />
      <MainTable>
        <thead>
          <tr>
            <th>
              <MainTableDiv>
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  checked={getAllChecked(Checked)}
                  onChange={() =>
                    setChecked((c) => {
                      const target = !getAllChecked(c);
                      return c.map(() => target);
                    })
                  }
                />
              </MainTableDiv>
            </th>
            <th>이메일</th>
            <th>이름</th>
            <th>그룹</th>
            <th>닉네임</th>
            <th>연락처</th>
            <th>가입일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.result.data.map(
              ({ uid, email, name, group, nickname, phone, createdAt }, i) => (
                <tr key={`${uid}${name}${i}`}>
                  <td>
                    <MainTableDiv>
                      <input
                        type="checkbox"
                        className="w-6 h-6"
                        checked={Checked[i]}
                        onChange={() => checkedChangeHandler(i)}
                      />
                    </MainTableDiv>
                  </td>
                  <td>{email}</td>
                  <td>{name}</td>
                  <td>{group?.name || "-"}</td>
                  <td>{nickname}</td>
                  <td>{formatPhone(phone)}</td>
                  <td>{formatDate(createdAt)}</td>
                  <td>
                    <MainTableDiv>
                      <ButtonLine little>
                        <LittleButton svg="sns" />
                        <Link href={`/admin/user/${uid}`}>
                          <LittleButton svg="edit" />
                        </Link>
                        <LittleButton
                          svg="delete"
                          onClick={() => deleteHandler(uid)}
                        />
                      </ButtonLine>
                    </MainTableDiv>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </MainTable>
      <GapMaker height={24} />
      <div className="flex justify-start items-start">
        <ButtonLine>
          <MainButton
            styleType="black"
            small
            onClick={() =>
              openPopup(
                <AssignGroup
                  selected={
                    data
                      ? data.result.data
                          .filter((_, i) => Checked[i])
                          .map((info) => info.uid)
                      : []
                  }
                  closePopup={() => {
                    mutate();
                    closePopup();
                  }}
                />
              )
            }
          >
            그룹배정
          </MainButton>
          <Link href="/admin/user/group">
            <MainButton styleType="gray" small>
              그룹설정
            </MainButton>
          </Link>
        </ButtonLine>
      </div>
    </MainContainer>
  );
};

export default AdminUserIndex;
