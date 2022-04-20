import {
  MessageBody, SubscribeMessage, WebSocketGateway,
  WebSocketServer, WsResponse
} from "@nestjs/websockets";
import { Server } from 'socket.io';
import { from, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { WaSenderService } from "../../core/services/waSender.service";
import { WaSenderEntity } from "../../core/entities/sender.entity";
import {join as joinPath} from "path";
import * as fs from "fs";
import { LegacySessionAuth } from "whatsapp-web.js";

const { Client } = require("whatsapp-web.js");

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class WASenderGateway{

  constructor(
    private waSenderService: WaSenderService
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>>{
    return from([1, 2, 3]).pipe(map(item=>({event: 'events', data: item})));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number>{
    return data;
  }

  @SubscribeMessage('wa_login')
  async login() {
    const self = this;
    const sender: WaSenderEntity = await this.waSenderService.createEmpty();
    const SESSION_FILE_PATH =  joinPath(__dirname, '/sessions', `/${sender.id}.json`);

    const client = new Client({
      authStrategy: new LegacySessionAuth({
      }),
    });

    client.on('qr', (qr) => {
      self.server.emit("wa_qr", { qr });
    });

    client.on("authenticated", (session)=>{
      if(session){
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), async (err) => {
          if (err) {
            console.log("on wa session error", err);
          } else {
            sender.sessionPath = SESSION_FILE_PATH;
            await self.waSenderService.update(sender);
            self.server.emit("wa_login_successful", { success: true });
          }
        });
      }
    });

    client.on('auth_failure', async () => {
      console.log("failure");
      sender.hasError = true;
      await self.waSenderService.update(sender);
      client.destroy();
    });

    client.initialize().catch(ex=>console.log("error authentication", ex));
  }

}