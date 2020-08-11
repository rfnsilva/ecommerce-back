import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Produto } from './Produto';

@Entity('marca')
export class Marca {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {unique: true})
  nome: string;

  @OneToMany(type => Produto, produto => produto.marca, {onDelete: 'CASCADE'})
  produtos: Produto[];
 
  @CreateDateColumn({type: "timestamp", name: "created_at"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp", name: "updated_at"})
  updatedAt: Date;

}