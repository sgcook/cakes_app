import mongoose from 'mongoose';
import app from './app';
import 'dotenv/config'
require('dotenv').config();

const port = process.env.PORT || 5050;


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    })
  })
  .catch((err) => {
    console.log(err);
  })

