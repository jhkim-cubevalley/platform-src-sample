import { useFieldArray, UseFormReturn } from "react-hook-form";
import { useTosAPI } from "../../../utils/api/tos";
import CustomInput from "../../CustomInput";
import CustomSelect from "../../CustomSelect";
import FullCard from "../../FullCard";
import MainButton from "../../MainButton";
import MainTitle from "../../MainTitle";

const tmpList = ["이용약관", "개인정보 이용 동의"];

export const ProductPacakgeTerms = ({
  useForm,
}: {
  useForm: UseFormReturn;
}) => {
  const { control, register, watch } = useForm;
  const { data: tosData } = useTosAPI();
  const termsFieldArray = useFieldArray({
    control,
    name: "tos",
  });
  return (
    <FullCard>
      <MainTitle>약관 설정</MainTitle>
      {tosData && (
        <div className="w-full flex flex-col gap-4 mt-8">
          {termsFieldArray.fields.map(({ id }, i) => (
            <div className="w-full flex gap-4" key={id}>
              <CustomSelect {...register(`tos.${i}`)}>
                <option value="">선택</option>
                {!tosData && <option value={watch(`tos.${i}`)}></option>}
                <optgroup label="이용약관">
                  {tosData?.result &&
                    tosData.result
                      .filter(
                        ({ type, isEnable }) => type === "TOS" && isEnable
                      )
                      .map(({ name, id }) => (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      ))}
                </optgroup>
                <optgroup label="개인정보 관련">
                  {tosData?.result &&
                    tosData.result
                      .filter(
                        ({ type, isEnable }) => type === "PRIVACY" && isEnable
                      )
                      .map(({ name, id }) => (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      ))}
                </optgroup>
                <optgroup label="여행 관련">
                  {tosData?.result &&
                    tosData.result
                      .filter(
                        ({ type, isEnable }) => type === "TRIP" && isEnable
                      )
                      .map(({ name, id }) => (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      ))}
                </optgroup>
                <optgroup label="관리자 추가">
                  {tosData?.result &&
                    tosData.result
                      .filter(
                        ({ type, isEnable }) => type === "ETC" && isEnable
                      )
                      .map(({ name, id }) => (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      ))}
                </optgroup>
              </CustomSelect>
              <MainButton
                styleType="black"
                type="button"
                onClick={() => termsFieldArray.remove(i)}
              >
                삭제하기
              </MainButton>
            </div>
          ))}
          <MainButton
            type="button"
            styleType="orange"
            onClick={() => termsFieldArray.append({ value: "" })}
          >
            추가하기
          </MainButton>
        </div>
      )}
    </FullCard>
  );
};
