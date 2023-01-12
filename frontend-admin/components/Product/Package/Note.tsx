import { useFieldArray, UseFormReturn } from "react-hook-form";
import { CKEditor } from "../../Ckeditor";
import CustomInput from "../../CustomInput";
import FullCard from "../../FullCard";
import GapMaker from "../../GapMaker";
import { EmptyInput, NewLabelInput } from "../../LabelInput";
import MainButton from "../../MainButton";
import MainTitle from "../../MainTitle";
import RoundFullBanner from "../../RoundFullBanner";
import { WrappedCKEditor } from "../../WrappedCkeditor";

export const ProductPackageNote = ({ useForm }: { useForm: UseFormReturn }) => {
  const { control, register } = useForm;
  const inFieldArray = useFieldArray({ control, name: "notes.in" });
  const notinFieldArray = useFieldArray({ control, name: "notes.notin" });
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex gap-8">
        <FullCard>
          <MainTitle>포함사항</MainTitle>
          <div className="w-full flex flex-col gap-4 my-6">
            {inFieldArray.fields.map(({ id }, i) => (
              <div key={id} className="w-full flex gap-4 items-center">
                <div className="w-[90%] flex flex-col gap-2 flex-shrink-0">
                  <NewLabelInput
                    labelName="제목"
                    useForm={useForm}
                    inputName={`notes.in.${i}.title`}
                  />
                  <NewLabelInput
                    labelName="설명"
                    useForm={useForm}
                    inputName={`notes.in.${i}.description`}
                    inputType="textarea"
                    rows={4}
                  />
                </div>
                <button type="button" onClick={() => inFieldArray.remove(i)}>
                  <RoundFullBanner type="black">X</RoundFullBanner>
                </button>
              </div>
            ))}
          </div>
          <MainButton
            type="button"
            styleType="black"
            onClick={() => inFieldArray.append({ title: "", description: "" })}
          >
            추가하기
          </MainButton>
        </FullCard>
        <FullCard>
          <MainTitle>불포함사항</MainTitle>
          <div className="w-full flex flex-col gap-4 my-6">
            {notinFieldArray.fields.map(({ id }, i) => (
              <div key={id} className="w-full flex gap-4 items-center">
                <div className="w-[90%] flex flex-col gap-2 flex-shrink-0">
                  <NewLabelInput
                    labelName="제목"
                    useForm={useForm}
                    inputName={`notes.notin.${i}.title`}
                  />
                  <NewLabelInput
                    labelName="설명"
                    useForm={useForm}
                    inputName={`notes.notin.${i}.description`}
                    inputType="textarea"
                    rows={4}
                  />
                </div>
                <button type="button" onClick={() => notinFieldArray.remove(i)}>
                  <RoundFullBanner type="black">X</RoundFullBanner>
                </button>
              </div>
            ))}
          </div>
          <MainButton
            type="button"
            styleType="black"
            onClick={() =>
              notinFieldArray.append({ title: "", description: "" })
            }
          >
            추가하기
          </MainButton>
        </FullCard>
      </div>
      <FullCard>
        <MainTitle>기타 참고사항</MainTitle>
        <GapMaker height={16} />
        <WrappedCKEditor useForm={useForm} name="moreNote" />
      </FullCard>
    </div>
  );
};
