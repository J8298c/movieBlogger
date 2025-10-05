import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';

dotenv.config();


const { MONGO_URI, PORT } = process.env as { MONGO_URI: string; PORT: string };

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const port = PORT ? PORT : 3000
    app.listen(port, () => {
      console.log(`app is listening on port: ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });