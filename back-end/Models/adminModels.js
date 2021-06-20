import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
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
    projects : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "project"
        }
    ]
})

const Admin = mongoose.model("admin" , AdminSchema)

export default Admin