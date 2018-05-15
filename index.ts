import express from 'express';
import bodyParser from 'body-parser';
import { router } from './controllers';

const port = process.env.PORT || 3005;
const app: express.Application = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

app.use('/', router);

app.listen(port, () => {
  console.log('listening on port:', port);
})
