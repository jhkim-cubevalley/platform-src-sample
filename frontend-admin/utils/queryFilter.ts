export const queryFilter = (query?: { [x: string]: any }) => {
  if (!query) return {};
  return Object.keys(query).reduce((prev, curr) => {
    const value = query[curr];
    if (value === "" || value === "ALL" || value === "all" || value === null) {
      return prev;
    } else {
      return { ...prev, [curr]: value };
    }
  }, {});
};
