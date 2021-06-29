import Project from '../Models/projectModels.js'
import Admin from '../Models/adminModels.js'
import Message from '../Models/chatGroupModels.js'
const projectControllers = {
    createProject : async(req , res) => {
        try {
            await Project.create(req.body)

            const ad = await Admin.find({ email : req.body.email }) 

            const pr = await Project.find({})

            await Admin.findOneAndUpdate({
                email : req.body.email
            } , {
                projects : [...ad[0].projects , pr[pr.length - 1]._id]
            })
            res.status(200).send("ok")
            console.log("project created successfully")
        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
        
    } , 

    loadAllProjects : async(req , res) => {
        try {
            const data = await Project.find({})
            res.status(200).send(data)
            console.log("Successfully retreived projects")
        } catch (error) {
            res.status.send("error")
            console.log(error.message)
        }
    } , 
    loadOneProject : async(req , res) => {
        try {
            const data = await Project.findById(req.params.id).populate("messages")
            res.status(200).send(data)
            console.log("Project retreived successfully")
        } catch (error) {
            res.send("error")
            console.log(error.message) 
        }
    } , 

    createNewtask : async(req , res) => {
        try {
            const project = await Project.findById(req.body.project)
            const existingTasks = project.tasks

            await Project.findByIdAndUpdate(req.body.project , {
                tasks : [
                    ...existingTasks , 
                    req.body.task
                ]
            })
            res.status(200).send("ok")

        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
    } , 

    deleteTaskFromUser : async (req , res) => {
        try {
            const project = await Project.findById(req.body.project)
            const newTasks = project.tasks.filter(task => (
                task._id!=req.body.task
            ))
            await Project.findByIdAndUpdate(req.body.project , {
                tasks : newTasks
            })
            res.status(200).send("ok")
        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
    } ,

    createNewSubTask : async(req , res) => {
        try {
            const data = await Project.findById(req.body.project)
            var existingSubTask = []
            
            for(var i = 0 ; i < data.tasks.length ; i++){
                if(data.tasks[i]._id == req.body.task){
                    existingSubTask =data.tasks[i]
                }
            }

            existingSubTask.sub_tasks = [
                ...existingSubTask.sub_tasks , 
                req.body.sub_task
            ]

            for(var i = 0 ; i < data.tasks.length ; i++){
                if(data.tasks[i]._id == existingSubTask._id){
                    data.tasks[i] = existingSubTask
                }
            }
            

            await Project.findByIdAndUpdate(req.body.project , {
                tasks : data.tasks
            })

            res.status(200).send("ok")
            console.log("task updated successfully")
        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
    } , 

    completeSubtask : async(req , res) => {
        try {
                const data = await Project.findById(req.body.project)
                var existingSubTask = []

                for(var i = 0 ; i < data.tasks.length ; i++){
                    if(data.tasks[i]._id == req.body.task){
                        for(var j = 0 ; j < data.tasks[i].sub_tasks.length ; j++){
                            if(data.tasks[i].sub_tasks[j]._id == req.body.sub_task){
                                existingSubTask =data.tasks[i]
                                if(req.body.checked){
                                    existingSubTask.sub_tasks[j].completed = false
                                }else{
                                    existingSubTask.sub_tasks[j].completed = true
                                }
                                
                            
                                existingSubTask.percentage_change = req.body.percentage
                            }
                        }

                    }
                }

                console.log(existingSubTask)
            
                await Project.findByIdAndUpdate(req.body.project , {
                    tasks : data.tasks
                })
            
                res.status(200).send("ok")
                console.log("sub_task updated successfully")
        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
    } , 

    addNewMessage : async(req , res) => {
        try {
            const newmessage = await Message.find({})
            const message = newmessage[newmessage.length - 1]._id


            const existingProject = await Project.findById(req.body.project)
            var existingMessages = existingProject.messages

            existingMessages = [
                ...existingMessages , 
                message
            ]

            await Project.findByIdAndUpdate(req.body.project , {
                messages : existingMessages
            })

            res.status(200).send("ok")
            console.log("project updated with new message")
        } catch (error) {
            res.send(error.message)
            console.log(error.message)
        }
    }

}

export default projectControllers