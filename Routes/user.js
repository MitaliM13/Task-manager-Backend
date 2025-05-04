import express from 'express'
import { Users } from '../model.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({}, 'username email')
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error })
    }
})


export default router