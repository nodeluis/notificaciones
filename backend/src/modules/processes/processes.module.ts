import { Module } from '@nestjs/common';
import { ProcessesController } from './processes.controller';

@Module({
  controllers: [ProcessesController]
})
export class ProcessesModule {}
