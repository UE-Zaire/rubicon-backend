import express from 'express';
import bodyParser from 'body-parser';
import { router } from './controllers';

const port = process.env.PORT || 3000;
const app: express.Application = express();

app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
  console.log('listening on port:', port);
})
