import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectMongo from './Database.js'
import {Users} from './model.js'
import authRoutes from './Routes/auth.js'
import taskRoutes from './Routes/task.js'
import userRoutes from './Routes/user.js'

dotenv.config()

if (!process.env.PORT || !process.env.JWT_SECRET || !process.env.MONGO_URI) {
    console.error("Missing required environment variables");
    process.exit(1);
}


ConnectMongo()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req,res) => {
    res.send("API is running")
})


app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on ${process.env.PORT}`)
})