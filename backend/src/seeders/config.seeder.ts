import { getRepository } from "typeorm";
import { ConfigEntity } from "../core/entities/config.entity";

const WEEKEND_CONFIG = 'weekend';
const DAYS_BEFORE_CONFIG = 'days_before';
const TIME_CONFIG = 'time';

export const configSeeder = async (): Promise<boolean> => {
  const configRepository = getRepository<ConfigEntity>(ConfigEntity);

  const configs = await configRepository.find();

  const weekend =  configs.find(c=>c.name == WEEKEND_CONFIG);
  if (!weekend) {
    const newWeekend = configRepository.create({
      name: WEEKEND_CONFIG,
      value: 'true',
      description: 'Notificar fines de semana'
    });
    await configRepository.save(newWeekend);
  }

  const daysBefore = configs.find(c=>c.name == DAYS_BEFORE_CONFIG);
  if (!daysBefore) {
    const newDaysBefore = configRepository.create({
      name: DAYS_BEFORE_CONFIG,
      value: '10',
      description: 'Notificar dias antes'
    });
    await configRepository.save(newDaysBefore);
  }

  const time = configs.find(c=>c.name == TIME_CONFIG)
  if (!time) {
    const newTime = configRepository.create({
      name: TIME_CONFIG,
      value: '10:00',
      description: 'Hora de notificacion'
    });
    await configRepository.save(newTime);
  }
  return true;
};