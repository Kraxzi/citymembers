import * as pgPromise from 'pg-promise';
import { dbUri } from '../../config';

const pgp = pgPromise();

const db = pgp(dbUri);

db.connect()
  .then(() => console.log('DB connection successful'))
  .catch(() => console.log('DB connection error'));

export default db;
