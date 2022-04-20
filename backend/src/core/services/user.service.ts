import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { CreateUserReq } from "../dtos/requests/createUserReq.dto";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService{
  constructor(
    private userRepository: UserRepository
  ) {}

  public async findByUsername(username: String){
    return await this.userRepository.findOne({
      where: {
        username: username
      }
    });
  }

  public async createUser(data: CreateUserReq): Promise<UserEntity>{
    const user = new UserEntity();
    user.fullname = data.fullname;
    user.username = data.username;
    user.password = data.password;
    user.roles = data.roles;
    user.phone = data.phone;
    return await this.userRepository.save(user);
  }

  public async findAllUsers(){
    return await this.userRepository.find();
  }

  public async getUserById(id: string){
    return await this.userRepository.findOne(id);
  }
}