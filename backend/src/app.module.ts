import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoreModule } from "./core/core.module";
import { ProcessesModule } from './modules/processes/processes.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import {join} from 'path'
import { WASocketModule } from "./modules/wa_socket/wa_socket.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigsModule } from './modules/configs/configs.module';
import { ActionsModule } from "./modules/actions/actions.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";

@Module({
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
  imports: [
    WASocketModule,
    ScheduleModule.forRoot(),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', ''),
        port: parseInt(config.get<string>('DATABASE_PORT', '5432')),
        username: config.get<string>('DATABASE_USERNAME', 'pg'),
        password: config.get<string>('DATABASE_PASSWORD', 'pg'),
        database: config.get<string>('DATABASE_NAME', 'db'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'file',
      })
    }),
    CoreModule,
    AuthModule,
    ActionsModule,
    UsersModule,
    ProcessesModule,
    ActivitiesModule,
    ContactsModule,
    ConfigsModule
  ],
  controllers: [],
})
export class AppModule {
}
