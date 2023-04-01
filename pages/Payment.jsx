import CheckoutWizard from "@/components/CheckoutWizard"
import Layout from "@/components/Layout"

const Payment = () => {
    return (
        <Layout title='Shipping'>
            <CheckoutWizard activeStep={2} />
            <div>Payment</div>
        </Layout >
  )
}

export default Payment