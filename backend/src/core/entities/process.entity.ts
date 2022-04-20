import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProcessTypeEntity } from "./processType.entity";
import { UserInProcessEntity } from "./usersInProcesses.entity";
import { ContactEntity } from "./contact.entity";
import { ActivityEntity } from "./activity.entity";
import { ProcessModeEntity } from "./processMode.entity";
import { ProcessActionEntity } from "./processAction.entity";

@Entity({name: "processes"})
export class ProcessEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({name: "cuce_code"})
  cuceCode: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @ManyToOne(()=>ProcessTypeEntity, (type)=>type.processes)
  @JoinColumn({name: "process_type_id"})
  type: ProcessTypeEntity

  @ManyToOne(()=>ProcessModeEntity, (mode)=>mode.processes)
  @JoinColumn({name: "process_mode_id"})
  mode: ProcessModeEntity

  @OneToMany(() => UserInProcessEntity, (userInProcess)=>userInProcess.process)
  userInProcess: UserInProcessEntity[];

  @OneToMany(() => ContactEntity, (contact)=>contact.process)
  contacts: ContactEntity[];

  @OneToMany(() => ActivityEntity, (activity)=>activity.process)
  activities: ActivityEntity[];

  @OneToMany(() => ProcessActionEntity, (action)=>action.process)
  actions: ProcessActionEntity[];
}