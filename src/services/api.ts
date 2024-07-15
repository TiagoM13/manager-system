import axios from 'axios';

export const fetchdata = async (route: string): Promise<any> => {
  const response = await fetch(`http://localhost:3001/${route}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }

  return response.json();
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});
