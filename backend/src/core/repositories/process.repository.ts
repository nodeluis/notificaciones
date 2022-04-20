import { EntityRepository, Repository } from "typeorm";
import { ProcessEntity } from "../entities/process.entity";

@EntityRepository(ProcessEntity)
export class ProcessRepository extends Repository<ProcessEntity>{

}