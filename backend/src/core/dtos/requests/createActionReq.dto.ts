import { ApiProperty } from "@nestjs/swagger";

export class CreateActionReq{
  @ApiProperty()
  action: string;

  @ApiProperty()
  limitDate: Date;

  @ApiProperty()
  done: boolean;
}