import express, { Request, Response, NextFunction, Application } from 'express';
import http from 'http';
import routes from './api/v1/routes/index';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import { ServerOptions } from 'https';
import { WebSocket, Server as WSServer } from 'ws'; // Import the Server class from 'ws'

import DBConnation from './db.connation';
import ColorService from './api/v1/services/color.services';
import LotteryService from './api/v1/services/color.services'
import Corn from './api/v1/common/cronJob';

dotenv.config();
Corn.daily.start();
Corn.monthly.start();
const app: Application = express();
const options: ServerOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./certificate.pem')
};
//const httpsServer = https.createServer(options, app);
const httpsServer = http.createServer(app);
DBConnation.connect(process.env.MONGO_DB_CONNECTION_STRING ?? '');
// const corsOptions = {
//   origin: 'http://colorgame.s3-website.us-east-2.amazonaws.com',
//   optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});
// Set up WebSocket server using the httpServer
const wss = new WSServer({ noServer: true });
httpsServer.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit("connection", ws, request);
  });
});

// Listen for WebSocket connections
wss.on('connection', (socket: WebSocket) => {
  console.log('A user connected to WebSocket');

  socket.on('message', (message: string) => {
    console.log('Received message from WebSocket:', message);
    // ... handle other incoming messages ...
  });
  socket.on('close', () => {
    console.log('A .user disconnected from WebSocket');
  });
});
const gameTime = 300
let i = gameTime;
setInterval(() => {
  --i
  if (i == 3) {
    ColorService.add();
    LotteryService.add();
  }
  if (i < 0) {
    i = gameTime
  }
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(i);
    }
  });
}, 1000);
//commont
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/data', express.static('public/imp'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  next();
}, routes);
app.use('/pay', express.static('public'));
const PORT = process.env.PORT || 7009;
httpsServer.listen(PORT, () => console.log(`App listening on ${PORT}`));
