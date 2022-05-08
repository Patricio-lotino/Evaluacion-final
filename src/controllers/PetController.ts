import type { Request, Response } from "express"
import type { CreatePetDTO, PetDTO, UpdatePetDTO } from "../models/dto/PetDTO"
//import { UserTokenPayload } from "../models/dto/UserDTO"
import PetRepository from "../models/repositories/PetRepository"
import { createPetSchema, updatePetSchema } from "../models/validators/petSchemas"
export default class PetController {
  public readonly getAll = async (_req: Request, res: Response) => {
    //const repository = new PetRepository(user.id)
    const repository = new PetRepository(1)
    const pets: PetDTO[] = await repository.findAll()
    res.json(pets)}

  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params    
    //const user = req.user as UserTokenPayload
    //const repository = new PetRepository(user.id)
    const repository = new PetRepository(1)
    const pet = await repository.findById(parseInt(id))

    if (!pet) {
      res.status(404).json({ message: 'Pet not found'})
      return
    }
    res.json(pet)
  }
  public readonly create = async (req: Request, res: Response) => {
    const pet = req.body as CreatePetDTO

    try {
      await createPetSchema.validateAsync(pet)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

      //const repository = new PetRepository(user.id)
      const repository = new PetRepository(1)
      const newPet = await repository.create(pet)
      
    res.json(newPet)
  }

  public readonly update = async (req: Request, res: Response) => {
    const { id } = req.params
    const pet = req.body as UpdatePetDTO

    try {
      await updatePetSchema.validateAsync(pet)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

    //const user = req.user as UserTokenPayload
    //const repository = new PetRepository(user.id)
    const repository = new PetRepository(1)
      await repository.update(parseInt(id), pet)
      res.sendStatus(204)
      }
      
  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params

    //const user = req.user as UserTokenPayload
    //const repository = new PetRepository(user.id)
    const repository = new PetRepository(1)
    await repository.delete(parseInt(id))

    res.sendStatus(204)
  }
}