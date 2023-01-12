import { PropsWithChildren } from "react";
import styles from "./MainTable.module.css";

export const MainTableDiv = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export const MainTable = (props: PropsWithChildren) => {
  const { children } = props;
  return <table className={styles.table}>{children}</table>;
};

export default MainTable;
