import  Mongoose  from "mongoose";

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
    }, 
    email : {
        type : String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})



const Users = Mongoose.model("Users", UserSchema)
export default Users;