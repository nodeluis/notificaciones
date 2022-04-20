import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ResponseInterceptor } from "../../core/interceptors/response.interceptor";
import { ContactService } from "../../core/services/contact.service";
import { CreateContactReq } from "../../core/dtos/requests/createContactReq.dto";

@Controller('api/contacts')
@UseInterceptors(ResponseInterceptor)
export class ContactsController {

  constructor(
    private contactService: ContactService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':processId')
  async findAll(  @Param('processId') processId: String ){
    return await this.contactService.findAllContactsByProcessId(processId);
  }

  @Post(':processId/create')
  async createActivity(@Param('processId') processId: String, @Body() form: CreateContactReq ){
    return await this.contactService.addContactToProcess(form, processId);
  }
}
