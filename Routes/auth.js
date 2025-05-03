import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Users } from '../model.js'

const router = express.Router()

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("All fields are required.");
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return res.status(409).send("Email already in use.");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new Users({ username, email, password: hashed });
    await user.save();

    res.status(201).send("User Registered");
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid Credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h' 
    });

    res.json({ 
        token, 
        user: {
          username: user.username,
          email: user.email,
          id: user._id
        }
      });
});

export default router;
