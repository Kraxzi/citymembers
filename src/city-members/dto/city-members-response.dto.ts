import { ApiProperty } from '@nestjs/swagger';

class CityPopulation {
  @ApiProperty({ description: 'The name of the city' })
  city: string;

  @ApiProperty({ description: 'The count of city members' })
  count: number;
}

class CityMember {
  @ApiProperty({ description: 'The first name of a city member' })
  first_name: string;

  @ApiProperty({
    description: 'The count of city members with the same first name',
  })
  member_count: number;
}

export class CityMembersResponseDto {
  @ApiProperty({
    type: () => [CityPopulation],
    description: 'City population data',
  })
  cities_population: CityPopulation[];

  @ApiProperty({ type: () => [CityMember], description: 'City members data' })
  city_members: { city: string; city_members: CityMember[] }[];
}
