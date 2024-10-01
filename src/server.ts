import express from 'express';
import cors from 'cors';
import { router } from './routes';

//criando o servidor express
const server = express();
//configurando o servidor para aceitar requisições de outros dominios
server.use(cors());
//configura o servidor para ceitar requisições no formato JSON
server.use(express.json());

//configurando as rotas no servidor
server.use(router);

//exportar o servidor
export { server };