import { PropsWithChildren } from "react";
import styles from "./BoardTable.module.css";

export const BoardTableDiv = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export const BoardTable = (props: PropsWithChildren) => {
  const { children } = props;
  return <table className={styles.table}>{children}</table>;
};

export default BoardTable;
