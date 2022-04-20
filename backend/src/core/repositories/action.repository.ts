import { EntityRepository, Repository } from "typeorm";
import { DefaultActionEntity } from "../entities/defaultAction.entity";

@EntityRepository(DefaultActionEntity)
export class ActionRepository extends Repository<DefaultActionEntity>{

}