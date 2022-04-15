import axios from "axios";
import { AddProductRequest, GetProductResponse } from "../Interfaces/product";
import { baseEndpoints } from "./endPoints";

const getProductListAPI = async () => {
  const { data } = await axios
    .get<GetProductResponse[]>(`${baseEndpoints.product}/products`)
    .then((response) => {
      return response;
    });
  return data;
};

const getProductCategory = async () => {
  const { data } = await axios
    .get<GetProductResponse[]>(`${baseEndpoints.product}/categories`)
    .then((response) => {
      return response;
    });
  return data;
};

const addProduct = async (values: AddProductRequest) => {
  const { data } = await axios
    .post<GetProductResponse[]>(`${baseEndpoints.product}/products`, values)
    .then((response) => {
      return response;
    });
  return data;
};

const getProductById = async (id: number) => {
  const { data } = await axios
    .get<GetProductResponse[]>(`${baseEndpoints.product}/products/${id}`)
    .then((response) => {
      return response;
    });
  return data;
};

const deleteProductById = async (id: string) => {
  const { data } = await axios
    .delete<GetProductResponse[]>(`${baseEndpoints.product}/products/${id}`)
    .then((response) => {
      return response;
    });
  return data;
};

export const productService = {
  getProductListAPI,
  getProductCategory,
  addProduct,
  getProductById,
  deleteProductById,
};
