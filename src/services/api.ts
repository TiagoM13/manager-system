import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.VITE_BASE_URL_API,
});
