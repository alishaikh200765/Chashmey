import api from "./axios";

export const fetchReviews = async (params = {}) => {
  const { data } = await api.get("/reviews", { params });
  return data; // { items, total, page, totalPages }
};
