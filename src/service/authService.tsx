import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {appAxios} from './apiInterceptors';

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {phone});
    const {accessToken, refreshToken, customer} = response.data;
    
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
   
    
    setUser(customer);
  } catch (error) {
    console.log('Login Error', error);
  }
};

export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const {accessToken, refresToken, deliveryPartner} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refresToken', refresToken);
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error) {
    console.log('Login Error', error);
  }
};

export const refresh_tokens = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });
    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refresToken;

    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refresToken', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log('REFRESH TOKEN ERROR', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};

// Change Or Update the User Profile again Fetch The User
// AUthorise User can Fetch Their Information
export const refreshUser = async (setUser: any) => {
  try {
    const response = await appAxios.get('/user');
    setUser(response.data.user);
  } catch (error) {
    console.log('Login Error', error);
  }
};

export const updateUserLocation = async (data: any, setUser: any) => {
  try {
    const response = await appAxios.patch(`/user`, data);
    refreshUser(setUser);
  } catch (error) {
    console.log('updateUserLocation Error', error);
  }
};
