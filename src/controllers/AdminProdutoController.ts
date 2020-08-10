import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Produto } from '../entity/Produto';
import { Conta } from '../entity/Conta';

//add produto no banco pelo sistema
export const add_produto_admin = async(req: Request, res: Response) => {
    let { nome, descricao, destaque, estoque, marcaId, valor, fornecedorId } = req.body;

    try {
        if (destaque === undefined) {
            destaque = false;
        }
        await getRepository(Produto).query(`
            INSERT INTO "produto"("nome", "descricao", "destaque", "valor", "estoque", "marcaId", "fornecedorId") VALUES ('${nome}', '${descricao}', '${destaque}', '${valor}', '${estoque}', '${marcaId}', '${fornecedorId}')  RETURNING "id", "nome", "descricao", "destaque", "valor", "estoque", "createdAt", "updatedAt"
        `);
        
        const conta_fornecerdor = await getRepository(Conta).query(`
            SELECT id, valor, "fornecedorId" FROM public.conta WHERE "fornecedorId"='${fornecedorId}'
        `);
        let conta_fornecedor_up = +conta_fornecerdor[0].valor + +valor;

        await getRepository(Conta).query(`
            UPDATE "conta" SET valor=${conta_fornecedor_up} WHERE "fornecedorId"='${fornecedorId}';
        `);

        const produtos = await getRepository(Produto).find({
            relations: ['fornecedor']
        });

        return res.json(produtos);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add' })
    }
}

//deletar um produto no banco
export const del_produto = async(req: Request, res: Response) => {
    const id  = req.params.id;

    try {
        const resultado = await getRepository(Produto).delete(id);

        if (resultado.affected === 0) {
            return res.status(404).json({ message: 'erro ao deletar' })
        }
        console.log('sucesso ao deletar')

        const produtos = await getRepository(Produto).find({
            relations: ['fornecedor']
        });

        return res.json(produtos);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao deletar' })
    }
}

//edita um produto no banco
export const edit_produto = async(req: Request, res: Response) => {
    const id  = req.params.id;

    try{
        const resultado = await getRepository(Produto).update(id, req.body);

        if(resultado.affected === 0){
            return res.status(404).json({message: 'erro update'})
        }
        console.log('sucesso ao editar')

        const produtos = await getRepository(Produto).find({
            relations: ['fornecedor']
        });

        return res.json(produtos);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao update' })
    }
}

//retorna todos os produtos
export const get_produtos = async(req: Request, res: Response) => {
    try{
        const produtos = await getRepository(Produto).find({
            relations: ['fornecedor']
        });
        
        return res.json(produtos);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao peagr todos os produtos' })
    }
}

//retorna um produto
export const get_produto_id = async (req: Request, res: Response) => {
    const id  = req.params.id;

    try {
        const produto = await getRepository(Produto).findOne({
            where: {
                id
            },
            relations: ['fornecedor']
        });
        
        return res.json(produto);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao pegar um produto' })
    }
}

export const comprar_produto = async(req: Request, res: Response) => {
    let id_array = req.body;
    const id  = req.params.id;
    let string_ids: string = '(';

    for (let i = 0; i < id_array.length; i++){
        if (i < (id_array.length - 1)) {
            string_ids += `'` + id_array[i] + `'` + ',';
        } else {
            string_ids += `'` + id_array[i] + `'` + ')';
        }
    }

    try {
        await getRepository(Produto).query(`
            delete from user_produtos_produto WHERE "userId"='${id}';
        `);
        await getRepository(Produto).query(`
            delete from produto where "id" in ${string_ids};
        `);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add' })
    }
}

//retorna a soma e quantidade de vendas
export const get_qtd_produtos = async(req: Request, res: Response) => {
    try {
        const soma_estoque_valor = await getRepository(Produto).query(`
            SELECT SUM(valor) FROM produto;
        `);
        
        let aux_soma = soma_estoque_valor;

        if (soma_estoque_valor[0].sum === 'null') {
            aux_soma = 0;
        }
        
        const qtd_estoque = await getRepository(Produto).query(`
            SELECT COUNT(id) FROM produto;
        `);

        let aux_1 = {
            soma_valor_prod: +soma_estoque_valor[0].sum,
            qtd_prod: +qtd_estoque[0].count
        }

        return res.json(aux_1);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao peagr todos os produtos' })
    }
}
