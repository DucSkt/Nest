import { Module } from '@nestjs/common';
import { DucController } from './duc.controller';
import { DucService } from './duc/duc.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [DucController],
  providers: [DucService],
})
export class DucModule {}
