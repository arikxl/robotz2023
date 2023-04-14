import bcryptjs from "bcryptjs";

import db from "@/db/db";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {

    if (req.method !== 'PUT') {
        return res.status(400).send({ message: `${req.method} is not supported` }); 
    }

    const user = await getToken({ req });     
    if (!user) {
        return res.status(401).send({ message: 'signin required' });
    }

    const { name, email, password } = req.body;
    if (
        !name || !email || !password ||
        !email.includes('@') || 
        password.trim().length < 7
    ) {
        res.status(422).json({
            message: 'Validation error'
        });
        return
    }
    await db.connect();
    const existingUser = await User.findById(user._id);
    existingUser.name = name;
    existingUser.email = email;
    if (password) {
        existingUser.password = bcryptjs.hashSync(password);
    }
    await existingUser.save(); 
    await db.disconnect();

    res.send({
        message: 'USer Updated'
    })
}

export default handler;