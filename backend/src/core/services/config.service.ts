import { Injectable } from "@nestjs/common";
import { ConfigRepository } from "../repositories/config.repository";
import { ConfigurationsResponse } from "../dtos/responses/configurations.response";
import { UpdateConfigReq } from "../dtos/requests/updateConfigReq.dto";
import { ConfigEntity } from "../entities/config.entity";
import { CronTime } from "cron";
import { SchedulerRegistry } from "@nestjs/schedule";

const WEEKEND_CONFIG = 'weekend';
const DAYS_BEFORE_CONFIG = 'days_before';
const TIME_CONFIG = 'time';

@Injectable()
export class ConfigService{
  constructor(
    private configRepository: ConfigRepository,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async getConfigObject(): Promise<ConfigurationsResponse> {

    const configs = await this.configRepository.find();
    const configurations: ConfigurationsResponse = new ConfigurationsResponse();

    //get weekend
    let config = configs.find(c=>c.name == "weekend");
    configurations.weekend = config? config.value=="true": false;
    configurations.weekendDescription = config? config.description: "";

    //get days before
    config = configs.find(c=>c.name == "days_before");
    configurations.daysBefore = config? +config.value: 10;
    configurations.daysBeforeDescription = config? config.description: "";

    config = configs.find(c=>c.name == "time");
    configurations.time = config? config.value: "10:00";
    configurations.timeDescription = config? config.description: "";

    return configurations;
  }

  async updateConfigs(form: UpdateConfigReq){
    const weekend: ConfigEntity = await this.configRepository.findOne({
      where: { name: WEEKEND_CONFIG }
    });
    if(weekend){
      weekend.value = form.weekend? "true": "false";
      await this.configRepository.save(weekend);
    }

    const daysBefore: ConfigEntity = await this.configRepository.findOne({
      where: { name: DAYS_BEFORE_CONFIG }
    });
    if(daysBefore){
      daysBefore.value = form.daysBefore + "";
      await this.configRepository.save(daysBefore);
    }

    const time: ConfigEntity = await this.configRepository.findOne({
      where: { name: TIME_CONFIG }
    });
    if(time){
      time.value = form.time;
      await this.configRepository.save(time);
    }

    //configure cron
    const configs = await this.getConfigObject();
    const job = this.schedulerRegistry.getCronJob("notifications");
    const timeConfig = configs.time;
    let [hour = "10", minute = "00"] = timeConfig.split(":");
    const weekendWildcard = configs.weekend? '*': '1-5';
    const cronTime = new CronTime(`0 ${+minute} ${+hour} * * ${weekendWildcard}`);

    job.stop();
    job.setTime(cronTime);
    job.start();
  }
}