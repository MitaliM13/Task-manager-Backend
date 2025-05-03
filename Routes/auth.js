import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Users } from '../model.js'

const router = express.Router()

router.post('/register', async(req, res) => {
    const {username, password, email } = req.body
    const hashed = await bcrypt.hash(password, 10);
    const user = new Users({username, email, password:hashed})
    await user.save()
    res.status(201).send("User Registered");
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await Users.findOne({email})
    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).send('Invalid Credentials');
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
    const decoded  = jwt.verify(token, process.env.JWT_SECRET)
    res.json({token, decoded})
})

export default router