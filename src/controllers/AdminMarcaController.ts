import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Marca } from '../entity/Marca'
import { Conta } from '../entity/Conta';

//add usuario no banco pelo sistema
export const add_marca_admin = async(req: Request, res: Response) => {
    const { nome } = req.body;

    try {
        await getRepository(Marca).query(`
            INSERT INTO "marca"("nome") VALUES ('${nome}')  RETURNING "id", "nome", "createdAt", "updatedAt"
        `);

        const marcas = await getRepository(Marca).find({
            relations: ['produtos']
        });


        return res.json(marcas);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add' })
    }
}

//deletar um produto no banco
export const del_marca = async(req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id)

    try {
        const resultado = await getRepository(Marca).delete(id);

        if (resultado.affected === 0) {
            console.log('sucesso ao deletar')

            return res.status(404).json({ message: 'erro ao deletar' })
        }
        console.log('sucesso ao deletar')

        const marca = await getRepository(Marca).find({
            relations: ['produtos']
        });

        return res.json(marca);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao deletar' })
    }
}

//edita um usuario no banco
export const edit_marca = async(req: Request, res: Response) => {
    const id  = req.params.id;

    try{
        const resultado = await getRepository(Marca).update(id, req.body);

        if(resultado.affected === 0){
            return res.status(404).json({message: 'erro update'})
        }
        console.log('sucesso ao editar')

        const fornecedor = await getRepository(Marca).find({
            relations: ['produtos']
        });
        
        return res.json(fornecedor);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao update' })
    }
}

//retorna todos os produtos
export const get_marcas_admin = async(req: Request, res: Response) => {
    try{
        const marca = await getRepository(Marca).find({
            relations: ['produtos']
        });
        
        return res.json(marca);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao peagr todos os fornecedores' })
    }
}

//retorna um produto
export const get_marca_id = async (req: Request, res: Response) => {
    const id  = req.params.id;

    try {
        const marca = await getRepository(Marca).findOne({
            where: {
                id
            },
            relations: ['produtos']
        });
        
        return res.json(marca);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao pegar um fornecedor' })
    }
}