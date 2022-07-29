import { connect } from 'mongoose';
import { dbConnection } from '..';


const DB = dbConnection.DATABASE.replace(
  '<PASSWORD>',
  dbConnection.DATABASE_PASSWORD
);

export default connect(DB);