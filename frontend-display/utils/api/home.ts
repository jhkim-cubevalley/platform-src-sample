import axios from ".";

export interface eachHomeI {
  id: string;
  type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const getHomeAPI = async (type: string) => {
  const res = await axios.get<{
    result: eachHomeI;
  }>(`/home/content`, {
    params: {
      type,
    },
  });
  return res.data;
};

// export interface createMenuI {
//   type: string;
//   content: string;
// }

export const putHomeAPI = async (type: string, content: string) => {
  const res = await axios.put<
    | {
        result: eachHomeI;
      }
    | {
        error: string;
        message: string;
      }
  >(`/home/content`, {
    type,
    content,
  });
  return res.data;
};
