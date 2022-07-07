import axios from 'axios';
import { updateToken } from './updateToken';

const httpClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1'
})

httpClient.interceptors.request.use(function (config) {

    config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' +  localStorage.getItem('access')
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

httpClient.interceptors.response.use(function (response) {
    return response;
  }, async function (error) {
    const originalConfig = error.config;
    if (error.response.status === 403 && !originalConfig._retry) {
        try {
            let newToken = await updateToken()
            originalConfig._retry = true;
            localStorage.setItem('access', newToken)
            originalConfig.headers = { 
                Authorization: 'Bearer ' + newToken
            }
            return httpClient(originalConfig)
        } catch (e) {
            // catch error when 'refresh' token expired redirect to login page
            return Promise.reject(e)
        }
        
    }
    return Promise.reject(error);
  });

export default httpClient;
