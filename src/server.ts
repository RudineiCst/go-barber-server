import express from 'express';
import routes from './routes/index';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

/* eslint-disable-next-line */
app.listen(3333, () => console.log('Server started on port 3333'));
