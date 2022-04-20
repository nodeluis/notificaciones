import { Injectable } from "@nestjs/common";

import { ActivityRepository } from "../repositories/activity.repository";
import { ActivityEntity } from "../entities/activity.entity";
import { CreateActivityReq } from "../dtos/requests/createActivityReq.dto";


@Injectable()
export class ActivityService{
  constructor(
    private activityRepository: ActivityRepository,
  ) {}

  public async addActivityToProcess(data: CreateActivityReq, processId: String): Promise<ActivityEntity>{
    const activity = new ActivityEntity();
    activity.title = data.title;
    activity.description = data.description;
    activity.processId = processId;
    activity.limitDate = data.limitDate;
    activity.done = data.done;
    return await this.activityRepository.save(activity);
  }

  public async findAllActivitiesByProcessId(processId: String){
    return await this.activityRepository.find({where: {'processId': processId}});
  }

  public async getActivityWithRelations(){
    return await this.activityRepository.find({
      relations: ["process", "process.contacts"],
      where: {
        done: false
      }
    });
  }
}