import MainButton, { MainButtonProps } from "../MainButton";
import PopupTitle from "../PopupTitle";
import LoginText, { LoginTextProps } from "./LoginText";

const blackSvg = (
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

const orangeSvg = (
  <svg
    width="46"
    height="50"
    viewBox="0 0 46 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="22.6406" cy="27.3481" r="22.6406" fill="#FF5C00" />
    <path
      d="M20.9651 31.2222H24.309L25.0405 18.3691L25.2146 13.5274H20.0594L20.2336 18.3691L20.9651 31.2222ZM22.637 40.4877C24.4483 40.4877 25.8416 39.0247 25.8416 37.1437C25.8416 35.228 24.4483 33.7998 22.637 33.7998C20.8257 33.7998 19.4673 35.228 19.4673 37.1437C19.4673 39.0247 20.8257 40.4877 22.637 40.4877Z"
      fill="white"
    />
  </svg>
);

interface textI extends LoginTextProps {
  content: string;
}

interface buttonI extends MainButtonProps {
  content: string;
}

interface AlertProps {
  type: "black" | "orange";
  title: string;
  textList?: textI[];
  buttonList?: buttonI[];
}

const svgList = {
  black: blackSvg,
  orange: orangeSvg,
};

export const Alert = (props: AlertProps) => {
  const { type, title, textList = [], buttonList = [] } = props;
  return (
    <div className="w-full flex flex-col items-center">
      <PopupTitle>{title}</PopupTitle>
      <div className="w-full flex items-center justify-center mt-20 lg:mt-24">
        {svgList[type]}
      </div>
      <div className="w-full flex flex-col items-center gap-4 mt-8">
        {textList.map(({ content, ...etc }, i) => (
          <LoginText {...etc} key={`${content}${i}`}>
            {content}
          </LoginText>
        ))}
      </div>
      <div className="w-full flex flex-col items-center gap-4 mt-32 lg:mt-40">
        {buttonList.map(({ content, ...etc }, i) => (
          <MainButton {...etc} key={`${content}${i}`}>
            {content}
          </MainButton>
        ))}
      </div>
    </div>
  );
};
