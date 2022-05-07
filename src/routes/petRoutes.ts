import { Router } from 'express'
import PetController from '../controllers/PetController'
import tokenValidator from '../middlewares/tokenValidator'

const petRoutes = Router()
const controller = new PetController()

petRoutes.get('/', tokenValidator(), controller.getAll)
petRoutes.get('/:id', controller.getById)
petRoutes.post('/', controller.create)
petRoutes.put('/:id', controller.update)
petRoutes.delete('/:id', controller.delete)

export default petRoutes