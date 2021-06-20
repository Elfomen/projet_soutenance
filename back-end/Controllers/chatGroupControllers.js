import Chat from '../Models/chatGroupModels.js'

const chatGroupControllers = {
    createNewChat : async(req , res) => {
        try {
            await Chat.create(req.body)
            console.log("Message inserted successfully")
            res.status(200).send("ok")
        } catch (error) {
            res.send(error.message)
            console.log(error.message)
        }
    }
}

export default chatGroupControllers