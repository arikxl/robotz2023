import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import React, { useContext, useEffect, useReducer } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import Layout from '@/components/Layout'
import { getError } from '@/utils/error';
import { useRouter } from 'next/router'


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true };
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true };
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, errorPay: action.payload };
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false, errorPay: '' };
        default:
            state;
    }
};

const OrderPage = () => {

    const { query } = useRouter();
    const orderId = query.id;

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(
        reducer,
        {
            loading: true,
            order: {},
            error: ''
        }
    );

    const { paymentMethod, orderItems, itemsPrice, taxPrice, isPaid, totalPrice,
        shippingPrice, paidAt, isDelivered, deliveredAt, shippingAddress
    } = order;

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
        if (!order._id || successPay || (order._id && order._id !== orderId)) {
            fetchOrder();
            if (successPay) {
                dispatch({ type: 'PAY_RESET' });
            }
        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/keys/paypal');
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            };
            loadPaypalScript();
        }
    }, [orderId, order, paypalDispatch, successPay]);


    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [{ amount: { value: totalPrice } }]
            }).then((orderId) => {
                return orderId
            })
    }

    function onApprove(data, actions) {
        return actions.order.capture()
            .then(async function (details) {
                try {
                    dispatch({ type: 'PAY_REQUEST' });
                    const { data } = await axios.put(
                        `/api/orders/${order._id}/pay`,
                        details
                    );
                    dispatch({ type: 'PAY_SUCCESS', payload: data });
                    toast.success('Order is paid successfully')
                } catch (error) {
                    dispatch({ type: 'PAY_FAIL', payload: getError(error) });
                    toast.error(getError(error));
                }
            })
    }

    function onError(error) {
        toast.error(getError(error));
    }

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
                                                <div>${itemsPrice + shippingPrice + taxPrice}</div>
                                            </div>
                                        </li>
                                        {!isPaid && (
                                            <li>
                                                {isPending
                                                    ? (<div>LOADING...</div>)
                                                    : (
                                                        <div className='w-full'>
                                                            <PayPalButtons>
                                                                createOrder={createOrder}
                                                                onApprove={onApprove}
                                                                onError={onError}
                                                            </PayPalButtons>
                                                        </div>
                                                    )
                                                }
                                                {loadingPay && (<div>LOADING...</div>)}
                                            </li>
                                        )}
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