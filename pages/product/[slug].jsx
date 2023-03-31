/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'

import data from '@/data/data';
import Layout from '@/components/Layout'

const ProductDetails = () => {

    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find(x => x.slug === slug)

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
                        <li>Category: { product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>Description: {product.desc }</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5">
                        <div className='mb-2 flex justify-between'>
                            <div>Price</div>
                            <div>${product.price }</div>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <div>In stock</div>
                            <div>{product.countInStock > 0 ? product.countInStock : 'Not in stock'}</div>
                        </div>
                        <button className='prm-btn w-full'>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails