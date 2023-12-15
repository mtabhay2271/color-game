import express, { Request, Response, NextFunction, Application } from "express";
import routes from "./api/v1/routes/index";
// import fileroutes from "./api/file-upload/v1/routes/index";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors'
import http from "http";
import DBConnation from './db.connation'
import Corn from './api/v1/common/cronJob';
import lotteryServices from "./api/v1/services/lottery.services";
import colorServices from "./api/v1/services/color.services";

dotenv.config();
// const cronJob = require("./api/v1/common/cronJob");
//creating App
const app: Application = express();

//Connecting to database
DBConnation.connect(process.env.MONGO_DB_CONNECTION_STRING ?? "")

// creating socket server using http server.;
const server = http.createServer(app);

dotenv.config();

Corn.daily.start();
Corn.monthly.start();

let currentTime

// Format the time to display hours, minutes, and seconds
// let hours = currentTime.getHours();
// let minutes = currentTime.getMinutes();
let seconds
setInterval(() => {
  currentTime = new Date();
  seconds = 60 - currentTime.getSeconds();
  if (seconds == 4) {
    console.log("seconds>>",seconds);    
    lotteryServices.add()
    colorServices.add()
  }
  console.log(">>se",seconds)
}, 1000);


app.use(cors());
// app.use(cors({ origin: 'http://localhost:19006' }));

app.use(express.static(path.join(__dirname, 'public')));

app.use("/public/data", express.static("public/imp"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/service_thumbnail", express.static("public/uploads/service_types_images"));
app.use("/api", (req: Request, res: Response, next: NextFunction) => {
  // console.log("headers>>>>", req.headers.authorization, "<<<<<headers");
  // console.log("req.body>>>>", req.method, req.originalUrl, req.body, "<<<<<req.body");
  next();
}, routes);
//
app.use('/pay', express.static('public'));

app.get("/test", (req, res) => {
  res.json({ message: "Working" });
})

const PORT = process.env.PORT || 7009;
server.listen(PORT, () => console.log(`App listening on ${PORT}`));

