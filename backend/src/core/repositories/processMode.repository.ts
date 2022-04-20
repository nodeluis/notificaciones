import { EntityRepository, Repository } from "typeorm";
import { ProcessModeEntity } from "../entities/processMode.entity";

@EntityRepository(ProcessModeEntity)
export class ProcessModeRepository extends Repository<ProcessModeEntity>{

}