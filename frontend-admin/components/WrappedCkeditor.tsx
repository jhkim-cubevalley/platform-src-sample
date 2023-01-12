import dynamic from "next/dynamic";
export const WrappedCKEditor = dynamic(() => import("./Ckeditor"), {
  ssr: false,
});
