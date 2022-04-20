import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { WaSenderEntity } from "../entities/sender.entity";
import { Client, LegacySessionAuth } from "whatsapp-web.js";
import * as fs from "fs";
import { WaSenderService } from "./waSender.service";
import { ActivityService } from "./activity.service";
import * as moment from 'moment';
import { MessageEntity } from "../entities/message.entity";
import { ConfigService } from "./config.service";
import { ProcessActionService } from "./processAction.service";

@Injectable()
export class NotificationService{

  constructor(
    private waSenderService: WaSenderService,
    private activityService: ActivityService,
    private processActionService: ProcessActionService,
    private configService: ConfigService
  ) {}

  private readonly logger = new Logger(NotificationService.name)

  @Cron("0 0 10 * * *", {
    name: 'notifications',
    timeZone: 'America/La_Paz'
  })
  async handleCron() {
    const self = this;
    const sender: WaSenderEntity = await self.waSenderService.getAvailableSender();
    const messages: MessageEntity[] = await this.getMessages();

    console.log("my sender", sender, messages);

    if(sender && messages.length > 0){
      const SESSION_FILE_PATH = sender.sessionPath;
      let sessionData;
      if(fs.existsSync(SESSION_FILE_PATH)) {
        sessionData = require(SESSION_FILE_PATH);
        const client = new Client({
          authStrategy: new LegacySessionAuth({
            session: sessionData
          }),
        });

        // if(!client.info){
        //   sender.hasError = true;
        //   await self.waSenderService.update(sender);
        // }

        client.on("authenticated", (session) => {
          console.log("session", session);
          if (session) {
            console.log("info session", client.info);
            fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), async (err) => {
              if (err) {
                console.log("on wa session error", err);
              }
            });
          }
        });

        client.on("disconnected", async (d) => {
          console.log("disconnected", d);
          sender.hasError = true;
          await self.waSenderService.update(sender);
          //client.destroy();
        });

        client.on('auth_failure', async () => {
          console.log("failure");
          sender.hasError = true;
          await self.waSenderService.update(sender);
          //client.destroy();
        });

        console.log("client on ready", client);
        client.on('ready', async () => {
          console.log("client on ready", client);
          this.logger.debug("Sending notification start");
          let counter = sender.messagesCounter;
          messages.forEach((message)=>{
            this.logger.debug("Sending '" + message.message + "' TO: " + message.account);
            client.sendMessage(message.account, message.message)
            client.sendMessage(message.account, message.message)
              .then(resp=>console.log("Success", resp))
              .catch(err=>console.log("Error", err));
            counter++;
          });
          sender.messagesCounter = counter;
          self.waSenderService.update(sender);
          this.logger.debug("Sending notification end");
          //client.destroy();
        });

        client.initialize().catch(ex=>console.log("xd",ex));
      }
    }
  }

  private async getMessages(): Promise<MessageEntity[]> {
    const messages = [];
    const now = moment();
    const configs = await this.configService.getConfigObject();

    const data = await this.activityService.getActivityWithRelations();
    data.forEach((activity)=>{
      const { process } = activity;
      const activityLimit = moment(activity.limitDate)

      if(process){
        const { contacts = [] } = process;
        let messageText = "SIS: Hoy es el plazo limite para: '"+activity.title+" - ("+activity.process.name+")'";
        const diff = now.diff(activityLimit, 'days');
        if(diff <= configs.daysBefore){
          if(now.format('YYYYMMDD')!=activityLimit.format('YYYYMMDD')){
            if(diff<0){
              messageText = "SIS: En "+(-diff)+" dias finaliza: '"+activity.title+" - ("+ activity.process.name+")'";
            }else if (diff>0){
              messageText = "SIS: Hace "+(diff)+" dias finalizo: '"+activity.title+" - ("+ activity.process.name+")'";
            }
          }
          contacts.forEach(contact => {
            if(contact.notify){
              messages.push(new MessageEntity("591"+contact.phone+"@s.whatsapp.net", messageText));
            }
          });
        }
      }
    });

    const data2 = await this.processActionService.getActionsWithRelations();
    data2.forEach((actionProcess)=>{
      const { process, action } = actionProcess;
      const actionLimit = moment(actionProcess.limitDate)

      if(process){
        const { contacts = [] } = process;
        let messageText = "SIS_A: Hoy es el plazo limite para: '"+action.name+" - ("+process.name+")'";
        messageText = messageText + "\n" + action.description;
        const diff = now.diff(actionLimit, 'days');
        if(diff <= configs.daysBefore){
          if(now.format('YYYYMMDD')!=actionLimit.format('YYYYMMDD')){
            if(diff<0){
              messageText = "SIS_A: En "+(-diff)+" dias finaliza: '"+action.name+" - ("+ process.name+")'";
            }else if (diff>0){
              messageText = "SIS_A: Hace "+(diff)+" dias finalizo: '"+action.name+" - ("+ process.name+")'";
            }
            messageText = messageText + "\n" + action.description;
          }
          contacts.forEach(contact => {
            if(contact.notify){
              messages.push(new MessageEntity("591"+contact.phone+"@s.whatsapp.net", messageText));
            }
          });
        }
      }
    });
    return messages;
  }


}