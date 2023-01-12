import { useRouter } from "next/router";
import { ProductPacakgeEventIndex } from "../../../../../../components/Product/Package/EventIndex";
import { useLoginCheck } from "../../../../../../utils/useLogin";

export const ProductPacakgeEach = () => {
  const router = useRouter();
  const loginCheck = useLoginCheck();
  const { id } = router.query as { id: string };
  // const isNew = id === "new";
  return <ProductPacakgeEventIndex type="admin" id={parseInt(id)} />;
};

export default ProductPacakgeEach;
