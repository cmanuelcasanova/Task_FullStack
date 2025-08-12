import app from './app.js';
import dotenv from 'dotenv';


dotenv.config({ quiet: true });
import { connectDB } from './config/mongo.js';

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
