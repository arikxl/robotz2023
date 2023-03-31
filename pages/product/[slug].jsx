/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useContext } from 'react';

import data from '@/data/data';
import Layout from '@/components/Layout'
import { Store } from '../../context/Store';


const ProductDetails = () => {

    const { state, dispatch } = useContext(Store);

    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find(x => x.slug === slug)

    const addToCartHandler = () => {
        const existingItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const qty = existingItem ? existingItem.qty + 1 : 1
        if (product.countInStock < qty) {
            alert('Sorry, Product is out of stock')
            return
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, qty } });
    }

    if (!product) return 'No Product found!';

    return (
        <Layout title={product.title}>
            <div className='py-2'>
                <Link href='/'>Back</Link>
            </div>
            <div className='grid md:grid-cols-4 md:gap-3'>
                <div className='md:col-span-2'>
                    <Image src={product.img} alt={product.title}
                        width={640} height={640} priority />
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className='text-lg'>{product.title}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>Description: {product.desc}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className='mb-2 flex justify-between'>
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <div>In stock</div>
                            <div>{product.countInStock > 0
                                ? product.countInStock
                                : 'Out in stock'}
                            </div>
                        </div>
                        <button className='prm-btn w-full' onClick={addToCartHandler}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails