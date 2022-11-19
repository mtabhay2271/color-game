import express, { Request, Response, NextFunction, Application } from "express";
import routes from "./api/v1/routes/index";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors'
import http from "http";
import DBConnation from './db'
import imgModel from "./api/v1/models/image"


dotenv.config();
const app: Application = express();

DBConnation.connect(process.env.MONGO_DB_CONNECTION_STRING ?? "")

const server = http.createServer(app);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use("/public/data", express.static("public/imp"));
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/api", (req: Request, res: Response, next: NextFunction) => {
  console.log("headers>>>>", req.headers.authorization, "<<<<<headers");
  console.log("req.body>>>> ", req.method, req.originalUrl, req.body, "<<<<<req.body");
  next();
}, routes);

// app.get("/test", (req, res) => {
//   res.json({ message: "Working" });
// });


app.get('/', (req, res) => {
  imgModel.find({}, (err: any, items: any) => {
    if (err) {
      console.log(err);
      res.status(500).send({ msg: 'An error occurred', err });
    } else {
      // console.log(items);
      res.render('imagesPage', { items: items });
    }
  });
});

const PORT = process.env.PORT || 7009;
server.listen(PORT, () => console.log(`App listening on ${PORT}`));

