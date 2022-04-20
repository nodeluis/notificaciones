import { ApiProperty } from "@nestjs/swagger";

export class UpdateConfigReq{
  @ApiProperty()
  weekend: boolean;

  @ApiProperty()
  daysBefore: number;

  @ApiProperty()
  time: string;
}