import { Injectable } from "@nestjs/common";

import { ActivityRepository } from "../repositories/activity.repository";
import { ActivityEntity } from "../entities/activity.entity";
import { CreateActivityReq } from "../dtos/requests/createActivityReq.dto";
import { ActionRepository } from "../repositories/action.repository";
import { Brackets } from "typeorm";


@Injectable()
export class ActionService{
  constructor(
    private actionRepository: ActionRepository
  ) {}

  public async findActionsByTypeAndEntity(typeId: String, modeId: String){

    let query = this.actionRepository.createQueryBuilder("act");
    if(typeId.length>0){
      query.andWhere(new Brackets(qb=>{
        qb.where("act.process_type_id = :type_id", {type_id: typeId})
          .orWhere("act.process_type_id is null");
      }));
    }
    if(modeId.length>0){
      query.andWhere(new Brackets(qb=>{
        qb.where("act.process_mode_id = :mode_id", {mode_id: modeId})
          .orWhere("act.process_mode_id is null");
      }));
    }
    return await query.getMany();
  }
}