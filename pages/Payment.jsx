import Cookies from "js-cookie";
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

import { Store } from "@/context/Store"
import Layout from "@/components/Layout"
import CheckoutWizard from "@/components/CheckoutWizard"

const Payment = () => {

    const router = useRouter()
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push('/Shipping');
        }
        setSelectedPaymentMethod(paymentMethod || '')
    }, [paymentMethod, router, shippingAddress.address])



    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            return toast.error('Please choose payment method')
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
        Cookies.set(
            'cart',
            JSON.stringify({ 
                ...cart,
                paymentMethod: selectedPaymentMethod
            })
        )
        router.push('/PlaceOrder')
    }
    return (
        <Layout title='Payment'>
            <CheckoutWizard activeStep={2} />
            <form className='mx-auto max-w-screen-md' onSubmit={submitHandler}>
                <h1 className='mb-4 text-xl'>Payment Method</h1>
                {
                    ['PayPal', 'Cash'].map((payment) => (
                        <div key={payment} className='mb-4'>
                            <input type="radio" name='paymentMethod' id={payment}
                                className='p-2 outline-none focus:ring-0'
                                checked={selectedPaymentMethod === payment}
                                onChange={() => setSelectedPaymentMethod(payment)} />
                            <label htmlFor={payment} className='p-2'>{payment}</label>
                        </div>
                    ))
                }
                <div className='mb-4 flex justify-between'>
                    <button className='dft-btn' type='button'
                        onClick={() => router.push('/Shipping')}>
                        Back</button>
                    <button className='prm-btn'>Next</button>
                </div>
            </form>
        </Layout >
    )
}

export default Payment

Payment.auth = true;