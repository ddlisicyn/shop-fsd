import { Product } from '../../../entities/product/model/product';
import { request } from '../../../shared/api/request';

export const getProductById = (id = '1') =>
  request<Product>(`api/detail/${id}`, 'GET', null);
