import { ApiProperty } from "@nestjs/swagger";

export class CreateContactReq{
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  notify: boolean;
}