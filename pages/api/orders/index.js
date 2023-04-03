import { getSession } from "next-auth/react";

import db from "@/db/db";
import Order from "@/models/Order";

const handler = async (req, res) => {

    const session = await getSession({req});
    if (!session) {
        return res.status(401).send('Signin required')
    }

    const { user } = session;
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: user._id
    });

    const order = await newOrder.save();
    res.status(201).send(order);
    // await db.disconnect();
}

export default handler;