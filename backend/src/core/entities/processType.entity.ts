import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProcessEntity } from "./process.entity";
import { DefaultActionEntity } from "./defaultAction.entity";

@Entity({name: "process_types"})
export class ProcessTypeEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    default: 0
  })
  order: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @OneToMany(() => ProcessEntity, (process)=>process.type)
  processes: ProcessEntity[]

  @OneToMany(() => DefaultActionEntity, (action)=>action.type)
  defaultActions: DefaultActionEntity[]
}