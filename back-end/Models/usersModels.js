import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true
    } ,
    email : {
        type : String , 
        required : true
    } , 
    password : {
        type : String , 
        required : true
    } ,
    projects : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "project"
    }]
})

const User = mongoose.model("user" , UsersSchema)

export default User