import { cls } from "../utils/cls";

export interface LoginContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
}

export const LoginContainer = (props: LoginContainerProps) => {
  const { className = "", ...etc } = props;
  return (
    <div
      className={cls("w-full flex flex-col items-center", className)}
      {...etc}
    />
  );
};

export default LoginContainer;
