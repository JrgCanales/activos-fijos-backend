import express from 'express';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 3000;

const app = express();

app.listen(PORT, () => {console.log(`Server runing in port: ${PORT}`)});