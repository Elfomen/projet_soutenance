import User from '../Models/usersModels.js'

const userControllers = {
    createUser : async(req , res) => {
        try {

            const exist = await User.find({
                email : req.body.email
            })
            if(exist.length){
                res.send("This user already exists")
            }else{
                await User.create(req.body)
                res.status(200).send("ok")
                console.log("user created successfully")
            }
            
        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
    } , 

    getAllUsers : async(req , res) => {
        try {
            const data = await User.find({})
            res.status(200).send(data)
        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
    } , 

    assignProjectToUser : async(req , res) => {
        try {
            const data = await User.findById(req.body.user)
            data.projects = [
                ...data.projects , 
                req.body.project
            ]

            await User.findByIdAndUpdate(req.body.user , {
                projects : data.projects
            })

            res.send("ok")
        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
    } , 
    verifyUser : async(req , res) => {
        try {
            const user = await User.find({
                email : req.params.email
            }).populate("projects")
            if(user.length){
                res.send(user)
            }else{
                res.send("absent")
            }
        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
    }
}

export default userControllers