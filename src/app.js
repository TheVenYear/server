import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth-router';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on http://localhost:8000/');
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
mongoose.set('useFindAndModify', false);
