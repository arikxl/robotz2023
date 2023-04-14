import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import { Store } from '@/context/Store';
import { getError } from '@/utils/error';
import CheckoutWizard from '@/components/CheckoutWizard';

const PlaceOrder = () => {

    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems, shippingAddress, paymentMethod } = cart;
    const [loading, setLoading] = useState(false);

    const itemsPriceBeforeTax = cartItems.reduce((a, c) => a + c.qty * c.price, 0)

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = round2(itemsPriceBeforeTax / (1 + 0.17))
    const shippingPrice = itemsPriceBeforeTax > 199 ? 0 : round2(25 / (1 + 0.17));
    const taxPrice = round2((itemsPrice + shippingPrice) * 0.17);
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    useEffect(() => {
        if (!paymentMethod) {
            router.push('/Payment')
        }
    }, [paymentMethod, router])

    const {  data: session } = useSession();
    
    
    const PlaceOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            })
            setLoading(false);
            console.log(data._id)
            dispatch({ type: 'CART_CLEAR_ITEMS' })
            Cookies.set(
                'cart',
                JSON.stringify({
                    ...cart,
                    cartItems: []
                })
            );
            router.push(`/order/${data._id}`)
        } catch (error) {
            setLoading(false)
            toast.error(getError(error))
        }
    }

    return (
        <Layout title='Place Order'>
            <CheckoutWizard activeStep={3} />
            <h1 className='mb-4 text-xl'>Place Order</h1>
            {
                cartItems.length < 1
                    ? (<div>Your cart is empty. <Link href='/' className='underline'>Go shopping.</Link></div>)
                    : (
                        <div className='grid md:grid-cols-4 md:gap-5'>
                            <div className='overflow-x-auto md:col-span-3'>
                                <div className='card p-5'>
                                    <h2 className='mb-2 text-lg'>Shipping Address</h2>
                                    <div>
                                        {shippingAddress.fullName}. {shippingAddress.address},{' '}
                                        {shippingAddress.city}, {shippingAddress.country},{' '}
                                        {shippingAddress.zipCode}
                                    </div>
                                    <div> <Link href='/Shipping' className='underline text-indigo-500'>Edit</Link></div>
                                </div>
                                <div className='card p-5'>
                                    <h2 className='mb-2 text-lg'>Payment Method</h2>
                                    <div>{paymentMethod}</div>
                                    <div> <Link href='/Payment' className='underline text-indigo-500'>Edit</Link></div>
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
                                            {cartItems.map((item) => (
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
                                    <div> <Link href='/Cart' className='underline text-indigo-500'>Edit</Link></div>
                                </div>
                            </div>
                            <div>
                                <div className='card p-5'>
                                    <h2 className='mb-2 text-lg'>Order Summery</h2>
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
                                                <div>${totalPrice}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <button className='prm-btn' disabled={loading}
                                                onClick={PlaceOrderHandler}>
                                                {loading ? 'LOADING... ' : 'Place Order'}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
            }
        </Layout>
    )
}

export default PlaceOrder

PlaceOrder.auth = true;