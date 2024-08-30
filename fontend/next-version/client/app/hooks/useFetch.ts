import { useState, useEffect } from "react";

interface FetchDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  retries?: number;
}

function useFetch<T>(url: string, options?: FetchOptions): FetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { method = "GET", headers, body, retries = 0 } = options || {};
      let attempts = 0;

      while (attempts <= retries) {
        try {
          const response = await fetch(`http://localhost:4000${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          setData(result);
          setLoading(false);
          break;
        } catch (error) {
          attempts++;
          if (attempts > retries) {
            setError(error as Error);
            setLoading(false);
          }
        }
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
}

export async function fetchData<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  const { method = "GET", headers, body, retries = 0 } = options || {};
  let attempts = 0;

  while (attempts <= retries) {
    try {
      const response = await fetch(`http://localhost:4000${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = (await response.json()) as T;
      return result;
    } catch (error) {
      attempts++;
      if (attempts > retries) {
        throw error;
      }
    }
  }

  throw new Error("Failed to fetch data");
}

export default useFetch;
