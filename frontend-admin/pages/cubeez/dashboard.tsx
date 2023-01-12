import { useForm } from "react-hook-form";
import { CKEditor } from "../../components/Ckeditor";
import { MainContainer } from "../../components/MainContainer";
import { WrappedCKEditor } from "../../components/WrappedCkeditor";

export const CubeezDashboard = () => {
  const useFormReturn = useForm();
  const { handleSubmit, setValue } = useFormReturn;
  return (
    <MainContainer type="cubeez">
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <WrappedCKEditor name="ck" useForm={useFormReturn} />
        <button>asdf</button>
        <button
          type="button"
          onClick={() => setValue("ck", "<h1>Hello, World</h1>")}
        >
          Hello
        </button>
      </form>
    </MainContainer>
  );
};

export default CubeezDashboard;
