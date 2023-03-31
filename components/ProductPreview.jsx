/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

const ProductPreview = ({ product }) => {
    return (
        <div className="card ">
            <Link href={`/product/${product.slug}`}>
                <img src={product.img} loading='lazy'
                    alt={product.title} className="rounded shadow" />
            </Link>
            <div className='p-5 flex flex-col items-center justify-center'>
                <h2 className='text-lg '>{product.title}</h2>
                <p className='mb-2'>{product.brand}</p>
                <p className=''>${product.price}</p>
                <button className='prm-btn' type='button'>
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductPreview