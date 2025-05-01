import express from 'express'
import dotenv from 'dotenv'
import ConnectMongo from './Database.js'

dotenv.config()

ConnectMongo()

const app = express()


app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on ${process.env.PORT}`)
})