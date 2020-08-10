import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";

import { Marca } from './Marca';
import { Fornecedor } from '../entity/Fornecedor';

@Entity('venda')
export class Venda {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  id_produto: string;

  @Column("varchar")
  id_cliente: string;

  @Column("integer",{nullable: true})
  valor: number;
 
  @CreateDateColumn({type: "timestamp", name: "created_at"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp", name: "update_at"})
  updatedAt: Date;

}