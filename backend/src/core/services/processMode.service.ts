import { Injectable } from "@nestjs/common";
import { ProcessModeRepository } from "../repositories/processMode.repository";

@Injectable()
export class ProcessModeService{
  constructor(
    private processModeRepository: ProcessModeRepository
  ) {}

  public async findAll(){
    return await this.processModeRepository.find();
  }
}