import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react';

import { Store } from '@/context/Store';
import Layout from '@/components/Layout'
import CheckoutWizard from '@/components/CheckoutWizard'

const ShippingPage = () => {

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('country', shippingAddress.country);
    setValue('zipCode', shippingAddress.zipCode);
  }, [setValue, shippingAddress])

  const submitHandler = ({ fullName, address, city, country, zipCode }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, country, zipCode }
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName, address, city, country, zipCode
        }
      })
    )
    router.push('/Payment')
  }

  return (
    <Layout title='Shipping'>
      <CheckoutWizard activeStep={1} />

      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Shipping Address</h1>
        <div className='mb-4'>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" className='w-full' id='fullName' autofocus
            {...register('fullName', { required: 'Please enter full name' })}
          />
          {errors.fullName && <div className='text-red-500' >{errors.fullName.message}</div>}
        </div>
        <div className='mb-4'>
          <label htmlFor="address">Address</label>
          <input type="text" className='w-full' id='address'
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 3, message: 'Address needs to be at least 3 characters' }
            })}
          />
          {errors.address && <div className='text-red-500' >{errors.address.message}</div>}
        </div>
        <div className='mb-4'>
          <label htmlFor="city">City</label>
          <input type="text" className='w-full' id='city'
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && <div className='text-red-500' >{errors.city.message}</div>}
        </div>
        <div className='mb-4'>
          <label htmlFor="zipCode">Zip Code</label>
          <input type="text" className='w-full' id='zipCode'
            {...register('zipCode', {
              required: 'Please enter zip code',
            })}
          />
          {errors.zipCode && <div className='text-red-500' >{errors.zipCode.message}</div>}
        </div>
        <div className='mb-4'>
          <label htmlFor="country">Country</label>
          <input type="text" className='w-full' id='country'
            {...register('country', {
              required: 'Please enter country',
            })}
          />
          {errors.country && <div className='text-red-500' >{errors.country.message}</div>}
        </div>
        <div className='mb-4 flex justify-between'>
          <button className='prm-btn'>Next</button>
        </div>
      </form>
    </Layout>
  )
}


export default ShippingPage

ShippingPage.auth = true;