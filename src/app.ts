import express from 'express';
import path from 'path';
import dotenv from 'dotenv'

const app = express();

dotenv.config({ path: './config.env' });
app.use(express.static(path.join(__dirname, 'public')));


export {app}