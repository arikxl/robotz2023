import db from '@/db/db';
import Order from '@/models/Order';
import { getToken } from 'next-auth/react';
getToken

const handler = async (req, res) => {
    const user = await getToken({req});
    if (!user) {
        return res.status(401).send('Signin required');
    }

    await db.connect();
    const order = await Order.findById(req.query.id);
    if (order) {
        if (order.isPaid) {
            return res.status(400).send({ message: 'Error: Order is already paid!' });
        }
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: rewrites.body.email_address
        };
        const paidOrder = await order.save();
        await db.disconnect();
        res.send({ message: 'Order paid successfully', order: paidOrder });
    } else {
        await db.disconnect();
        res.status(400).send({ message: 'Error: Order not found' });
    }
}

export default handler