// dependencia necessária para utilização do typeorm
import 'reflect-metadata';
import express from 'express';
import routes from './routes/index';
import uploadConfig from './config/upload';

// importando conexao com o banco de dados
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);

/* eslint-disable-next-line */
app.listen(3333, () => console.log('Server started on port 3333'));
