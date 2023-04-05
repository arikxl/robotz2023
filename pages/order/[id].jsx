import Layout from '@/components/Layout'
import { Store } from '@/context/Store';
import { getError } from '@/utils/error';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'

import React, { useContext, useEffect, useReducer } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}


const OrderPage = () => {

    const { query } = useRouter();
    const orderId = query.id;

    // const { state } = useContext(Store);
    // const { cart } = state;
    // const {  shippingAddress } = cart;

    const [{ loading, error, order }, dispatch] = useReducer(
        reducer,
        {
            loading: true,
            order: {},
            error: ''
        }
    );

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/orders/${orderId}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }
        }
        if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
        }
    }, [orderId, order]);

    const { paymentMethod, orderItems, itemsPrice, taxPrice, isPaid,
        shippingPrice, paidAt, isDelivered, deliveredAt, shippingAddress } = order;
    // const { fullName } = shippingAddress;
    // console.log('fullName:', fullName)

    return (

        <Layout title={`Your order: ${orderId}`}>
            <h1 className='mb-4 text-xl'>{`Order: ${order._id?.slice(-5)}`}</h1>

            {loading
                ? (<div>LOADING...</div>)
                : error
                    ? (<div className='err'>{error}</div>)
                    : (
                        <div className='grid md:grid-cols-4 md:gap-5'>
                            <div className='overflow-x-auto md:col-span-3'>
                                <div className='card p-5'>
                                    <h2 className='mb-2 text-lg'>Shipping Address</h2>
                                    <div>
                                        {shippingAddress[0].fullName}. {shippingAddress[0].address},{' '}
                                        {shippingAddress[0].city}, {shippingAddress[0].country},{' '}
                                        {shippingAddress[0].zipCode}
                                    </div>
                                    {isDelivered
                                        ? (<div className='success' >isDelivered at: {deliveredAt}</div>)
                                        : (<div className='err'>Not delivered</div>)
                                    }
                                </div>

                                <div className='card p-5'>
                                    <h2 className='mb-2 text-lg'>Payment Method</h2>
                                    <div>{paymentMethod}</div>
                                    {isPaid
                                        ? (<div className='success'>Paid at : {paidAt}</div>)
                                        : (<div className='err'>Not Paid</div>)
                                    }
                                </div>

                                <div className='card p-5 overflow-x-auto'>
                                    <h2 className='mb-2 text-lg'>Order Items</h2>
                                    <table className='min-w-full'>
                                        <thead className='border-b'>
                                            <tr>
                                                <th className='px-5 text-left'>Item</th>
                                                <th className='p-5 text-right'>Price</th>
                                                <th className='p-5 text-center'>Quantity</th>
                                                <th className='p-5 text-right'>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderItems.map((item) => (
                                                <tr key={item.slug} className='border-b'>
                                                    <td className='items-center text-center'>
                                                        <Link href={`/product/${item.slug}`}
                                                            className='flex items-center flex-col md:flex-row'>
                                                            <Image src={item.img} alt={item.title}
                                                                width={100} height={100} className='mr-2' />
                                                            {item.title}
                                                        </Link>
                                                    </td>
                                                    <td className='p-5 text-right'>${item.price}</td>
                                                    <td className='p-5 text-center'>{item.qty}</td>
                                                    <td className='p-5 text-right'>${item.price * item.qty}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                                <div className='card p-5'>
                                    <h2 className='mb-2 text-lg'>Order Summery  </h2>
                                    <ul>
                                        <li>
                                            <div className='flex justify-between'>
                                                <div>Items</div>
                                                <div>${itemsPrice}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='flex justify-between'>
                                                <div>Shipping</div>
                                                <div>${shippingPrice}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='flex justify-between'>
                                                <div>Tax</div>
                                                <div>${taxPrice}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='flex justify-between'>
                                                <div>Total</div>
                                                <div>${itemsPrice+shippingPrice+taxPrice}</div>
                                            </div>
                                        </li>
                                        {/* <li>
                                            <button className='prm-btn' disabled={loading}
                                                onClick={PlaceOrderHandler}>
                                                {loading ? 'LOADING... ' : 'Place Order'}
                                            </button>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
            }


        </Layout>
    )
}

export default OrderPage;

OrderPage.auth = true;