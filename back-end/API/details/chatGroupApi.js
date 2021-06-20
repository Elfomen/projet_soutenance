import express from 'express'

import ChatControllers from '../../Controllers/chatGroupControllers.js'

const router = express.Router()

router.post("/messages/new" , ChatControllers.createNewChat)

export default router

