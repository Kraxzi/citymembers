How to run the project:

npm install
create .env (.env.template is in the root)
docker-compose up
npm run seed-data (You can change the amount of data in seed.ts file)
npm start

=====================================================================

Swagger:

GET /api

=====================================================================

Indexes:

Partial index on city names - to improve querying with filter "city" partial coincidence
Composite index on city id and first name - to improve querying city members with the same names

=====================================================================

Additional comments:

I'm not sure that it's possible to make given structure with one query
and without mapping data on a server, so that's why I used 2.
But in the service I provided 1 query solution in the countMembers method. The structure is this way:

[{city_population: {city: A, count: 100}, city_members: {first_name: John, count: 2 }},
{city_population: {city: B, count: 50}, city_members: {first_name: Bill, count: 6 }},
...]
