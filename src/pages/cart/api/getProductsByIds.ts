import { Product } from '../../../entities/product/model/product';
import { request } from '../../../shared/api/request';

export const getProductsByIds = (ids: string[]) =>
  request<Product[]>('api/detail/ids', 'POST', JSON.stringify({ ids }));
