import { app }from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>', 
  process.env.DATABASE_PASSWORD
  );
mongoose.connect(DB).then(() => console.log(`Connection established`));

app.listen(port, () => {
  console.log(`App running on port: ${port}...`)
})
