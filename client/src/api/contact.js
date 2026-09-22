import api from "./axios";

export const sendContactMessage = async (payload) => {
  const { data } = await api.post("/contact", payload);
  return data;
};
