import { RequestInit } from 'next/dist/server/web/spec-extension/request';

interface ApiResponse<T> {
  data: T;
  error: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchWithBaseUrl = async <T>(
  path: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
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
