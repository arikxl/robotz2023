import React, { useEffect, useReducer } from 'react';
import Link from 'next/link';
import axios from 'axios';

import Layout from "@/components/Layout";
import { getError } from '../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


const OrdersHistory = () => {

  const [{ loading, orders, error }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: ''
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/orders/history');
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    fetchOrders();
  }, [])


  return (
    <Layout title="Orders History">
      <h1 className='mb-4 text-xl'>Orders History</h1>
      {loading
        ? (<div>LOADING...</div>)
        : error
          ? (<div className='err'>{error}</div>)
          : (
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <thead className='border-b'>
                  <tr>
                    <th className='px-5 text-left'>ID</th>
                    <th className='px-5 text-left'>DATE</th>
                    <th className='px-5 text-left'>TOTAL</th>
                    <th className='px-5 text-left'>PAID</th>
                    <th className='px-5 text-left'>DELIVERED</th>
                    <th className='px-5 text-left'>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className='border-b'>
                      <td className='px-5 '>{order._id.slice(-5)}</td>
                      <td className='px-5 '>{order.createdAt.substring(0, 10)}</td>
                      <td className='px-5 '>${order.totalPrice}</td>
                      <td className='px-5 '>
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'Not paid'}
                      </td>
                      <td className='px-5 '>
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0,10)}`
                          : 'Not delivered'}
                      </td>
                      <td className='px-5 '>
                        <Link href={`/order/${order._id}`} passHref className='text-blue-500 underline'>Details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      }
    </Layout>
  )
}

export default OrdersHistory

OrdersHistory.auth = true;