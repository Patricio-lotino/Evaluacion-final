import { Router } from 'express'
import TaskController from '../controllers/TaskController'
import tokenValidator from '../middlewares/tokenValidator'

const taskRoutes = Router()
const controller = new TaskController()

taskRoutes.get('/', tokenValidator(), controller.getAll)
taskRoutes.get('/:id', controller.getById)
taskRoutes.post('/', controller.create)
taskRoutes.put('/:id', controller.update)
taskRoutes.delete('/:id', controller.delete)

export default taskRoutes