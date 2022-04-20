import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProcessEntity } from "./process.entity";
import { DefaultActionEntity } from "./defaultAction.entity";

@Entity({name: "process_modes"})
export class ProcessModeEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  initials: string

  @Column({
    nullable: true
  })
  description: string;

  @Column({
    default: 0
  })
  order: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @OneToMany(() => ProcessEntity, (process)=>process.mode)
  processes: ProcessEntity[]

  @OneToMany(() => DefaultActionEntity, (action)=>action.mode)
  defaultActions: DefaultActionEntity[]
}