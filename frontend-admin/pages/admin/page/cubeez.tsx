/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import { CKEditor } from "../../../components/Ckeditor";
import GapMaker from "../../../components/GapMaker";
import LeftRight from "../../../components/LeftRight";
import MainButton from "../../../components/MainButton";
import { MainContainer } from "../../../components/MainContainer";
import MainTitle from "../../../components/MainTitle";
import { WrappedCKEditor } from "../../../components/WrappedCkeditor";
import { secondArgsFetcher } from "../../../utils/api";
import { getHomeAPI, putHomeAPI } from "../../../utils/api/home";
import useIconPopup from "../../../utils/useIconPopup";
import usePopup from "../../../utils/usePopup";

export const Cubeez = () => {
  const useFormReturn = useForm();
  const { handleSubmit, reset, setValue } = useFormReturn;
  const { component } = usePopup();
  const { component: iconComponent, openPopup: openIconPopup } = useIconPopup();
  const saveHandler = handleSubmit(async (d) => {
    console.log(d);
    const result = await putHomeAPI("CUBEEZ", d.ck);
    console.log("cubeez put", result);
    if (result) {
      openIconPopup({
        title: "저장이 완료되었습니다.",
        type: "black",
      });
      setValue("ck", d.ck);
    }
  });
  const [preview, setPreview] = useState<any>();
  const previewHandler = handleSubmit(async (d) => {
    setPreview(
      <div className="w-full">
        <div
          dangerouslySetInnerHTML={{
            __html: d.ck,
          }}
        ></div>
      </div>
    );
  });

  const { data } = useSWR(
    ["/home/content", "CUBEEZ"],
    secondArgsFetcher(getHomeAPI)
  );
  useEffect(() => {
    console.log(data);
    if (data?.result?.content) {
      reset({
        ck: data?.result.content,
      });
    }
  }, [data]);

  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>큐비즈 소개 작성</MainTitle>
        <ButtonLine>
          <MainButton
            form="Cubeez"
            styleType="gray"
            type="submit"
            onClick={previewHandler}
          >
            미리보기
          </MainButton>
          <MainButton
            form="Cubeez"
            styleType="black"
            onClick={saveHandler}
            type="submit"
          >
            저장하기
          </MainButton>
        </ButtonLine>
      </LeftRight>
      <GapMaker height={24} />
      <form id="Cubeez" onSubmit={handleSubmit((d) => console.log(d))}>
        <WrappedCKEditor name="ck" useForm={useFormReturn} />
      </form>
      {preview}
      <GapMaker height={24} />
      <LeftRight>
        <div></div>
        <ButtonLine>
          <MainButton
            form="Cubeez"
            styleType="gray"
            onClick={previewHandler}
            type="submit"
          >
            미리보기
          </MainButton>
          <MainButton
            form="Cubeez"
            styleType="black"
            onClick={saveHandler}
            type="submit"
          >
            저장하기
          </MainButton>
        </ButtonLine>
      </LeftRight>
    </MainContainer>
  );
};

export default Cubeez;
