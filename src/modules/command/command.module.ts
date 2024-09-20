import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandResolver } from './command.resolver';

@Module({
  providers: [CommandService, CommandResolver]
})
export class CommandModule {}
