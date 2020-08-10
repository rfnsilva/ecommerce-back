import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Produto } from './Produto';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {nullable: true})
  nome: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  senha: string;

  @ManyToMany(type => Produto)
  @JoinTable()
  produtos: Produto[];
 
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}