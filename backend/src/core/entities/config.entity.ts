import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "configs"})
export class ConfigEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  description: string;
}