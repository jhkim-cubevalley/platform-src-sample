import { useEffect } from "react";
import { FieldErrorsImpl, useForm } from "react-hook-form";
import ButtonLine from "../../../components/ButtonLine";
import GapMaker from "../../../components/GapMaker";
import LabelInput, {
  LabelInputPropsType,
  LabelTextArea,
  NewLabelInput,
} from "../../../components/LabelInput";
import LeftRight from "../../../components/LeftRight";
import LittleButton from "../../../components/LittleButton";
import LoginContainer from "../../../components/LoginContainer";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTable, { MainTableDiv } from "../../../components/MainTable";
import MainTitle from "../../../components/MainTitle";
import {
  createGroupAPI,
  deleteGroupAPI,
  editGroupAPI,
} from "../../../utils/api/admin/group";
import { useGroup } from "../../../utils/api/useGroup";
import { formatDate } from "../../../utils/formatDate";
import useIconPopup from "../../../utils/useIconPopup";
import usePopup from "../../../utils/usePopup";

const dummyData = Array(10).fill({
  code: "C1",
  name: "그룹명1",
  accounts: 2,
  point: 5,
  createdAt: "2022.09.11",
  desc: "그룹설명입니다. 그룹설명입니다.\n그룹설명입니다. ㅇㅅㅇ",
});

const AddGroup = (props: { closePopup: () => void; id?: string }) => {
  const { closePopup, id = null } = props;
  const isChange = id ? true : false;
  const useFormReturn = useForm();
  const { handleSubmit, reset } = useFormReturn;
  const { data, mutate } = useGroup("USER");
  useEffect(() => {
    if (isChange) {
      reset(data.find((info) => info.id === id));
    }
  }, [data, id, reset, isChange]);

  const inputList: LabelInputPropsType[] = [
    {
      labelName: "그룹명",
      inputType: "input",
      inputName: "name",
      isRequired: true,
      registerOptions: { required: true },
    },
    {
      labelName: "포인트 적립\n정도(%)",
      inputType: "input",
      inputName: "pointMultiple",
      isRequired: true,
      registerOptions: {
        required: true,
        max: {
          value: 100,
          message: "포인트 적립 정도는 최대 100까지 가능합니다.",
        },
        min: { value: 0, message: "포인트 적립 정도는 최소 0까지 가능합니다." },
      },
      type: "number",
      step: "0.01",
    },
    {
      labelName: "설명",
      inputType: "textarea",
      inputName: "description",
      isRequired: true,
      registerOptions: { required: true },
      placeholder: "설명을 입력해주세요",
    },
  ];
  const onSubmit = async (d: any) => {
    if (isChange) {
      const { name, description, pointMultiple } = d;
      await editGroupAPI(id as string, {
        name,
        description,
        pointMultiple,
      });
    } else await createGroupAPI({ ...d, type: "USER" });
    mutate();
    closePopup();
  };
  return (
    <LoginContainer className="gap-6">
      <MainTitle little>그룹 {isChange ? "수정" : "추가"}</MainTitle>
      <form
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit, (d) => console.log(d))}
      >
        {inputList.map((d) => (
          <NewLabelInput {...d} useForm={useFormReturn} key={d.inputName} />
        ))}
        <GapMaker height={12} />
        <ButtonLine>
          <MainButton
            styleType="gray"
            type="button"
            onClick={() => closePopup()}
          >
            닫기
          </MainButton>
          <MainButton styleType="orange">
            {isChange ? "수정" : "추가"}하기
          </MainButton>
        </ButtonLine>
      </form>
    </LoginContainer>
  );
};

export const AdminUserGroup = () => {
  const { openPopup, closePopup, component } = usePopup();
  const { data, mutate } = useGroup("USER");
  const {
    openPopup: openIconPopup,
    closePopup: closeIconPopup,
    component: iconComponent,
  } = useIconPopup();
  const doDelete = async (id: string) => {
    await deleteGroupAPI(id);
    mutate();
    openIconPopup({
      title: "삭제가 완료되었습니다.",
      type: "black",
    });
  };
  const deleteHandler = (id: string) => {
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
  const addGroupHandler = (id?: string) => {
    openPopup(<AddGroup closePopup={closePopup} id={id} />);
  };
  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>일반 회원 관리 - 그룹설정</MainTitle>
        <MainButton small styleType="black" onClick={() => addGroupHandler()}>
          추가하기
        </MainButton>
      </LeftRight>
      <GapMaker height={24} />
      <MainTable>
        <thead>
          <tr>
            <th>그룹명</th>
            <th>소속 계정 수</th>
            <th>포인트 적립 정도(%)</th>
            <th>생성일</th>
            <th>설명</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({ name, user, pointMultiple, createdAt, description, id }, i) => (
              <tr key={`${name}${i}${id}`}>
                <td>{name}</td>
                <td>{user.length}</td>
                <td>{pointMultiple}</td>
                <td>{formatDate(createdAt)}</td>
                <td>
                  <MainTableDiv>
                    <MainButton
                      styleType="gray"
                      forGrid
                      onClick={() =>
                        openPopup(
                          <LoginContainer className="gap-6">
                            <MainTitle little> 그룹 설명</MainTitle>
                            <div className="w-full p-4 rounded border bg-white whitespace-pre-wrap">
                              {description}
                            </div>
                          </LoginContainer>
                        )
                      }
                    >
                      보기
                    </MainButton>
                  </MainTableDiv>
                </td>
                <td>
                  <MainTableDiv>
                    <ButtonLine little>
                      <LittleButton
                        svg="edit"
                        onClick={() => addGroupHandler(id)}
                      />
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

export default AdminUserGroup;
