import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import FullCard from "../../../components/FullCard";
import GapMaker from "../../../components/GapMaker";
import LabelInput, {
  LabelInputPropsType,
  LabelSelect,
  NewLabelInput,
} from "../../../components/LabelInput";
import LeftRight from "../../../components/LeftRight";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTitle from "../../../components/MainTitle";
import { LeftRightEach } from "../../../components/RegisterInfo";
import { secondArgsFetcher } from "../../../utils/api";
import { editEachUserAPI, getEachUserAPI } from "../../../utils/api/admin/user";
import { useGroup } from "../../../utils/api/useGroup";
import { snsList } from "../../../utils/data";
import useIconPopup from "../../../utils/useIconPopup";
import { useLoginCheck } from "../../../utils/useLogin";

const dummyData = {
  name: "홍길동",
  email: "test123@gmail.com",
  nickname: "닉네임닉네임",
  sex: "M",
  phones: [{ value: "01012341234" }],
  groupId: "C1",
  point: 1000,
  sns: [{ handle: "gildong123", name: "instagram" }],
  social: [{ value: "네이버" }, { value: "카카오" }],
};

const AdminUserInfoLeftList: LabelInputPropsType[] = [
  {
    inputName: "name",
    labelName: "이름",
    disabled: true,
    isRequired: true,
  },
  {
    inputName: "email",
    labelName: "이메일",
    disabled: true,
    isRequired: true,
  },
  {
    inputName: "social",
    labelName: "간편로그인",
    inputType: "select",
    optionList: [
      { value: "KAKAO", name: "카카오" },
      { value: "NAVER", name: "네이버" },
      { value: "NONE", name: "사용하지 않음" },
    ],
    disabled: true,
    isRequired: true,
  },
];

export const AdminUserInfo = () => {
  const router = useRouter();
  const loginCheck = useLoginCheck();
  const { openPopup, component } = useIconPopup();
  const { id } = router.query;
  const { data, mutate } = useSWR(
    loginCheck(["/admin/account/user/uid", id]),
    secondArgsFetcher(getEachUserAPI)
  );
  const { data: groupData } = useGroup("USER");
  const AdminUserInfoRightList: LabelInputPropsType[] = [
    {
      inputName: "nickname",
      labelName: "닉네임",
      isRequired: true,
      registerOptions: { required: true },
    },
    {
      inputName: "sex",
      inputType: "select",
      labelName: "성별",
      isRequired: true,
      registerOptions: { required: true },
      optionList: [
        { value: "M", name: "남성" },
        { value: "F", name: "여성" },
      ],
    },
    {
      inputName: "phone",
      labelName: "연락처",
      isRequired: true,
      type: "tel",
    },
    {
      inputName: "groupId",
      inputType: "select",
      labelName: "그룹",
      isRequired: false,
      registerOptions: { required: false },
      optionList: [
        { value: "", name: "-" },
        ...groupData.map((info) => ({ value: info.id, name: info.name })),
      ],
    },
    {
      inputName: "point",
      labelName: "보유 포인트",
      isRequired: true,
      registerOptions: { required: true },
      type: "number",
    },
    {
      inputName: "sns",
      labelName: "SNS",
      inputType: "multi",
      innerType: "selectinput",
      subProps: {
        leftName: "name",
        rightName: "handle",
        leftOptions: snsList,
      },
      defaultAdded: {
        name: "instagram",
        handle: "",
      },
    },
  ];
  const useFormReturn = useForm();
  const { register, handleSubmit, reset, getValues, setValue } = useFormReturn;
  useEffect(() => {
    reset({
      ...data,
      point: 1000,
      groupId: data?.group?.id || "",
      sns: data
        ? data.accountSns.map(({ name, handle }) => ({ name, handle }))
        : [],
      social: data?.socialType ? data.socialType : "NONE",
    });
  }, [data, reset]);
  // useEffect(() => {
  //   if (groupData.length === 0) return;
  //   const [groupId] = getValues(["groupId"]);
  //   if (!groupId) setValue("groupId", groupData[0].id);
  // }, [groupData]);

  const doSave = async (d: any) => {
    const { nickname, sex, groupId, point, phone, sns } = d;
    await editEachUserAPI(id as string, {
      nickname,
      sex,
      groupId: groupId === "" ? null : groupId,
      point: parseInt(point),
      phone,
      sns,
    });
    mutate();
    openPopup({ type: "black", title: "수정이 완료되었습니다." });
  };
  const saveHandler = handleSubmit((d) =>
    openPopup({
      type: "orange",
      title: "수정하시겠습니까?",
      buttonList: [
        { type: "close" },
        { type: "orange", text: "수정하기", callback: () => doSave(d) },
      ],
    })
  );

  return (
    <MainContainer type="admin">
      {component}
      <LeftRight>
        <MainTitle>일반회원관리</MainTitle>
        <MainButton
          styleType="orange"
          type="submit"
          onClick={saveHandler}
          small
        >
          저장하기
        </MainButton>
      </LeftRight>
      <GapMaker height={24} />
      <form className="w-full flex gap-6" onSubmit={saveHandler}>
        <FullCard>
          <MainTitle little>계정 프로필</MainTitle>
          <div className="flex w-full flex-col gap-3 mt-3">
            {AdminUserInfoLeftList.map((d) => (
              <NewLabelInput {...d} useForm={useFormReturn} key={d.inputName} />
            ))}
          </div>
        </FullCard>
        <FullCard>
          <div className="flex w-full flex-col gap-3">
            {AdminUserInfoRightList.map((d) => (
              <NewLabelInput {...d} useForm={useFormReturn} key={d.inputName} />
            ))}
          </div>
        </FullCard>
      </form>
    </MainContainer>
  );
};

export default AdminUserInfo;
