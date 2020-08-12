import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('slider')
export class Slider {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  url: string;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}