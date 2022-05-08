import type { Request, Response } from "express"
import type { CreatePetDTO, PetDTO, UpdatePetDTO } from "../models/dto/PetDTO"
import { UserTokenPayload } from "../models/dto/UserDTO"
import PetRepository from "../models/repositories/PetRepository"
import { createPetSchema, updatePetSchema } from "../models/validators/petSchemas"
export default class PetController {
  public readonly getAll = async (req: Request, res: Response) => {
    const user = req.user as UserTokenPayload
    const repository = new PetRepository(user.sub)

    try {
    const pets: PetDTO[] = await repository.findAll()
    res.json(pets)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong'})
  }
}

  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params    
    const user = req.user as UserTokenPayload
    const repository = new PetRepository(user.sub)

    try {
    const pet = await repository.findById(parseInt(id))

    if (!pet) {
      res.status(404).json({ message: 'Pet not found'})
      return
    }
    res.json(pet)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong'})
  }
}
  public readonly create = async (req: Request, res: Response) => {
    const pet = req.body as CreatePetDTO

    try {
      await createPetSchema.validateAsync(pet)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }
      const user = req.user as UserTokenPayload
      const repository = new PetRepository(user.sub)

      try{
        const newPet = await repository.create(pet)
        res.json(newPet)
      } catch (error) {
        if (error.code === 'P2002') {
        res.status(409).json({ message: 'Pet already exists'})
        return
      }
      console.log(error)
      res.status(500).json({ message: 'Something went wrong'})
    }
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
    const user = req.user as UserTokenPayload
    const repository = new PetRepository(user.sub)

    try {
      await repository.update(parseInt(id), pet)
      res.sendStatus(204)
    } catch (error) {
      if (error.code === 'P2002') {
        res.status(409).json({ message: 'Pet already exists'})
        return
      }
      console.log(error)
      res.status(500).json({ message: 'Something went wrong'})
    } 
  }
      
  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = req.user as UserTokenPayload
    const repository = new PetRepository(user.sub)

    try {
    await repository.delete(parseInt(id))
    res.sendStatus(204)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong'})
    }
  }
}