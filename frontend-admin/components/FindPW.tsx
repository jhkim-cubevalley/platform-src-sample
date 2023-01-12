import Link from "next/link";
import { useState } from "react";
import LoginButton from "./LoginButton";
import LoginContainer from "./LoginContainer";
import LoginInput from "./LoginInput";
import LoginText from "./LoginText";

export const finishSvg = (
	<svg
		width="46"
		height="46"
		viewBox="0 0 46 46"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="22.6406" cy="22.6406" r="22.6406" fill="#00192F" />
		<path
			d="M12 22.68L19.6034 30.626L33 16.626"
			stroke="white"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export const FindPW = () => {
	const [Finish, setFinish] = useState(false);
	if (Finish)
		return (
			<LoginContainer>
				{finishSvg}
				<LoginText className="my-6">
					적어주신 이메일(아이디)로{"\n"}임시 비밀번호를 보내드렸습니다.
				</LoginText>
				<LoginText className="font-semibold">확인 부탁드립니다.</LoginText>
				<Link href="/login">
					<LoginButton className="mt-32">확인</LoginButton>
				</Link>
			</LoginContainer>
		);
	return (
		<LoginContainer>
			<LoginText>가입하신 이메일 주소를 입력해주세요.</LoginText>
			<form
				className="w-full flex flex-col mt-10 gap-14"
				onSubmit={() => setFinish(true)}
			>
				<LoginInput type="email" placeholder="이메일 주소" required />
				<LoginButton>비밀번호 찾기</LoginButton>
			</form>
		</LoginContainer>
	);
};

export default FindPW;
