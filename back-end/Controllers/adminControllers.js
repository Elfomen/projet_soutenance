import Admin from '../Models/adminModels.js'

const adminControllers = {
    createAdministrator : async(req , res) => {
        try {
            const exist = await Admin.find({
                email : req.body.email
            })
            if(exist.length){
                res.send("This user already exists")
            }else{
                await Admin.create(req.body)
                console.log("Administrator created successfully")
                res.status(200).send("ok")
            }
            
        } catch (error) {
            res.status.send("error")
            console.log(error.message)
        }
    } , 

    loadAdministrator : async(req , res) => {
        try {
            const data = await Admin.find({
                email : req.params.email
            }).populate("projects")
            console.log(data)
            console.log(req.params.email)
            res.status(200).send(data)
            console.log("Retreived admin successfully")
        } catch (error) {
            res.send("error")
            console.log(error.message)
        }
    } , 

    getAllAdministrators : async(req , res) => {
        try {
            const data = await Admin.find({})
            res.status(200).send(data)
            console.log("all admins retreived")
        } catch (error) {
            console.log(error.message)
        }
    } , 

    verifyAdministrator : async(req , res) => {
        try {
            const admin = await Admin.find({
                email : req.params.email
            })
            console.log(admin)
            if(admin.length){
                res.send(admin)
            }else{
                res.send("absent")
            }
        } catch (error) {
            res.send("error")
        }
    }
}

export default adminControllers