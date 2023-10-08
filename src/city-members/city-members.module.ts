import { Module } from '@nestjs/common';
import { CityMembersController } from './city-members.controller';
import { CityMembersService } from './city-members.service';

@Module({
  controllers: [CityMembersController],
  providers: [CityMembersService],
})
export class CityMembersModule {}
