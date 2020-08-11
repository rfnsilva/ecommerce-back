import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('admin')
export class Admin {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  senha: string;
 
  @CreateDateColumn({type: "timestamp", name: "created_at"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp", name: "updated_at"})
  updatedAt: Date;

}