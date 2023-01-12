import axios from ".";

export const uploadImageAPI = async (img: File) => {
  const form = new FormData();
  form.append("upload", img);
  const res = await axios.post<{ url: string }>("/board/upload", form);
  return res.data.url;
};
