import { API_URL } from '../config';

export const request = async <T = unknown>(
  endpoint: string,
  method: 'GET' | 'POST',
  body: BodyInit | null,
  headers = <Record<string, string>>{},
): Promise<T> => {
  try {
    const url = new URL(endpoint, API_URL);

    if (body) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, { method, body, headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так');
    }

    return data;
  } catch (e) {
    throw e;
  }
};
