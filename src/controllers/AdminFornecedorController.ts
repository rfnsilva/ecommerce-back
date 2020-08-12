import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Fornecedor } from '../entity/Fornecedor'
import { Conta } from '../entity/Conta';

//add fornecedor no banco pelo sistema
export const add_fornecedor = async(req: Request, res: Response) => {
    const { nome } = req.body;

    try {
        const fornecedor = await getRepository(Fornecedor).query(`
            INSERT INTO "fornecedor"("nome") VALUES ('${nome}')  RETURNING "id", "nome", "created_at", "updated_at"
        `);

        let v: number = 0;
        let f: string = fornecedor[0].id;

        await getRepository(Conta).query(`
            INSERT INTO "conta"("valor", "fornecedorId") VALUES ('${v}', '${f}')  RETURNING "id", "valor", "fornecedorId", "created_at", "updated_at"
        `);
        
        const fornecedores = await getRepository(Fornecedor).find({
            relations: ['produtos']
        });


        return res.json(fornecedores);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add' })
    }
}

//deletar um fornecedor no banco
export const del_fornecedor = async(req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const resultado = await getRepository(Fornecedor).delete(id);

        if (resultado.affected === 0) {
            console.log('sucesso ao deletar')

            return res.status(404).json({ message: 'erro ao deletar' })
        }
        console.log('sucesso ao deletar')

        const fornecedor = await getRepository(Fornecedor).find({
            relations: ['produtos']
        });

        return res.json(fornecedor);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao deletar' })
    }
}

//edita um fornecedor no banco
export const edit_fornecedor = async(req: Request, res: Response) => {
    const id  = req.params.id;

    try{
        const resultado = await getRepository(Fornecedor).update(id, req.body);

        if(resultado.affected === 0){
            return res.status(404).json({message: 'erro update'})
        }
        console.log('sucesso ao editar')

        const fornecedor = await getRepository(Fornecedor).find({
            relations: ['produtos']
        });
        
        return res.json(fornecedor);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao update' })
    }
}

//retorna todos os fornecedores
export const get_fornecedores = async(req: Request, res: Response) => {
    try{
        const fornecedores = await getRepository(Fornecedor).find({
            relations: ['produtos']
        });
        
        return res.json(fornecedores);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao peagr todos os fornecedores' })
    }
}

//retorna um fornecedor
export const get_fornecedor_id = async (req: Request, res: Response) => {
    const id  = req.params.id;

    try {
        const fornecedor = await getRepository(Fornecedor).findOne({
            where: {
                id
            },
            relations: ['produtos']
        });
        
        return res.json(fornecedor);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao pegar um fornecedor' })
    }
}
