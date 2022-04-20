import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { CreateUserReq } from "../../core/dtos/requests/createUserReq.dto";
import { UserService } from "../../core/services/user.service";
import { ResponseInterceptor } from "../../core/interceptors/response.interceptor";

@Controller('api/users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {

  constructor(
    private userService: UserService
  ){}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(){
    return await this.userService.findAllUsers();
  }

  @Post()
  async createUser(@Body() form: CreateUserReq ){
    return await this.userService.createUser(form);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(@Param('id') id: string){
    return await this.userService.getUserById(id);
  }

}
