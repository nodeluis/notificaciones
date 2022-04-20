import { EntityRepository, Repository } from "typeorm";
import { ProcessModeEntity } from "../entities/processMode.entity";
import { ProcessActionEntity } from "../entities/processAction.entity";

@EntityRepository(ProcessActionEntity)
export class ProcessActionRepository extends Repository<ProcessActionEntity>{

}