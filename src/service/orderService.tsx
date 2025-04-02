import {appAxios} from './apiInterceptors';
import {BRANCH_ID} from './config';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post('/order', {
      items: items,
      branch: BRANCH_ID,
      totalPrice: totalPrice,
    });
    // console.log("==> createOrder",response.data);

    return response.data;
  } catch (error) {
    console.log('Create Order Error', error);
    return null;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await appAxios.get(`/order/${id}`);
    console.log('==> getOrderById ', response.data);

    return response.data;
  } catch (error) {
    console.log('Fecth Order Error', error);
    return null;
  }
};

export const fethcCustomerOrders = async (userId: string) => {
  try {
    const response = await appAxios.get(`/order?customerId=${userId}`);
    return response.data;
  } catch (error) {
    console.log(`Fethc Customer Order error`, error);
    return null;
  }
};

export const fetchOrders = async (
  status: string,
  userId: string,
  branchId: string,
) => {
  console.log(userId);

  let uri =
    status == 'available'
      ? `/order?status=${status}&branchId=${branchId}`
      : `/order?branchId=${branchId}&deliveryPartnerId=${userId}&status=delivered`;
  try {
    const response = await appAxios.get(uri);
    console.log('==> OrderService fetchOrders ', response.data);

    return response.data;
  } catch (error) {
    console.log(`Fethc Delivery Order Error`, error);
    return null;
  }
};

export const sendLiveOrderUpdates = async (
  id: string,
  location: any,
  status: string,
) => {
  console.log('==> sendLiveOrderUpdates ', id, location, status);

  try {
    const response = await appAxios.patch(`/order/${id}/status`, {
      deliveryPersonLocation: location,
      status,
    });

    return response.data;
  } catch (error) {
    console.log('SendLiveOrderUpdates Error', error);
    return null;
  }
};

export const confirmOrder = async (id: string, location: any) => {
  // console.log("==> ", id , location);

  try {
    const response = await appAxios.post(`/order/${id}/confirm`, {
      deliveryPersonLocation: location,
    });
    console.log('==> confirmOrder', response.data);

    return response.data;
  } catch (error) {
    console.log('confirmOrder Error', error);
    return null;
  }
};
