import axios from 'axios';
import {BASE_URL} from './config';
import {refresh_tokens} from './authService';
import {tokenStorage} from '@state/storage';

// Only Authorise User can access the endpoint for that using interceptors
// Adding Access Token To The Authorization Header
export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async config => {
  const accessToken = tokenStorage.getString('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  response => response,
  async error => {
    console.log(error);
    
    if (error.response && error.response.status === 401) {
      //   IF TOKEN EXPIRE , REFRESH IT
      try {
        const newAccessToken = await refresh_tokens();

        if (newAccessToken) {
          //  AND AGAIN CALLED API
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log('ERROR REFRESHING TOKEN');
      }
    }

    if (error.response && error.response.status != 401) {
      const errorMessage =
        error.response.data.message || 'Something went wrong';
      console.log("=> apiInterceptors", errorMessage);
    }

    return Promise.resolve(error);
  },
);
