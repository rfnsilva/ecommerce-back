import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";

import { Fornecedor } from '../entity/Fornecedor';

@Entity('conta')
export class Conta {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer")
  valor: number;
  
  @OneToOne(type => Fornecedor, {onDelete: 'CASCADE'})
  @JoinColumn()
  fornecedor: Fornecedor;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
   
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}