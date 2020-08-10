import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";

@Entity('receita')
export class Receita {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer")
  valor: number;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}