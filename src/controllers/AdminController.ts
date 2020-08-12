import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Admin } from "../entity/Admin";
import { Slider } from "../entity/Slider";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

//login admin
export const login_admin = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  
  try {
      const user = await getRepository(Admin).findOne({
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

//register admin
export const register_admin = async (req: Request, res: Response) => {
    
  const { email, senha } = req.body;

  try {
      const senhaHash = await bcrypt.hash(senha, 8);
      
      const user = await getRepository(Admin).save({
          email,
          senha: senhaHash
      });
      
      const token_register = jwt.sign({ email }, process.env.SECRET, {
          expiresIn: '1d'
      });

      const data = {
          id: user.id,
          email: user.email,
          token: token_register
      }
      
      return res.json(data);

  } catch (error) {
      return res.status(402).json({message: "erro user controller"})
  }
}