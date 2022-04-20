import {
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { hash } from 'bcryptjs';
import { UserInProcessEntity } from "./usersInProcesses.entity";
import { Exclude } from "class-transformer";

@Entity({name: "users"})
export class UserEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column("simple-array")
  roles: string[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @OneToMany(() => UserInProcessEntity, (userInProcess)=>userInProcess.user)
  userInProcess: UserInProcessEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

}