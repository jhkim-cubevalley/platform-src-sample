import { useForm } from "react-hook-form";
import useSWR from "swr";
import { secondArgsFetcher } from "../utils/api";
import {
  eachIncentiveI,
  getEachIncentiveAPI,
  postIncentiveAnswerAPI,
} from "../utils/api/incentive";
import { formatDate } from "../utils/formatDate";
import { openIconPopupType } from "../utils/useIconPopup";
import useLogin, { useLoginCheck } from "../utils/useLogin";
import ColorBanner from "./ColorBanner";
import LeftRight from "./LeftRight";
import LoginContainer from "./LoginContainer";
import MainButton from "./MainButton";
import MainTitle from "./MainTitle";
import styles from "./IncentiveInquiryTable.module.css";
import { formatPhone } from "../utils/formatPhone";

const completeSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="#00192F" />
    <path
      d="M6.36035 12.0213L10.3903 16.2328L17.4908 8.8125"
      stroke="white"
      strokeWidth="3.09062"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const answerSvg = (
  <svg
    width="16"
    height="22"
    viewBox="0 0 16 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 1C2 0.447715 1.55228 0 1 0C0.447715 0 0 0.447715 0 1H2ZM1 14H0C0 14.5523 0.447715 15 1 15L1 14ZM15.7071 14.7071C16.0976 14.3166 16.0976 13.6834 15.7071 13.2929L9.34315 6.92893C8.95262 6.53841 8.31946 6.53841 7.92893 6.92893C7.53841 7.31946 7.53841 7.95262 7.92893 8.34315L13.5858 14L7.92893 19.6569C7.53841 20.0474 7.53841 20.6805 7.92893 21.0711C8.31946 21.4616 8.95262 21.4616 9.34315 21.0711L15.7071 14.7071ZM0 1V14H2V1H0ZM1 15H15V13H1V15Z"
      fill="#FF5C00"
    />
  </svg>
);

// interface QuestionProps {
//   title: string;
//   people: number;
//   region: eachRegionI;
//   isFlight: boolean;
//   date: string;
//   goal: string;
//   description: string;
//   phone: string;
//   createdAt: string;
//   content: string;
//   about?: string;
//   isReply?: boolean;
// }
// interface IncentiveQuestionProps {
//   title: string;
//   createdAt: string;
//   about?: string;
//   isReply?: boolean;
// }

const IncentiveQuestion = ({ props }: { props: eachIncentiveI }) => {
  // const { title, createdAt, about = null, isReply = false } = props;
  const dummyUseForm = useForm();
  return (
    <div className="w-full flex flex-col gap-4 bg-white p-9 rounded shadow">
      <LeftRight>
        <div>
          <ColorBanner type="black">인센티브 여행</ColorBanner>
        </div>
        <div className="text-lg text-[#545454] font-semibold">
          {formatDate(props.createdAt)}
        </div>
      </LeftRight>
      <div className="w-full flex font-bold items-center gap-3 text-[#00192F] text-[22px]">
        {/* {props.answer && answerSvg} */}
        {props.title}
      </div>

      <div className="w-full text-[17px] text-[#00192F] whitespace-pre-wrap">
        <table className={styles.table}>
          <tr>
            <th>여행인원</th>
            <td>{props.people}</td>

            <th>여행지역</th>
            <td>{props.region.name}</td>

            <th>항공권 포함</th>
            <td>{props.isFlight ? "포함" : "미포함"}</td>
          </tr>
          <tr>
            <th>여행목적</th>
            <td colSpan={3}>{props.goal}</td>

            <th>여행날짜</th>
            <td>{formatDate(props.date)}</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>{formatPhone(props.phone)}</td>
          </tr>
          <tr>
            <th>내용</th>
          </tr>
          <tr>
            <td colSpan={6} className="text-justify">
              {props.description}
            </td>
          </tr>
        </table>
      </div>
      {/* {about && (
        <div className="w-full">
          <NewLabelInput
            inputName="asdf"
            useForm={dummyUseForm}
            labelName="선택 상품"
            value={about}
            disabled
            gridLabel
          />
        </div>
      )} */}
    </div>
  );
};

