import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
    
    const { nome, email, senha } = req.body;

    try {
        const senhaHash = await bcrypt.hash(senha, 8);
        
        const user = await getRepository(User).save({
            nome,
            email,
            senha: senhaHash
        });
        
        const token_register = jwt.sign({ nome }, process.env.SECRET, {
            expiresIn: '1d'
        });

        const data = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            token: token_register
        }
        
        return res.json(data);

    } catch (error) {
        return res.status(402).json({message: "erro user controller"})
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    
    try {
        const user = await getRepository(User).findOne({
            where: {
                email
            }
        });
        
        if (await bcrypt.compare(senha, user.senha)) {
            const token_login = jwt.sign({ email }, process.env.SECRET, {
                expiresIn: '1d'
            });

            const data = {
                id: user.id,
                nome: user.nome,
                email: user.email,
                token: token_login
            }
            
            return res.json(data);
        } else {
            return res.status(404).json({messge: "erro no login controler"})
        }

    } catch (err) {
        return res.status(402).json({message: "erro user controller"})
    }
}


//adiciona um cart
export const add_cart = async(req: Request, res: Response) => {
    try {
  
      const { userId, produtoId } = req.body;
  
      const add_produto_cart = await getRepository(User).query(`
        INSERT INTO "user_produtos_produto"("userId", "produtoId") VALUES ('${userId}', '${produtoId}')  RETURNING "userId", "produtoId"
      `);
  
      return res.json(add_produto_cart);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao add produto cart' })
    }
}

//get_user
export const get_user = async(req: Request, res: Response) => {
    try {
  
        const id  = req.params.id;
  
        const user = await getRepository(User).findOne({
            where: {
                id
            },
            relations: ['produtos']
        });
  
        return res.json(user);
    } catch (error) {
        return res.status(404).json({ message: 'erro ao pegar user' })
    }
}