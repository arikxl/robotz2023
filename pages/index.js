import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'

import db from '@/db/db'
import Layout from '@/components/Layout'
import Product from '@/models/Product'
import ProductPreview from '@/components/ProductPreview'
import { Store } from '@/context/Store'



export default function Home({ products }) {
  
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existingItem = cart.cartItems.find((x) => x.slug === product.slug);
    const qty = existingItem ? existingItem.qty + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < qty) {
      return toast.error('Sorry, Product is out of stock');
      
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, qty } });
    toast.success('Product added successfully')
  }


  return (
    <Layout title="Home Page">
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductPreview product={product} key={product.slug}
            addToCartHandler={ addToCartHandler} />
        ))}
      </div>
    </Layout>
  )
};

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}
