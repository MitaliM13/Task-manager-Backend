import mongoose from "mongoose";

async function ConnectMongo() {
    try {
       await mongoose.connect(process.env.MONGO_URI) 
       console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error")
        process.exit(1)
    }
}

export default ConnectMongo;