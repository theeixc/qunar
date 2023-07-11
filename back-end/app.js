import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import flightRouter from './routes/flight.js'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/flights', flightRouter)


app.get("/", (req, res) => {
  res.send('Hello World!')
})


// 踩坑：node 版本 和 npm 版本不一致会出错（在Atlas中选择2.2.12版本后的）
const MONGODB_ATLAS_URL = "mongodb://cxclimb:cx13277022901@ac-qc1jzxl-shard-00-00.1nuirgt.mongodb.net:27017,ac-qc1jzxl-shard-00-01.1nuirgt.mongodb.net:27017,ac-qc1jzxl-shard-00-02.1nuirgt.mongodb.net:27017/?ssl=true&replicaSet=atlas-iffhna-shard-0&authSource=admin&retryWrites=true&w=majority";


const startServer = () => {
  mongoose.connect(MONGODB_ATLAS_URL)
    .then(() => {
      console.log("Database connected");
      app.listen(5000, () => {
        console.log(`Example app listening on port 5000`)
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

startServer();