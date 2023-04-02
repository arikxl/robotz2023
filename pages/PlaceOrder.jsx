

import Layout from '@/components/Layout'
import CheckoutWizard from '@/components/CheckoutWizard'

const PlaceOrder = () => {
    return (
        <Layout title='Place Order'>
            <CheckoutWizard activeStep={3} />

            <div>PlaceOrder</div>
        </Layout>
    )
}

export default PlaceOrder