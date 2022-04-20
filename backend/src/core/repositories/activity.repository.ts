import { EntityRepository, Repository } from "typeorm";
import { ProcessEntity } from "../entities/process.entity";
import { ActivityEntity } from "../entities/activity.entity";

@EntityRepository(ActivityEntity)
export class ActivityRepository extends Repository<ActivityEntity>{

}