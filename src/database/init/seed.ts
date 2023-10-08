import * as faker from 'faker';
import db from '../connection/connection';

interface City {
  name: string;
  description: string | null;
}

interface Resident {
  first_name: string;
  last_name: string;
  city_id: number;
}

function generateRandomCity(): City {
  return {
    name: faker.address.city(),
    description: faker.lorem.sentence(),
  };
}

function generateRandomResident(cityId: number): Resident {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    city_id: cityId,
  };
}

async function insertRandomEntries() {
  try {
    for (let i = 0; i < 100; i++) {
      const city = generateRandomCity();
      await db.none('INSERT INTO cities(name, description) VALUES($1, $2)', [
        city.name,
        city.description,
      ]);
    }

    for (let i = 0; i < 100; i++) {
      const cityId = Math.floor(Math.random() * 100) + 1;
      const resident = generateRandomResident(cityId);
      await db.none(
        'INSERT INTO residents(first_name, last_name, city_id) VALUES($1, $2, $3)',
        [resident.first_name, resident.last_name, resident.city_id],
      );
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

insertRandomEntries();
