import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProcessEntity } from "./process.entity";

@Entity({name: "activities"})
export class ActivityEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column()
  limitDate: Date;

  @Column({
    default: false
  })
  done: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @ManyToOne(()=>ProcessEntity, (process)=>process.userInProcess)
  @JoinColumn({name: "process_id"})
  process: ProcessEntity

  @Column({name: 'process_id', type: 'uuid'})
  processId: String;
}