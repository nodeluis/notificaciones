import { Injectable } from "@nestjs/common";
import { UserService } from "../../core/services/user.service";
import { compare } from 'bcryptjs';
import { UserEntity } from "../../core/entities/user.entity";
import {JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: String, password: String): Promise<any>{
    const user = await this.userService.findByUsername(username);
    if(user && (await compare(password, user.password))){
        const {password, ...result} = user;
        return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}