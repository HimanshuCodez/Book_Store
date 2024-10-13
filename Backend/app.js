import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
dotenv.config()

 const PORT = process.env.PORT || 1000
const URI = process.env.URI

 mongoose.connect(URI).then(() => {
    console.log('connected to mongodb')
  }).catch((err) => {
    console.log(err)
  })









app.listen(PORT, ()=>
  console.log(`server listening on ${PORT}`)
)

