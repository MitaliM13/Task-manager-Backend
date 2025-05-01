import express from 'express'
import dotenv from 'dotenv'
import ConnectMongo from './Database.js'
import Users from './model.js'

dotenv.config()
ConnectMongo()

const app = express()
app.use(express.json())

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

app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on ${process.env.PORT}`)
})