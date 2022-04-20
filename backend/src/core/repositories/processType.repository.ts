import { EntityRepository, Repository } from "typeorm";
import { ProcessTypeEntity } from "../entities/processType.entity";

@EntityRepository(ProcessTypeEntity)
export class ProcessTypeRepository extends Repository<ProcessTypeEntity>{

}