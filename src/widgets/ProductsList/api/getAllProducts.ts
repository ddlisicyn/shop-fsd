import { useQuery } from "react-query";
import { request } from "../../../shared/api/request";

export const getAllProducts = () => useQuery('products', () => request('api', 'GET', null));