import { ApiTags, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { CityMembersService } from './city-members.service';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { CityMembersResponseDto } from './dto/city-members-response.dto';
import { HttpStatus } from '../enums/http-status.enum';

@Controller('cityMembers')
@ApiTags('City Members')
export class CityMembersController {
  constructor(private readonly cityMembersService: CityMembersService) {}

  @Get('population')
  @ApiParam({ name: 'city', type: String, description: 'The name of the city' })
  @ApiOkResponse({
    type: CityMembersResponseDto,
    description: 'Successful response',
  })
  async getMembersCount(@Query('city') city: string, @Res() res) {
    const startTime = Date.now();

    city = city === undefined ? '' : city;

    const citiesPopulation = await this.cityMembersService.countPopulation(
      city,
    );
    const cityMembers =
      await this.cityMembersService.countMembersWithSameFirstNames(city);
    const data = {
      cities_population: citiesPopulation,
      city_members: cityMembers,
    };

    const duration = Date.now() - startTime;

    const logData = {
      requestDuration: duration,
      requestData: { city },
      responseData: data,
      httpStatus: HttpStatus.OK,
    };

    if (
      (citiesPopulation && !cityMembers) ||
      (cityMembers && !citiesPopulation)
    ) {
      logData.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      await this.cityMembersService.sendLogRequest(logData);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    } else {
      await this.cityMembersService.sendLogRequest(logData);
      res.status(HttpStatus.OK).json(data);
    }
  }
}
