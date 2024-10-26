import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from "./routes/user.routes.js"
const app = express();
dotenv.config()

 const PORT = process.env.PORT || 1000
const URI = process.env.URI

 mongoose.connect(URI).then(() => {
    console.log('connected to mongodb')
  }).catch((err) => {
    console.log(err)
  })

app.use(express.json())


app.use("/api/v1",userRoute)







app.listen(PORT, ()=>
  console.log(`server listening on ${PORT}`)
)

