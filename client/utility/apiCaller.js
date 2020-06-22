import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const apiCaller = axios.create({
  baseURL: publicRuntimeConfig.baseApiUrl,
  auth: {
    username: publicRuntimeConfig.baseAuth.username,
    password: publicRuntimeConfig.baseAuth.password
  },
  timeout: 20000000
});

export { apiCaller };
