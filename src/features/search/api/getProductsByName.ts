import { Product } from '../../../entities/product/model/product';
import { request } from '../../../shared/api/request';

export const getProductsByName = (name: string) =>
  request<Product[]>('api/list', 'POST', JSON.stringify({ name }));
