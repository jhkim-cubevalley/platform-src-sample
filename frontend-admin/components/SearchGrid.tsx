import { PropsWithChildren } from "react";

interface SearchGridProps {
  rows: number;
  cols?: number;
  className?: string;
}

export const SearchGrid = (props: PropsWithChildren<SearchGridProps>) => {
  const { rows, cols = 4, className = "", children } = props;
  return (
    <div
      className="grid gap-x-8 gap-y-4 w-full"
      style={{
        gridTemplateRows: `repeat(${rows}, 32px)`,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

export default SearchGrid;
