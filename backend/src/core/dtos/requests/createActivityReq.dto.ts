import { ApiProperty } from "@nestjs/swagger";

export class CreateActivityReq{
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  limitDate: Date;

  @ApiProperty()
  done: boolean;
}