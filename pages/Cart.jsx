import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { XCircleIcon } from '@heroicons/react/outline';

import { Store } from '@/context/Store';
import Layout from '@/components/Layout';


const CartPage = () => {

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems }, } = state;

  const removeItemHandler = (item) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    }
  }

  const updateCartHandler = (item, amount) => {
    const qty = +amount;
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, qty } })
  }

  return (
    <Layout title='shopping Cart'>
      <h1 className='mb-4 text-xl'>Shopping Cart</h1>

      {
        cartItems.length === 0
          ? (<div>Your cart is empty. <Link href='/' className='underline'>Go shopping.</Link></div>)
          :
          (
            <div className='grid md:grid-cols-4 md:gap-5'>
              <div className='overflow-x-auto md:col-span-3'>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='px-5 text-left'>Item</th>
                      <th className='p-5 text-right'>Price</th>
                      <th className='p-5 text-center'>Quantity</th>
                      <th className='p-5 text-right'>Total</th>
                      <th className='p-5'>Action</th>
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
                        <td className='p-5 text-center'>
                          {/* {item.qty} */}
                          <select value={item.qty}
                            onChange={(e) => updateCartHandler(item, e.target.value)}>
                            {[...Array(item.countInStock).keys()].map(index => (
                              <option value={index + 1} key={index}>{index + 1}</option>
                            ))}
                          </select>
                        </td>
                        <td className='p-5 text-right'>${item.price * item.qty}</td>
                        <td className='p-5 text-center'>
                          <button onClick={() => { removeItemHandler(item) }}>
                            <XCircleIcon className='h-5 w-5'></XCircleIcon>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='card p-5'>
                <ul>
                  <li>
                    <div className='pb-3 text-xl'>Items:
                      {" "}{cartItems.reduce((a, c) => a + c.qty, 0)} </div>
                  </li>
                  <li>
                    <div className='pb-3 text-xl'>Subtotal:
                      ${cartItems.reduce((a, c) => a + c.qty * c.price, 0)} </div>
                  </li>
                  <li>
                    <button className='prm-btn w-full' onClick={() => router.push('/Shipping')}>
                      Check Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )
      }
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartPage), {ssr:false}) 