import { Injectable } from '@nestjs/common';
import db from '../database/connection/connection';
import axios from 'axios';

@Injectable()
export class CityMembersService {
  async countPopulation(city) {
    const data = await db
      .query(
        `SELECT c."name" AS city, COUNT(r."id") AS count
        FROM "cities" c
        LEFT JOIN "residents" r ON c."id" = r."city_id"
        WHERE c."name" LIKE '%${city}%'
        GROUP BY c."name"
        ORDER BY count DESC`,
      )
      .catch((error) =>
        console.error('Error selecting city members:', error.message),
      );
    return data;
  }

  async countMembersWithSameFirstNames(city) {
    const data = await db
      .query(
        `SELECT c."name" AS city,
        json_agg(json_build_object('first_name', r."first_name", 'member_count', member_count)) AS city_members
        FROM "cities" c JOIN
        (SELECT "city_id", "first_name", COUNT(*) AS member_count FROM "residents" GROUP BY "city_id", "first_name") r ON c."id" = r."city_id"
        WHERE c."name" LIKE '%${city}%'
        GROUP BY c."name"
        ORDER BY c."name"`,
      )
      .catch((error) =>
        console.error(
          'Error selecting members count with the same first name:',
          error.message,
        ),
      );
    return data;
  }

  async sendLogRequest(logData: any) {
    try {
      await axios.post('http://localhost:8765/logging', logData);
    } catch (error) {
      console.error('Error sending log request:', error.message);
    }
  }

  async countMembers(city) {
    //1 query solution
    const data = await db
      .query(
        `SELECT
        json_build_object('city', c."name", 'count', SUM(r.member_count)) AS city_population,
        json_agg(
          json_build_object('first_name', r."first_name", 'count', r.member_count)
          ORDER BY r.member_count DESC
        ) AS city_members
      FROM
        "cities" c
      JOIN (
        SELECT
          r.*,
          COUNT(*) OVER (PARTITION BY r."city_id", r."first_name") AS member_count
        FROM
          "residents" r
      ) r ON c."id" = r."city_id"
      WHERE c."name" LIKE '%${city}%'
      GROUP BY
        c."name"
      ORDER BY
        SUM(r.member_count) DESC;
      `,
      )
      .catch((error) =>
        console.error('Error selecting city members:', error.message),
      );
    return data;
  }
}
