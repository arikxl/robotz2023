import React, { useEffect, useReducer } from 'react'
import axios from 'axios';

import { getError } from '../utils/error';
import Layout from "@/components/Layout"

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
    const fetchOrders = async() => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/orders/history');
        dispatch({ type: 'FETCH_SUCCESS', payload: data})
      } catch (error) {
        dispatch({type: 'FETCH_FAIL', payload:getError(error)})
      }
    }
    fetchOrders();
  }, [])
  

  return (
    <Layout title="Orders History">
      <h1>Orders History</h1>
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