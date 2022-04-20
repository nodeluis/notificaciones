import { EntityRepository, Repository } from "typeorm";
import { WaSenderEntity } from "../entities/sender.entity";

@EntityRepository(WaSenderEntity)
export class WaSenderRepository extends Repository<WaSenderEntity>{

}