import express from 'express'
import AdminController from '../../Controllers/adminControllers.js'
const router = express.Router()

router.post("/admin/new" , AdminController.createAdministrator)

router.get("/admin/getone/:email" , AdminController.loadAdministrator)

router.get("/admin/get/all" , AdminController.getAllAdministrators)

router.get("/admin/verifyaccount/:email" , AdminController.verifyAdministrator)

export default router