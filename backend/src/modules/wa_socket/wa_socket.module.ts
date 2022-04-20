import { Module } from "@nestjs/common";
import { WASenderGateway } from "./wa_sender.gateway";

@Module({
  providers: [WASenderGateway]
})
export class WASocketModule {}