import { getToken } from 'next-auth/jwt';

import db from "@/db/db";
import Order from "@/models/Order";

const Handler = async (req, res) => {

    const user = await getToken({ req });
     
    if (!user) {
        return res.status(401).send('signin required');
    }

    await db.connect();
    const orders = await Order.find({user: user._id})
    await db.disconnect();
    res.send(orders);
}

export default Handler;