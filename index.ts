import express, { Request, Response, NextFunction, Application } from "express";
import routes from "./api/v1/routes/index";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors'
import http from "http";
import DBConnation from './db.connation'
// import cronJob from "./api/v1/common/cronJob";

dotenv.config();
//creating App
const app: Application = express();

//Connecting to database
DBConnation.connect(process.env.MONGO_DB_CONNECTION_STRING ?? "")

// creating socket server using http server.;
const server = http.createServer(app);

// cronJob.daily.start();
// cronJob.weekly.start();
// cronJob.monthly.start();

app.use(cors());
// app.use(cors({ origin: 'http://localhost:19006' }));
// app.use(cors({
//   allowedHeaders: ['Authorization', 'Content-Type'],
// }));


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

