import { Module } from '@nestjs/common';
import { TimerResolver } from './timer.resolver';
import { TimerService } from './timer.service';

@Module({
  providers: [TimerResolver, TimerService]
})
export class TimerModule {}
