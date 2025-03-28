// export const BASE_URL = 'http://localhost:3000/api'

import {Platform} from 'react-native';

// export const SOCKEt_URL = 'http://localhost:3000'
export const GOOGLE_MAP_API = '';

// USE your network IP or hosted url
// export const BASE_URL = 'http://172.20.10.4:3000/api'
export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api';
export const SOCKEt_URL =
  Platform.OS === 'android'
    ? 'http://172.20.10.4:3000'
    : 'http://localhost:3000';


export const BRANCH_ID = '67e3f0429ecc2833fc884821'   