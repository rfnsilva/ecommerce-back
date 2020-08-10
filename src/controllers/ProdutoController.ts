import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Produto } from "../entity/Produto";

//retorna todos os produtos em destaque
export const get_produtos_destaque = async(req: Request, res: Response) => {
  try {

    const produtos_destaques = await getRepository(Produto).find({
      where: {
        destaque: true
      }
    });

    return res.json(produtos_destaques);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar produtos' })
  }
}

//adiciona um produto
export const add_produto = async(req: Request, res: Response) => {
  try {

    const { nome, descricao, destaque, valor, marcaId } = req.body;

    const produto_adicionado = await getRepository(Produto).query(`
      INSERT INTO "produto"("nome", "descricao", "destaque", "valor", "marcaId") VALUES ('${nome}', '${descricao}', '${destaque}', '${valor}', '${marcaId}')  RETURNING "id", "nome", "descricao", "destaque", "valor", "marcaId", "createdAt", "updatedAt"
    `);

    return res.json(produto_adicionado);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao add produto' })
  }
}
