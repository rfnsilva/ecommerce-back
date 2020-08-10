import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";

import { Marca } from './Marca';
import { Fornecedor } from '../entity/Fornecedor';

@Entity('produto')
export class Produto {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  nome: string;

  @Column("varchar")
  descricao: string;

  @Column("boolean", {nullable: true})
  destaque: boolean;

  @Column("integer")
  valor: number;

  @Column("integer", {nullable:true})
  estoque: number;

  @ManyToOne(type => Marca, marca => marca.produtos, {nullable:true, onDelete: 'CASCADE'})
  marca: Marca;

  @ManyToOne(type => Fornecedor, Fornecedor => Fornecedor.produtos, {nullable:true})
  fornecedor: Fornecedor;
 
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}