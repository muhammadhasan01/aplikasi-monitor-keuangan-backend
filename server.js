import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import unitsRouter from './routes/units-router.js';
import accountsRouter from './routes/account-router.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.ATLAS_URI;

app.use('/units', unitsRouter);
app.use('/accounts', accountsRouter);

try {
    mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
    })
    app.listen(PORT, () => {
        console.log(`[+] Server is running on PORT: ${PORT}`);
    });
} catch (err) {
    console.log("Error: " + err.message);
}