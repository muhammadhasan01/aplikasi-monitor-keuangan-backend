import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import unitsRouter from './routes/units-router.js';
import accountsRouter from './routes/account-router.js';
import paguRouter from './routes/pagu-router.js'
import RKARouter from './routes/RKA-router.js'
import authsRouter from './routes/auth-router.js';
import adoRouter from './routes/ado-router.js';
import pengeluaranRouter from './routes/pengeluaran-router.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.ATLAS_URI;

app.use('/units', unitsRouter);
app.use('/accounts', accountsRouter);
app.use('/auths', authsRouter);
app.use('/pagu', paguRouter);
app.use('/rka', RKARouter);
app.use('/ado', adoRouter);
app.use('/pengeluaran', pengeluaranRouter);

try {
  mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
  })
  app.listen(PORT, () => {
    console.log(`[+] Server is running on PORT: ${PORT}`);
  });
} catch (err) {
  console.log("Error: " + err.message);
}