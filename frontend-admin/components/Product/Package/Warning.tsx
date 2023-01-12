import { UseFormReturn } from "react-hook-form";
import { CKEditor } from "../../Ckeditor";
import FullCard from "../../FullCard";
import GapMaker from "../../GapMaker";
import MainTitle from "../../MainTitle";
import { WrappedCKEditor } from "../../WrappedCkeditor";

export const ProductPackageWarning = ({
  useForm,
}: {
  useForm: UseFormReturn;
}) => {
  return (
    <FullCard>
      <MainTitle>환불규정</MainTitle>
      <GapMaker height={16} />
      <WrappedCKEditor useForm={useForm} name="refund" />
      <GapMaker height={32} />
      <MainTitle>유의사항</MainTitle>
      <GapMaker height={16} />
      <WrappedCKEditor useForm={useForm} name="caution" />
    </FullCard>
  );
};
