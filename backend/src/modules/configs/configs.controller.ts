import { Body, Controller, Get, Post, Put, UseInterceptors } from "@nestjs/common";
import { ResponseInterceptor } from "../../core/interceptors/response.interceptor";
import { ConfigService } from "../../core/services/config.service";
import { CreateProcessReq } from "../../core/dtos/requests/createProcessReq.dto";
import { UpdateConfigReq } from "../../core/dtos/requests/updateConfigReq.dto";

@Controller('api/configs')
@UseInterceptors(ResponseInterceptor)
export class ConfigsController {

  constructor(
    private configService: ConfigService
  ) {}

  @Get()
  async getConfigs(){
    return await this.configService.getConfigObject();
  }

  @Put()
  async updateConfig(@Body() form: UpdateConfigReq ){
    return await this.configService.updateConfigs(form);
  }

}
