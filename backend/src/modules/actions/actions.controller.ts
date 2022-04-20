import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, UseInterceptors } from "@nestjs/common";
import { ActivityService } from "../../core/services/activity.service";
import { CreateActivityReq } from "../../core/dtos/requests/createActivityReq.dto";
import { ResponseInterceptor } from "../../core/interceptors/response.interceptor";
import { ActionService } from "../../core/services/action.service";
import { ProcessActionService } from "../../core/services/processAction.service";
import { CreateActionReq } from "../../core/dtos/requests/createActionReq.dto";

@Controller('api/actions')
@UseInterceptors(ResponseInterceptor)
export class ActionsController {

  constructor(
    private actionService: ActionService,
    private processActionService: ProcessActionService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('defaults')
  async findAll(@Query("type") typeId: String = '', @Query("mode") modeId: String = '' ){
    return await this.actionService.findActionsByTypeAndEntity(typeId, modeId);
  }

  @Post(':processId/create')
  async createActivity(@Param('processId') processId: String, @Body() form: CreateActionReq ){
    return await this.processActionService.addActionToProcess(form, processId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':processId')
  async findActions(  @Param('processId') processId: String ){
    return await this.processActionService.findByProcessId(processId);
  }
}