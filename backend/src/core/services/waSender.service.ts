import { Injectable } from "@nestjs/common";
import { WaSenderRepository } from "../repositories/waSender.repository";
import { CreateContactReq } from "../dtos/requests/createContactReq.dto";
import { ContactEntity } from "../entities/contact.entity";
import { WaSenderEntity } from "../entities/sender.entity";
import { Not } from "typeorm";

@Injectable()
export class WaSenderService{
  constructor(
    private waSenderRepository: WaSenderRepository
  ) {}

  public async createEmpty(): Promise<WaSenderEntity>{
    const sender = new WaSenderEntity();
    return await this.waSenderRepository.save(sender);
  }

  public async update(sender: WaSenderEntity): Promise<WaSenderEntity>{
    return await this.waSenderRepository.save(sender);
  }

  public async getAvailableSender(): Promise<WaSenderEntity|undefined>{
    const senders = await this.waSenderRepository.find({
      where: {
        hasError: false,
        sessionPath: Not('')
      },
      order: {
        messagesCounter: "DESC"
      }
    });
    if(senders.length>0){
      return senders[0];
    }
    return undefined;
  }



}