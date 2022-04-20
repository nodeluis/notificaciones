import { Injectable } from "@nestjs/common";
import { ProcessRepository } from "../repositories/process.repository";
import { CreateUserReq } from "../dtos/requests/createUserReq.dto";
import { UserEntity } from "../entities/user.entity";
import { CreateProcessReq } from "../dtos/requests/createProcessReq.dto";
import { ProcessEntity } from "../entities/process.entity";
import { ProcessTypeRepository } from "../repositories/processType.repository";
import { ProcessTypeEntity } from "../entities/processType.entity";
import { ProcessModeRepository } from "../repositories/processMode.repository";
import { ProcessModeEntity } from "../entities/processMode.entity";

@Injectable()
export class ProcessService{
  constructor(
    private processRepository: ProcessRepository,
    private processTypeRepository: ProcessTypeRepository,
    private processModeRepository: ProcessModeRepository
  ) {}

  public async findById(processId: String){
    return await this.processRepository.findOne({
      where: {'id': processId},
      relations: ["type", "mode"]
    });
  }

  public async createProcess(data: CreateProcessReq): Promise<ProcessEntity>{
    const type: ProcessTypeEntity = await this.processTypeRepository.findOne(data.type);
    const mode: ProcessModeEntity = await this.processModeRepository.findOne(data.mode);
    const process = new ProcessEntity();
    process.name = data.name;
    process.cuceCode = data.cuce;
    process.type = type;
    process.mode = mode;
    return await this.processRepository.save(process);
  }

  public async findAllProcesses(){
    return await this.processRepository.find({ relations: ["type", "mode"] });
  }

  // public async getUserById(id: string){
  //   return await this.userRepository.findOne(id);
  // }
}