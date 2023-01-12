import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import ButtonLine from "../../../components/ButtonLine";
import GapMaker from "../../../components/GapMaker";
import LeftRight from "../../../components/LeftRight";
import { MainContainer } from "../../../components/MainContainer";
import MainTitle from "../../../components/MainTitle";
import {
  AdminTermsBox,
  TermsBox,
  TermsEdit,
} from "../../../components/TermsBox";
import { eachTosI, getTosAPI } from "../../../utils/api/tos";
import useIconPopup from "../../../utils/useIconPopup";
import useLogin, { useLoginCheck } from "../../../utils/useLogin";
import usePopup from "../../../utils/usePopup";
import { AddSvg } from "../library";

export const Terms = () => {
  const useFormReturn = useForm();
  const loginCheck = useLoginCheck();
  const { loginData } = useLogin();
  const router = useRouter();
  const { query } = router;
  const tosData = useSWR("/tos", getTosAPI);
  const personalInfoDataList: eachTosI[] = [];
  const travelDataList: eachTosI[] = [];
  const adminCustomDataList: eachTosI[] = [];

  tosData.data?.result.map((v, i) => {
    if (v.type === "PRIVACY") {
      personalInfoDataList.push(v);
    } else if (v.type === "TRIP") {
      travelDataList.push(v);
    } else if (v.type === "TOS") {
      personalInfoDataList.push(v);
    } else {
      adminCustomDataList.push(v);
    }
  });

  const { register, handleSubmit } = useFormReturn;

  const { component, openPopup, closePopup } = usePopup();
  const {
    openPopup: openIconPopup,
    closePopup: closeIconPopup,
    component: iconComponent,
  } = useIconPopup();

  const doDelete = async (idx: string) => {
    // const data = await deleteLibraryAPI(idx);
    // if ("error" in data) {
    //   alert(data.message);
    // } else {
    //   console.log(data.result);
    // }
    console.log(`${idx} 삭제`);
    openIconPopup({
      title: "삭제가 완료되었습니다.",
      type: "black",
    });
    location.reload();
  };

  const personalInfoDefaultList = [
    "개인정보이용동의",
    "이용약관",
    "큐비즈 약관",
  ];
  const travelDefaultList = [
    "국내여행표준약관",
    "해외여행표준약관",
    "국내여행특별약관",
    "해외여행특별약관",
    "자유여행약관",
  ];
  const adminCustomList: string[] = ["약관명"];
  // const [defaultList, setDefaultList] = useState();
  return (
    <MainContainer type="admin">
      {component}
      {iconComponent}
      <LeftRight>
        <MainTitle>약관 관리</MainTitle>
        <ButtonLine>
          <button
            onClick={() => {
              openPopup(
                <TermsEdit
                  termId=""
                  type={"create"}
                  closePopup={closePopup}
                  openIconPopup={openIconPopup}
                  isEnable={true}
                />
              );
            }}
          >
            {AddSvg}
          </button>
        </ButtonLine>
      </LeftRight>
      <GapMaker height={24} />
      <GapMaker height={24} />

      <div>
        <MainTitle>개인정보 관련</MainTitle>
        <GapMaker height={24} />
        <div className=" flex gap-4 flex-wrap">
          {personalInfoDataList.map((v, i) => (
            <TermsBox
              termId={v.id}
              termsTitle={v.name}
              key={"개인정보" + i}
              isEnable={v.isEnable}
            />
          ))}
        </div>
      </div>
      <GapMaker height={24} />

      <div>
        <MainTitle>여행 관련</MainTitle>
        <GapMaker height={24} />
        <div className=" flex gap-4 flex-wrap">
          {travelDataList.map((v, i) => (
            <TermsBox
              termId={v.id}
              termsTitle={v.name}
              key={"여행" + i}
              isEnable={v.isEnable}
            />
          ))}
        </div>
      </div>
      <GapMaker height={24} />
      <div>
        <MainTitle>관리자 추가 약관</MainTitle>
        <GapMaker height={24} />
        <div className=" flex gap-4 flex-wrap">
          {adminCustomDataList.map((v, i) => (
            <AdminTermsBox
              termId={v.id}
              termsTitle={v.name}
              createdAt={v.createdAt}
              isEnable={v.isEnable}
              key={"관리자" + i}
            />
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default Terms;
