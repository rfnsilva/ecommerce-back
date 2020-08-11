import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Produto } from './Produto';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {nullable: true})
  nome: string;

  @Column("varchar", {unique: true})
  email: string;

  @Column("varchar")
  senha: string;

  @ManyToMany(type => Produto)
  @JoinTable({name: 'user_produtos_produto', joinColumn: {name: "user_id"}, inverseJoinColumn: {name: "produto_id"}})
  produtos: Produto[];
 
  @CreateDateColumn({type: "timestamp", name: "created_at"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp", name: "updated_at"})
  updatedAt: Date;

}