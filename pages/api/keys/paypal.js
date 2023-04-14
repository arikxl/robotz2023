// import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';


const handler = async (req, res) => {
    const user = await getToken({req});
    if (!user) {
        return res.status(401).send('Signin required');
    }

    res.send(process.env.PAYPAL_CLIENT_ID || 'sd')
}

export default handler