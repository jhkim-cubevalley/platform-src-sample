interface GapMakerProps {
  width?: number;
  height?: number;
}

export const GapMaker = (props: GapMakerProps) => {
  const { width = 1, height = 1 } = props;
  return <div style={{ width: `${width}px`, height: `${height}px` }} />;
};

export default GapMaker;
