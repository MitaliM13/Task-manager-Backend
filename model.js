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
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasksCreated: {
        type: [],
        default: []
    },
    taskAssigned: {
        type: [],
        default: []
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
        // type: Mongoose.Schema.Types.ObjectId,
        // ref: "User",
        // required: false,
        type: String,
        required: false,
        default: ""
    },
    assignedTo: {
        // type: Mongoose.Schema.Types.ObjectId,
        // ref: "User" 
        type: String,
        required: false,
        default: ""
    },
}, {timestamps: true})

const Users = Mongoose.model("User", UserSchema)
const Tasks = Mongoose.model("Tasks", TaskSchema)

export  {Users, Tasks};