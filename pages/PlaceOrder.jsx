

import Layout from '@/components/Layout'
import CheckoutWizard from '@/components/CheckoutWizard'
import { useContext } from 'react';
import { Store } from '@/context/Store';
import Link from 'next/link';

const PlaceOrder = () => {

    const { state, dispatch } = useContext(Store);
    const { cart: { cartItems, shippingAddress, paymentMethod } } = state;
    
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
                                        {shippingAddress.fullName}. {shippingAddress.address},{' ' }
                                        {shippingAddress.city}, {shippingAddress.zipCode},{' '}
                                        {shippingAddress.country }
                                    </div>
                                    <div> <Link href='/Shipping'>Edit</Link></div>
                                </div>
                                <div className='card p-5'>
                                    <h2 className='mb-2 text-lg'>Payment Method</h2>
                                    <div>{paymentMethod}</div>
                                    <div> <Link href='/Payment'>Edit</Link></div>
                                </div>
                                <div className='card p-5 overflow-x-auto'>
                                    <h2 className='mb-2 text-lg'>Order Items</h2>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='px-5 text-left'>Item</th>
                                                <th className='p-5 text-right'>Price</th>
                                                <th className='p-5 text-center'>Quantity</th>
                                                <th className='p-5 text-right'>Total</th>
                                            </tr>
                                        </thead>
                                        
                                    </table>
                                    <div> <Link href='/Cart'>Edit</Link></div>
                                </div>
                            </div>

                        </div>
                    )
            }
        </Layout>
    )
}

export default PlaceOrder