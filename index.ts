import express from 'express';
import bodyParser from 'body-parser';
import { router } from './controllers';
import passport from 'passport';
import auth from './auth';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import proxy from 'http-proxy-middleware';

const port = process.env.PORT || 3005;
const app: express.Application = express();

auth(passport);
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());

app.use('/', router);

app.listen(port, () => {
  console.log('listening on port:', port);
})