interface AnswerProps {
  author: string;
  createdAt: string;
  content: string;
  isReply?: boolean;
}

const Answer = (props: AnswerProps) => {
  const { author, createdAt, content, isReply = true } = props;

  return (
    <div className="w-full flex gap-4 bg-[#E3E3E3] p-9 rounded shadow items-start">
      {isReply && <div className=" shrink-0">{answerSvg}</div>}
      <div className="w-full flex flex-col gap-4">
        <LeftRight>
          <div className="flex font-bold items-center gap-3 text-[#00192F] text-[22px]">
            {author}
          </div>
          <div className="text-lg text-[#545454] font-semibold">
            {createdAt}
          </div>
        </LeftRight>
        <div className="w-full text-[17px] text-[#00192F] whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
};

const AnswerComplete = () => {
  return (
    <div className="w-full flex justify-start gap-4">
      {completeSvg}
      <div className="font-bold text-xl text-[#00192F]">
        답변이 완료되었습니다!
      </div>
    </div>
  );
};

const Reply = ({
  onSubmit,
}: {
  onSubmit: (content: string, id?: number) => void;
}) => {
  const { register, handleSubmit } = useForm();
  return (
    <div className="w-full flex gap-4 bg-[#E3E3E3] p-9 rounded shadow items-start">
      <div className=" shrink-0">{answerSvg}</div>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit((d) => onSubmit(d.content, d.id))}
      >
        <textarea
          rows={5}
          placeholder="내용을 입력해 주세요."
          className="p-4 rounded text-[17px]"
          {...register("content", { required: true })}
        />
        <div className=" self-end">
          <MainButton styleType="orange">보내기</MainButton>
        </div>
      </form>
    </div>
  );
};

export const IncentiveInquiry = ({
  id,
  closePopup,
  openIconPopup,
}: {
  id: number;
  closePopup: (callback?: () => void) => void;
  openIconPopup: openIconPopupType;
}) => {
  const onAnswerSubmit = async (content: string) => {
    const res = await getEachIncentiveAPI(id);
    const idx = res.id;
    const result = await postIncentiveAnswerAPI(content, idx);
    if (result) {
      console.log("Add answer submit", result);
      closePopup(() =>
        openIconPopup({
          type: "black",
          title: "답변이 완료되었습니다.",
        })
      );
    } else {
      alert(result);
    }
    console.log(content);
    location.reload();
  };
  // const onAnswerSubmit = async (content: string) => {
  //   const res = await getEachIncentiveAPI(id);
  //   const idx = res.id;
  //   const result = await postInquiryAnswerAPI(idx, content);
  //   if (result) {
  //     console.log("Add answer submit", result);
  //     closePopup(() =>
  //       openIconPopup({
  //         type: "black",
  //         title: "답변이 완료되었습니다.",
  //       })
  //     );
  //   } else {
  //     alert(result);
  //   }
  //   console.log(content);
  //   location.reload();
  // };

  const loginCheck = useLoginCheck();

  const { data } = useSWR(
    loginCheck([`/incentive/${id}`, id]),
    secondArgsFetcher(getEachIncentiveAPI)
  );
  console.log(data);

  const { loginData } = useLogin();

  return (
    <LoginContainer className=" overflow-y-auto scrollbar-hide">
      <MainTitle>문의 내용</MainTitle>
      <div className="w-full flex flex-col gap-4 mt-4 max-h-[50vh]">
        {data && (
          <>
            {data.answer && data.updatedAt && <AnswerComplete />}
            <IncentiveQuestion props={data} />

            {data.updatedAt && data.answer && (
              <Answer
                author={data?.manager.name}
                content={data.answer}
                createdAt={formatDate(data.updatedAt)}
              />
            )}
            {!data.answer &&
              loginData.login &&
              loginData.info.uid !== data.user.uid && (
                <Reply onSubmit={onAnswerSubmit} />
              )}
          </>
        )}
      </div>
    </LoginContainer>
  );
};

export default IncentiveInquiry;
