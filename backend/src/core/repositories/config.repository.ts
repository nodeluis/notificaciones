import { EntityRepository, Repository } from "typeorm";
import { ConfigEntity } from "../entities/config.entity";

@EntityRepository(ConfigEntity)
export class ConfigRepository extends Repository<ConfigEntity>{  }