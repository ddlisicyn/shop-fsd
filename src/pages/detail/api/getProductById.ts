import { Product } from '../../../entities/product/model/product';
import { request } from '../../../shared/api/request';

export const getProductById = (id: string) =>
  request<Product>(`api/detail/${id}`, 'GET', null);
