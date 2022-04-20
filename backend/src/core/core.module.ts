import { Global, Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";
import { ProcessService } from "./services/process.service";
import { ProcessRepository } from "./repositories/process.repository";
import { ProcessTypeRepository } from "./repositories/processType.repository";
import { ProcessTypeService } from "./services/processType.service";
import { ActivityRepository } from "./repositories/activity.repository";
import { ActivityService } from "./services/activity.service";
import { ContactRepository } from "./repositories/contact.repository";
import { ContactService } from "./services/contact.service";
import { WaSenderRepository } from "./repositories/waSender.repository";
import { WaSenderService } from "./services/waSender.service";
import { NotificationService } from "./services/notification.service";
import { ConfigRepository } from "./repositories/config.repository";
import { ConfigService as ConfigurationService, ConfigService } from "./services/config.service";
import { SchedulerRegistry } from "@nestjs/schedule";
import { initSeeder } from "../seeders";
import { CronTime } from "cron";
import { ProcessModeRepository } from "./repositories/processMode.repository";
import { ProcessModeService } from "./services/processMode.service";
import { ActionRepository } from "./repositories/action.repository";
import { ActionService } from "./services/action.service";
import { ProcessActionService } from "./services/processAction.service";
import { ProcessActionRepository } from "./repositories/processAction.repository";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      ProcessRepository,
      ProcessTypeRepository,
      ProcessActionRepository,
      ProcessModeRepository,
      ActivityRepository,
      ActionRepository,
      ContactRepository,
      WaSenderRepository,
      ConfigRepository,

    ])
  ],
  providers: [
    UserService,
    ProcessService,
    ProcessTypeService,
    ProcessModeService,
    ProcessActionService,
    ActivityService,
    ActionService,
    ContactService,
    WaSenderService,
    ConfigService,

    NotificationService
  ],
  exports: [
    UserService,
    ProcessService,
    ProcessTypeService,
    ProcessModeService,
    ProcessActionService,
    ActivityService,
    ActionService,
    ContactService,
    WaSenderService,
    ConfigService,
    NotificationService
  ]
})
export class CoreModule {

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigurationService
  ) {}

  async onApplicationBootstrap() {
    await initSeeder();

    //configure cron
    const configs = await this.configService.getConfigObject();
    const job = this.schedulerRegistry.getCronJob("notifications");
    const time = configs.time;
    let [hour = "10", minute = "00"] = time.split(":");
    const weekendWildcard = configs.weekend? '*': '1-5';
    const cronTime = new CronTime(`0 ${+minute} ${+hour} * * ${weekendWildcard}`);

    job.stop();
    job.setTime(cronTime);
    job.start();

  }

}
