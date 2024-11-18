import { request } from '../../../shared/api/request';
import { Response } from '../model/response';

export const getProducts = (page = 1) =>
  request<Response>(`api/?page=${page}`, 'GET', null);
