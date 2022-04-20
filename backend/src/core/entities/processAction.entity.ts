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
import { DefaultActionEntity } from "./defaultAction.entity";

@Entity({name: "process_actions"})
export class ProcessActionEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @ManyToOne(()=>ProcessEntity, (process)=>process.actions)
  @JoinColumn({name: "process_id"})
  process: ProcessEntity

  @Column({name: 'process_id', type: 'uuid'})
  processId: String;

  @ManyToOne(()=>DefaultActionEntity, (action)=>action.processActions)
  @JoinColumn({name: "action_id"})
  action: DefaultActionEntity

  @Column({name: 'action_id', type: 'uuid'})
  actionId: String;
}