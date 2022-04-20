import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "whatsapp_senders"})
export class WaSenderEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true
  })
  name: string;

  @Column({
    nullable: true
  })
  account: string;

  @Column({
    nullable: true,
    name: 'session_path'
  })
  sessionPath: string;

  @Column({
    default: 0,
    name: "messages_counter"
  })
  messagesCounter: number;

  @Column({
    default: false,
    name: "has_error"
  })
  hasError: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}