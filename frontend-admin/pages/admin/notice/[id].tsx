/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import { CKEditor } from "../../../components/Ckeditor";
import GapMaker from "../../../components/GapMaker";
import {
  LabelInputPropsType,
  NewLabelInput,
} from "../../../components/LabelInput";
import LeftRight from "../../../components/LeftRight";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTitle from "../../../components/MainTitle";
import SearchGrid from "../../../components/SearchGrid";
import { WrappedCKEditor } from "../../../components/WrappedCkeditor";
import { secondArgsFetcher } from "../../../utils/api";
import { putHomeAPI } from "../../../utils/api/home";
import {
  editNoticeAPI,
  getEachNoticeAPI,
  getNoticeAPI,
  postNoticeAPI,
} from "../../../utils/api/notice";
import useIconPopup from "../../../utils/useIconPopup";
import { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";

const targetList = [
  { value: "user", name: "일반 회원" },
  { value: "cubeez", name: "큐비즈" },
];

const CreateNoticeLabelList: LabelInputPropsType[] = [
  {
    inputType: "input",
    labelName: "제목",
    inputName: "title",
    gridLabel: true,
    gridRow: 1,
    gridCol: 1,
    isRequired: true,
  },
  {
    inputType: "select",
    labelName: "대상",
    inputName: "target",
    optionList: [{ value: "all", name: "모두" }, ...targetList],
    gridLabel: true,
    gridRow: 1,
    gridCol: 2,
    isRequired: true,
  },
];

export const CreateNotice = () => {
  const useFormReturn = useForm();
  const { handleSubmit, reset, setValue } = useFormReturn;
  const { component } = usePopup();
  const { component: iconComponent } = useIconPopup();
  const router = useRouter();
  const loginCheck = useLoginCheck();
  const { id } = router.query as { id: string };
  const { data, mutate } = useSWR(
    loginCheck(["/notice/uid", id]),
    secondArgsFetcher(getEachNoticeAPI)
  );
  const saveHandler = handleSubmit(async (d) => {
    console.log(d);
    const result = await editNoticeAPI(d.title, d.ck, d.target, "notice", id);
    console.log("notice post", result);
    goEnd(d);
  });
  const tmpsaveHandler = handleSubmit(async (d) => {
    console.log(d);
    const result = await editNoticeAPI(d.title, d.ck, d.target, "temp", id);
    console.log("notice temp post", result);
    goEnd(d);
  });
  const goEnd = (data: any) => {
    console.log(data);
    router.back();
  };
  useEffect(() => {
    console.log(data);
    reset({
      title: data?.title,
      status: data?.status,
      ck: data?.content,
      target: data?.target,
    });
    setValue("ck", data?.content);
  }, [data, reset, setValue]);
  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <MainTitle>공지사항 작성</MainTitle>
      <GapMaker height={24} />
      <form
        className="w-full"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <SearchGrid rows={1}>
          {CreateNoticeLabelList.map((d) => (
            <NewLabelInput
              {...d}
              useForm={useFormReturn}
              key={d.inputName}
              small
            />
          ))}
        </SearchGrid>
        {/* </form>
      <form id="Cubeez" onSubmit={handleSubmit((d) => console.log(d))}> */}
        <GapMaker height={24} />

        <WrappedCKEditor name="ck" useForm={useFormReturn} />
      </form>
      <GapMaker height={24} />

      <LeftRight>
        <div></div>
        <ButtonLine>
          <MainButton
            form="Cubeez"
            styleType="gray"
            onClick={tmpsaveHandler}
            type="submit"
          >
            임시저장
          </MainButton>
          <MainButton
            form="Cubeez"
            styleType="black"
            onClick={saveHandler}
            type="submit"
          >
            추가하기
          </MainButton>
        </ButtonLine>
      </LeftRight>
    </MainContainer>
  );
};

export default CreateNotice;
