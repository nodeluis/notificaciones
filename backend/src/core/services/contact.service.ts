import { Injectable } from "@nestjs/common";
import { ContactRepository } from "../repositories/contact.repository";
import { ContactEntity } from "../entities/contact.entity";
import { CreateContactReq } from "../dtos/requests/createContactReq.dto";

@Injectable()
export class ContactService{
  constructor(
    private contactRepository: ContactRepository,
  ) {}

  public async addContactToProcess(data: CreateContactReq, processId: String): Promise<ContactEntity>{
    const contact = new ContactEntity();
    contact.name = data.name;
    contact.position = data.position;
    contact.phone = data.phone;
    contact.notify = data.notify;
    contact.processId = processId;
    return await this.contactRepository.save(contact);
  }

  public async findAllContactsByProcessId(processId: String){
    return await this.contactRepository.find({where: {'processId': processId}});
  }
}