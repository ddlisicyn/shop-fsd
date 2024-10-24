import { useQuery } from "react-query";
import { request } from "../../../shared/api/request";
import { Product } from "../../../entities/product/model/product";

export const useGetAllProducts = () => useQuery('products', () => request<Product[]>('api', 'GET', null));