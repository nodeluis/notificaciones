import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ProcessService } from "../../core/services/process.service";
import { ProcessTypeService } from "../../core/services/processType.service";
import { ResponseInterceptor } from "../../core/interceptors/response.interceptor";
import { CreateUserReq } from "../../core/dtos/requests/createUserReq.dto";
import { CreateProcessReq } from "../../core/dtos/requests/createProcessReq.dto";
import { ProcessModeService } from "../../core/services/processMode.service";

@Controller('api/processes')
@UseInterceptors(ResponseInterceptor)
export class ProcessesController {

  constructor(
    private processService: ProcessService,
    private processTypeService: ProcessTypeService,
    private processModeService: ProcessModeService
  ){}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(){
    return await this.processService.findAllProcesses();
  }

  @Post()
  async createUser(@Body() form: CreateProcessReq ){
    return await this.processService.createProcess(form);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("types")
  async findTypes(){
    return await this.processTypeService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("modes")
  async findModes(){
    return await this.processModeService.findAll();
  }

  @Get(':processId')
  async findById(  @Param('processId') processId: String ){
    return await this.processService.findById(processId);
  }
}
