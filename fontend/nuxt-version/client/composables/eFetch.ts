import { useFetch } from "#app";

type useFetchType = typeof useFetch;

// wrap useFetch with configuration needed to talk to our API
export const eFetch: useFetchType = (path, options = {}) => {
  const auth = useAuth();

  // modify options as needed
  options.baseURL = `http://localhost:4000/`;
  options.retry = 3;
  options.retryDelay = 1000;

  // Add authentication token to request headers
  const token = auth.getToken();

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return useFetch(path, options);
};
