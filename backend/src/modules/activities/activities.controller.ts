import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ActivityService } from "../../core/services/activity.service";
import { CreateActivityReq } from "../../core/dtos/requests/createActivityReq.dto";
import { ResponseInterceptor } from "../../core/interceptors/response.interceptor";

@Controller('api/activities')
@UseInterceptors(ResponseInterceptor)
export class ActivitiesController {

  constructor(
    private activityService: ActivityService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':processId')
  async findAll(  @Param('processId') processId: String ){
    return await this.activityService.findAllActivitiesByProcessId(processId);
  }

  @Post(':processId/create')
  async createActivity(@Param('processId') processId: String, @Body() form: CreateActivityReq ){
    return await this.activityService.addActivityToProcess(form, processId);
  }
}