import  Mongoose  from "mongoose";


//User schema
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

//Task Schema
const TaskSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    createdBy: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true,
    },
    assignedTo: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
}, {timestamps: true})

const Users = Mongoose.model("Users", UserSchema)
const Tasks = Mongoose.model("Tasks", TaskSchema)

export  {Users, Tasks};