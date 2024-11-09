import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const baseURL = 'http://api.gnose.app';
const origin = 'https://gnose.app';

interface ApiResponse<T> {
  data: T;
  error: string | null;
}

const fetchWithBaseUrl = async <T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${baseURL}${path}`, {
      ...options,
      headers: {
        Origin: origin,
        ...(options?.headers || {}),
      },
    });
    const data = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: {} as T,
      error: (error as Error).message,
    };
  }
};

export { fetchWithBaseUrl };
