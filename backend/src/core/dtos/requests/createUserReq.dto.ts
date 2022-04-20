import { ApiProperty } from "@nestjs/swagger";

export class CreateUserReq{
  @ApiProperty()
  fullname: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordConfirm: string;

  @ApiProperty()
  roles: string[];

}