import Connect from './config/Database.js'

import Message from './Models/chatGroupModels.js'
import Project from './Models/projectModels.js'
import User from './Models/usersModels.js'
import Admin from './Models/adminModels.js'

Connect()

const reset = async() => {
    await Message.deleteMany()
    await Project.deleteMany()
    //await User.deleteMany()
    //await Admin.deleteMany()

    console.log("Data base cleaned successfully")
}

reset()
