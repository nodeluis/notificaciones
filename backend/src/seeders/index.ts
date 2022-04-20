import { configSeeder } from "./config.seeder";
import { mainUserSeeder } from "./mainUser.seeder";

export const initSeeder = async (): Promise<any> => {
  await configSeeder();
  await mainUserSeeder();
};