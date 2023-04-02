/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useContext } from 'react';

import db from '@/db/db';
import Layout from '@/components/Layout'
import Product from '@/models/Product';
import { Store } from '../../context/Store';


const ProductDetails = (props) => {

    const { state, dispatch } = useContext(Store);
    const { product } = props

    const addToCartHandler = async () => {
        const existingItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const qty = existingItem ? existingItem.qty + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);

        if (data.countInStock < qty) {
            return toast.error('Sorry, Product is out of stock')
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, qty } });
    }

    if (!product) return <Layout title='Product not found!'>No Product found!</Layout>;

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


export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        }
    }
}