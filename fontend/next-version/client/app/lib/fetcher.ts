const BASE_URL = "http://localhost:4000"; // Replace with your base URL

export const fetcher = async (url: string, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
