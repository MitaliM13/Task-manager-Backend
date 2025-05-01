import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectMongo from './Database.js'
import {Users, Tasks} from './model.js'
import authRoutes from './auth.js'

dotenv.config()
ConnectMongo()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

//Users Route

app.get('/', async(req, res) => {
    try{
        const data = await Users.find({});
        res.send(data)
    } catch(err){
        res.send(err)
    }
})

app.post('/', async(req, res)=> {
    try {
        const payload =  req.body;

        const User = new Users(payload)
        await User.save()

        res.status(200).json({status: "success"})
    } catch (error) {
        res.send(error)
    }
})

//Task Routes

app.get('/tasks', async(req, res) => {
    try {
        const tasks = await Tasks.find().populate("createdBy", "username email").populate("assignedTo", "username email")
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/tasks', async (req, res) => {
    try {
      const payload = req.body;
      const newTask = new Tasks(payload);
      await newTask.save();
      res.status(201).json({ status: "success", task: newTask });
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on ${process.env.PORT}`)
})