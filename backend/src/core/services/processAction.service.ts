import { Injectable } from "@nestjs/common";
import { ProcessModeRepository } from "../repositories/processMode.repository";
import { ProcessActionRepository } from "../repositories/processAction.repository";
import { CreateActivityReq } from "../dtos/requests/createActivityReq.dto";
import { ActivityEntity } from "../entities/activity.entity";
import { ProcessActionEntity } from "../entities/processAction.entity";
import { CreateActionReq } from "../dtos/requests/createActionReq.dto";

@Injectable()
export class ProcessActionService{
  constructor(
    private processActionRepository: ProcessActionRepository
  ) {}

  public async findByProcessId(processId: String){
    return await this.processActionRepository.find({
      where: {'processId': processId},
      relations: ["action"]
    });
  }

  public async addActionToProcess(data: CreateActionReq, processId: String): Promise<ProcessActionEntity>{
    const action = new ProcessActionEntity();
    action.actionId = data.action;
    action.limitDate = data.limitDate;
    action.done = data.done;
    action.processId = processId;
    return await this.processActionRepository.save(action);
  }

  public async getActionsWithRelations(){
    return await this.processActionRepository.find({
      relations: ["process", "process.contacts", "action"],
      where: {
        done: false
      }
    });
  }
}