import { ApiProperty } from "@nestjs/swagger";

export class CreateProcessReq{
  @ApiProperty()
  name: string;

  @ApiProperty()
  cuce: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  mode: string;
}