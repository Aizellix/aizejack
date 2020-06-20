import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import next from 'next';
import path from 'path';
import { setupRoutes } from '../server/src/config';

const server = express();
server.use(compression());

server.get('/favicon.ico', (req, res) => {
  const STATIC_DIR = path.join(__dirname, 'public');
  return res.status(200).sendFile(`${STATIC_DIR}/favicon.ico`);
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

setupRoutes(server);

const port = parseInt(process.env.CLIENT_PORT, 10) || 3000;
const dev = JSON.parse(process.env.ISDEVMODE);
const app = next({ dev });

app.prepare().then(() => {
  // next server
  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready client on ${port} : ${process.env.DMPENV}`);
  });
});
