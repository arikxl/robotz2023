import Layout from '@/components/Layout'
import ProductPreview from '@/components/ProductPreview'
import data from '@/data/data'


export default function Home() {
  return (
    <Layout title="Home Page">
      
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {data.products.map((product) => (
          <ProductPreview product={product} key={product.slug}/>
        ))}
      </div>

    </Layout>
  )
}
