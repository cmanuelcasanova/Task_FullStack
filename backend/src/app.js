import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";

import dotenv from "dotenv";



const app = express();
dotenv.config({ quiet: true }); 


app.use(cors({
 origin: process.env.FRONTEND_URL,   
  credentials: true                
}));

app.get('/', (req, res) => {
  res.send('Backend activo  🚀');
});


app.use(express.json());
app.use(cookieParser());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);


export default app;

