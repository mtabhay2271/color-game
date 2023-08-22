import express, { Request, Response, NextFunction, Application } from 'express';
import http from 'http';
import routes from './api/v1/routes/index';
import dotenv from 'dotenv';
import path from 'path';
import DBConnation from './db.connation';
import cors from 'cors';
import { WebSocket, Server as WSServer } from 'ws'; // Import the Server class from 'ws'
dotenv.config();

const app: Application = express();
const httpServer = http.createServer(app);

DBConnation.connect(process.env.MONGO_DB_CONNECTION_STRING ?? '');

app.use(cors());

// Set up WebSocket server using the httpServer
const wss = new WSServer({ noServer: true });

httpServer.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit("connection", ws, request);
  });
});

// Listen for WebSocket connections
wss.on('connection', (socket: WebSocket) => {
  console.log('A user connected to WebSocket');
  socket.on('headers', (headers) => {
    headers.push('Access-Control-Allow-Origin: *'); // Replace * with your allowed origins
    headers.push('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  });
  socket.on('message', (message: string) => {
    // console.log('Received message from WebSocket:', message);

    // ... handle other incoming messages ...
  }); 
  socket.on('close', () => {
    // console.log('A user disconnected from WebSocket');
  });
});

let i = 10;
setInterval(() => {
  --i
  if (i < 0) {
    i = 10
  }
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(i);
    }
  });
}, 1000);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/data', express.static('public/imp'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  next();
}, routes);
app.use('/pay', express.static('public'));

const PORT = process.env.PORT || 7009;
httpServer.listen(PORT, () => console.log(`App listening on ${PORT}`));
