import express, { Request, Response, NextFunction, Application } from 'express';
import http from 'http';
import routes from './api/v1/routes/index';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import cors from 'cors'
import https from 'https'
import { ServerOptions } from 'https';
import { WebSocket, Server as WSServer } from 'ws'; // Import the Server class from 'ws'

import DBConnation from './db.connation';
import ColorService from './api/v1/services/color.services';
import LotteryService from './api/v1/services/lottery.services'
import Corn from './api/v1/common/cronJob';

dotenv.config();
Corn.daily.start();
Corn.monthly.start();
const app: Application = express();

DBConnation.connect(process.env.MONGO_DB_CONNECTION_STRING ?? '');

const options: ServerOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./certificate.pem')
};
// const httpsServer = https.createServer(options, app);
// Enable CORS for all routes
// const corsOptions = {
//   origin: 'http://localhost:3000/',
//   credentials: true,
//   optionSuccessStatus: 200
// }

// creating socket server using http server.;
const server = http.createServer(app);
app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
const httpsServer = http.createServer(app);



// //set up WebSocket server using the httpServer
// const wss = new WSServer({ noServer: true });
// httpsServer.on("upgrade", (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, ws => {
//     wss.emit("connection", ws, request);
//   });
// });

// // Listen for WebSocket connections
// wss.on('connection', (socket: WebSocket) => {
//   console.log('A user connected to WebSocket');

//   socket.on('message', (message: string) => {
//     console.log('Received message from WebSocket:', message);
//     // ... handle other incoming messages ...
//   });
//   socket.on('close', () => {
//     console.log('A .user disconnected from WebSocket');
//   });
// });
// const gameTime = 300
// let i = gameTime;
// setInterval(() => {
//   --i
//   if (i == 3) {
//     ColorService.add();
//     LotteryService.add();
//   }
//   if (i == 0) {
//     i = gameTime
//   }
//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(i);
//     }
//   });
// }, 1000);
//commont
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/data', express.static('public/imp'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  next();
}, routes);
app.use('/pay', express.static('public'));
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`App listening on ${PORT}`));
