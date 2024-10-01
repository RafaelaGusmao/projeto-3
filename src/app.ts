import { server } from './server';

const port: number = 3333;

server.listen(port, () => {
    console.log('endereço do servidor: https://localhost:${port}');
});
