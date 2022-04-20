import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>({
        secret: config.get<string>('JWT_SECRET'),
      })
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
