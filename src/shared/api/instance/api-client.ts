import axios, { AxiosRequestConfig } from 'axios';
import { environments } from '../../../environment';
import { AppEnv } from '../../enums/app-env.enum';

const apiClient = axios.create({
  baseURL: `${environments.VITE_BITRIX_URL}${environments.VITE_LASTNAME}`,
});

//для localhost
apiClient.interceptors.request.use(
  (config) => {
    if (environments.VITE_APP_ENV === AppEnv.DEV) {
      config.headers.Authorization = `Bearer ${environments.VITE_TEMP_TOKEN}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const apiClientInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const { data } = await apiClient({
    ...config,
    ...options,
  });

  return data;
};
export default apiClient;
