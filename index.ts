import express from 'express';
import bodyParser from 'body-parser';
import { router } from './controllers';
import passport from 'passport';
import auth from './auth/auth';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import keys from './config';
import { Server } from 'http';
import socket from 'socket.io';
import { handleSocketConnections } from './socketHandlers';

const port = process.env.PORT || 3005;
const app: express.Application = express();

const server = new Server(app);
const io = socket(server);

auth(passport);
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(cookieSession({
    name: 'session',
    keys: [keys.COOKIE_KEYS]
}));
app.use(cookieParser());

app.use('/', router);

server.listen(port, () => {
  console.log('listening on port:', port);
})

io.on('connection', handleSocketConnections);

export {
  socket
}