import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

const Unauthorized = () => {

    const router = useRouter();
    const { message } = router.query;

    return (
        <Layout title="Unauthorized">

            <h1 className='text-xl'>Access denied</h1>
            {message && <div className='mb-4 text-red-500 font-bold'>{message}</div>}
        </Layout>
    )
}

export default Unauthorized