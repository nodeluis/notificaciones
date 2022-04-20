import { EntityRepository, Repository } from "typeorm";
import { ProcessEntity } from "../entities/process.entity";
import { ActivityEntity } from "../entities/activity.entity";
import { ContactEntity } from "../entities/contact.entity";

@EntityRepository(ContactEntity)
export class ContactRepository extends Repository<ContactEntity>{

}