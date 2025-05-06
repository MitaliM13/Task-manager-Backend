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
    tasksCreated: [{
        type: Mongoose.Schema.Types.ObjectId,
        // type: [],
        ref: 'Tasks'
      }],
      taskAssigned: [{
        type: Mongoose.Schema.Types.ObjectId,
        // type: [],
        ref: 'Tasks'
      }]
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
        // type: [],
        ref: 'User'
      },
      assignedTo: {
        type: Mongoose.Schema.Types.ObjectId,
        // type: [],
        ref: 'User'
      }
}, {timestamps: true})

const Users = Mongoose.model("User", UserSchema)
const Tasks = Mongoose.model("Tasks", TaskSchema)

export  {Users, Tasks};