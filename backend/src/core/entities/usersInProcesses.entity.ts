import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProcessEntity } from "./process.entity";
import { UserEntity } from "./user.entity";

export enum UserType{
  OWNER = "OWNER",
  INTERESTED = "INTERESTED"
}

@Entity({name: "users_processes"})
export class UserInProcessEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(()=>ProcessEntity, (process)=>process.userInProcess)
  @JoinColumn({name: "process_id"})
  process: ProcessEntity

  @ManyToOne(()=>UserEntity, (user)=>user.userInProcess)
  @JoinColumn({name: "user_id"})
  user: UserEntity

  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.INTERESTED
  })
  type: UserType

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

}