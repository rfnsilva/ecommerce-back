import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";

import { Produto } from '../entity/Produto';

@Entity('fornecedor')
export class Fornecedor {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {unique: true})
  nome: string;

  @OneToMany(type => Produto, produto => produto.fornecedor)
  produtos: Produto[];

  @CreateDateColumn({type: "timestamp", name: "created_at"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp", name: "updated_at"})
  updatedAt: Date;

}