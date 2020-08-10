import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Conta } from '../entity/Conta';

//retorna conta
export const get_contas = async(req: Request, res: Response) => {
  try{
    const contas = await getRepository(Conta).find({
      relations: ['fornecedor']
    });
      
    return res.json(contas);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar contas' })
  }
}

//pagar conta
export const pagar_conta = async (req: Request, res: Response) => {
  const { valor } = req.body;
  const id = req.params.id;

  try {
    
    const conta_fornecerdor = await getRepository(Conta).query(`
      SELECT id, valor, "fornecedorId" FROM public.conta WHERE "id"='${id}'
    `);
    let conta_fornecedor_up = +conta_fornecerdor[0].valor - +valor;

    await getRepository(Conta).query(`
        UPDATE "conta" SET valor=${conta_fornecedor_up} WHERE "id"='${id}';
    `);

    const contas = await getRepository(Conta).find();

    return res.json(contas);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar contas' })
  }
}

export const get_sum_contas = async(req: Request, res: Response) => {
  try{
    const receita_sum = await getRepository(Conta).query(`
      SELECT SUM(valor) FROM conta;
    `);
      
    return res.json(receita_sum);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar soma das contas' })
  }
}