import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityMembersController } from './city-members/city-members.controller';
import { CityMembersService } from './city-members/city-members.service';
import { CityMembersModule } from './city-members/city-members.module';

@Module({
  imports: [CityMembersModule],
  controllers: [AppController, CityMembersController],
  providers: [AppService, CityMembersService],
})
export class AppModule {}
