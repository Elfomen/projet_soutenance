import express from 'express'
import ProjectControllers from '../../Controllers/projectControllers.js'

const router = express.Router()

router.post("/project/new" , ProjectControllers.createProject)

router.get("/projects/load/all" , ProjectControllers.loadAllProjects)

router.get("/project/getone/:id" , ProjectControllers.loadOneProject)

router.put("/project/tasks/new" , ProjectControllers.createNewtask)

router.put("/project/tasks/subtasks/new" , ProjectControllers.createNewSubTask)

router.put("/project/tasks/sub_tasks/completed" , ProjectControllers.completeSubtask)

router.put("/project/messages/new" , ProjectControllers.addNewMessage)

export default router