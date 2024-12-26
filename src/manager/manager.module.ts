import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService]
})
export class ManagerModule {}
