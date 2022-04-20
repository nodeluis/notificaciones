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

@Entity({name: "contacts"})
export class ContactEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  phone: string;

  @Column({default: true})
  notify: boolean;

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