import React from 'react'

const CheckoutWizard = ({ activeStep = 0 }) => {

    const array = ['User Login', 'Shipping Address', 'Payment Method', 'Place Order'];  

    return (
        <div className='mb-5 flex flex-wrap'>
            {
                array.map((step, index) => (
                    <div key={step}
                        className={`flex-1 border-b-2 text-center ${index <= activeStep
                            ? 'border-indigo-500 text-indigo-500'
                            : 'border-gray-400 text-gray-400'}`}>
                        {step}
                    </div>
                ))
            }
        </div>
    )
}

export default CheckoutWizard