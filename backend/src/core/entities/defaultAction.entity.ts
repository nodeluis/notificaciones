import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProcessTypeEntity } from "./processType.entity";
import { ProcessModeEntity } from "./processMode.entity";
import { ProcessActionEntity } from "./processAction.entity";

@Entity({name: "default_actions"})
export class DefaultActionEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(()=>ProcessTypeEntity, (type)=>type.defaultActions)
  @JoinColumn({name: "process_type_id"})
  type: ProcessTypeEntity;

  @Column({name: 'process_type_id', type: 'uuid', nullable: true})
  typeId: String;

  @ManyToOne(()=>ProcessModeEntity, (mode)=>mode.defaultActions)
  @JoinColumn({name: "process_mode_id"})
  mode: ProcessModeEntity;

  @Column({name: 'process_mode_id', type: 'uuid', nullable: true})
  modeId: String;

  @OneToMany(() => ProcessActionEntity, (pAction)=>pAction.process)
  processActions: ProcessActionEntity[];
}