import { Injectable } from "@nestjs/common";
import { ProcessTypeRepository } from "../repositories/processType.repository";

@Injectable()
export class ProcessTypeService{
  constructor(
    private processTypeRepository: ProcessTypeRepository
  ) {}

  public async findAll(){
    return await this.processTypeRepository.find();
  }

  // public async getUserById(id: string){
  //   return await this.userRepository.findOne(id);
  // }
}