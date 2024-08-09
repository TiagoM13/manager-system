import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.VITE_BASE_URL_API,
});

export const msHosp = axios.create({
  baseURL: process.env.URL_API_HOSP || '',
});
