import express from 'express'

import projectApi from './details/projectApi.js'
import userApi from './details/usersApi.js'
import AdminApi from './details/adminApi.js'
import ChatApi from './details/chatGroupApi.js'

const router = express.Router()

router.use("/" , projectApi)
router.use("/" , userApi)
router.use("/" , AdminApi)
router.use("/" , ChatApi)

export  default router