import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Venda } from '../entity/Venda';
import { Produto } from '../entity/Produto';


//add venda no banco pelo sistema
export const add_vendas_admin = async(req: Request, res: Response) => {
  const { id_cliente, id_produto, valor, nome_produto } = req.body;

  try {
        await getRepository(Venda).query(`
            INSERT INTO "venda"("id_cliente", "id_produto", "valor", "nome_produto") VALUES ('${id_cliente}', '${id_produto}', '${valor}', '${nome_produto}')  RETURNING "id", "id_cliente", "id_produto", "valor", "nome_produto", "created_at"
        `);
      
        await getRepository(Produto).query(`
            delete from produto where "id"=${id_produto};
        `);
        const vendas = await getRepository(Venda).find();

        return res.json(vendas);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add' })
    }
}

export const add_vendas_admin_cliente = async(req: Request, res: Response) => {
    const id = req.params.id;
    let produtos = req.body;
    
    try {
        for (let i = 0; i < produtos.length; i++) {
            await getRepository(Venda).query(`
                INSERT INTO "venda"("id_cliente", "id_produto", "valor", "nome_produto") VALUES ('${id}', '${produtos[i].id}', '${produtos[i].valor}', '${produtos[i].nome}')  RETURNING "id", "id_cliente", "id_produto", "valor", "nome_produto", "created_at"
            `);
        }
        return res.status(201).json({ message: 'produto adicionado com sucesso' });
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add' });
    }
}

//retorna todas as vendas
export const get_vendas = async(req: Request, res: Response) => {
  try{
      const vendas = await getRepository(Venda).find();
      
      return res.json(vendas);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao pegar todas as vendas' })
  }
}

//deletar uma venda no banco
export const del_venda = async(req: Request, res: Response) => {
  const id = req.params.id;

  try {
      const resultado = await getRepository(Venda).delete(id);

      if (resultado.affected === 0) {
          console.log('sucesso ao deletar')

          return res.status(404).json({ message: 'erro ao deletar' })
      }
      console.log('sucesso ao deletar')

      const vendas = await getRepository(Venda).find();

      return res.json(vendas);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao deletar' })
  }
}

//edita uma venda no banco
export const edit_venda = async(req: Request, res: Response) => {
  const id  = req.params.id;

  try{
      const resultado = await getRepository(Venda).update(id, req.body);

      if(resultado.affected === 0){
          return res.status(404).json({message: 'erro update'})
      }
      console.log('sucesso ao editar')

      const venda = await getRepository(Venda).find({
          relations: ['produtos']
      });
      
      return res.json(venda);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao update' })
  }
}
//retorna a soma e quantidade de vendas
export const get_qtd_vendas = async(req: Request, res: Response) => {
    try {
        const soma_vendas_valor = await getRepository(Venda).query(`
            SELECT SUM(valor) FROM venda;
        `);
        
        let aux_soma = soma_vendas_valor;

        if (soma_vendas_valor[0].sum === 'null') {
            aux_soma = 0;
        }
        
        const qtd_vendas = await getRepository(Venda).query(`
            SELECT COUNT(id) FROM venda;
        `);
        let aux_1 = {
            soma_valor_vendas: +soma_vendas_valor[0].sum,
            qtd_vendas: +qtd_vendas[0].count
        }

        return res.json(aux_1);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao peagr todos os produtos' })
    }
}

//retorna ultimos 10 vendas
export const get_top_vendas = async(req: Request, res: Response) => {
    try {
        const top = await getRepository(Venda).query(`
            select * from venda order by created_at desc limit 10;
        `);

        return res.json(top);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao peagr top 10 vendas' })
    }
}


