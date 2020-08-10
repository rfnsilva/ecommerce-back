import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";

import { Produto } from '../entity/Produto';

@Entity('fornecedor')
export class Fornecedor {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  nome: string;

  @OneToMany(type => Produto, produto => produto.fornecedor)
  produtos: Produto[];

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}