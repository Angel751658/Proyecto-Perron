const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: '*',
  exposedHeaders: ['x-user-email'],
  allowedHeaders: ['Content-Type', 'x-user-email']
}));

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/works', require('./routes/workRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

