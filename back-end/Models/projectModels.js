import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
    name : {
        type : String , 
        required : true
    } , 
    description : {
        type : String , 
        required : true
    } , 
    start_date : {
        type : String , 
        required : true
    } , 
    end_date : {
        type : String , 
        required : true
    } , 
    waiting_list : {
        type : Boolean , 
        default : true
    } , 
    started : {
        type : Boolean , 
        default : false
    } , 
    completed : {
        type : Boolean , 
        default : false
    } , 
    tasks : [
        {
            name : String , 
            worker : String,
            start_date : String , 
            end_date : String , 
            priority : String , 
            status : String , 
            percentage_change : {
                type : Number , 
                default : 0
            } , 
            sub_tasks : [
                {
                    name : String , 
                    completed : {
                        type : Boolean , 
                        default : false
                    }
                }
            ]
        }
    ] , 

    messages : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "chat"
        }
    ]
})

const Project = mongoose.model("project" , ProjectSchema)

export default Project