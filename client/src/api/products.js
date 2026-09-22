import api from "./axios";

export const fetchProducts = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data; // { items, total, page, totalPages }
};

export const fetchBrands = async () => {
  const { data } = await api.get("/products/brands");
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
