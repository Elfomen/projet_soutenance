import express from 'express'

import UserController from '../../Controllers/usersControllers.js'

const router = express.Router()

router.post("/users/new" , UserController.createUser)

router.get("/users/get/all" , UserController.getAllUsers)

router.put("/users/user/addproject" , UserController.assignProjectToUser)

router.get("/users/user/verify/:email" , UserController.verifyUser)

export default router