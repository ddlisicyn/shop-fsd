import { request } from '../../../shared/api/request';
import { Response } from '../model/response';

export const getProducts = (page = 1, category: string) =>
  request<Response>(`api/?category=${category}&page=${page}`, 'GET', null);
