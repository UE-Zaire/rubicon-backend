import knex from 'knex';
import keys from '../config';

export default knex({
  client: 'mysql',
  connection: {
    host : keys.host,
    user : keys.user,
    password : keys.password,
    database : keys.database
  }
});