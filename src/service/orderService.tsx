import {appAxios} from './apiInterceptors';
import {BRANCH_ID} from './config';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post('/order', {
      items: items,
      branch: BRANCH_ID,
      totalPrice: totalPrice,
    });
    console.log("==> createOrder",response.data);
    
    return response.data;
  } catch (error) {
    console.log('Create Order Error', error);
    return null;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await appAxios.get(`/order/${id}`);
    console.log("==> getOrderById ", response.data);
    
    return response.data;
  } catch (error) {
    console.log('Fecth Order Error', error);
    return null;
  }
};
