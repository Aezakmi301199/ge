import axios from 'axios';
import { environments } from './environment';

const apiClient = axios.create({
  baseURL: `${environments.VITE_BITRIX_URL}${environments.VITE_LASTNAME}`,
});

//для localhost
apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${environments.VITE_TEMP_TOKEN}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
