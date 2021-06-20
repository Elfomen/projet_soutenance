import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    message  : {
        type : String , 
        required : true
    } , 
    sender : {
        type : String , 
        required : true
    }  , 
    receiver : {
        type : String , 
        required : true
    } ,
    send_date : {
        type : Date ,
        default : Date.now()
    }
})

const Chat = mongoose.model("chat" , ChatSchema)

export default Chat