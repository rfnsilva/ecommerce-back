import { getConnection, getRepository } from "typeorm";
import { Request, Response } from "express";
import { Marca } from "../entity/Marca";

//adiciona um produto
export const add_marca = async(req: Request, res: Response) => {
  try {

    const { nome } = req.body;

    const marca_adicionado = await getRepository(Marca).save({
      nome
    });

    return res.json(marca_adicionado);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao add marca' })
  }
}

//retorna todas as marcas
export const get_marcas = async(req: Request, res: Response) => {
  try {

    const marcas = await getRepository(Marca).find({
      relations: ['produtos']
    });

    return res.json(marcas);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar marcas' })
  }
}

//retorna uma marca
export const get_marca = async(req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const marca = await getRepository(Marca).findOne({
      where: {
        id
      },
      relations: ['produtos']
    });

    return res.json(marca);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar marca' })
  }
}