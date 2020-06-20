import fs from 'fs';
import express from 'express';
import path from 'path';
import basicauth from '../utility/basicauth';
export default app => {
  const APP_DIR = path.join(__dirname, '..', 'app');
  const features = fs
    .readdirSync(APP_DIR)
    .filter(file => fs.statSync(`${APP_DIR}/${file}`).isDirectory())
    .filter(file => file !== 'common' && file !== 'libs' && file !== 'helpers');
  features.forEach(feature => {
    const router = express.Router();
    const routes = require(`${APP_DIR}/${feature}/routes.js`);
    routes.setup(router);
    app.use(`${process.env.PROXY_PATH}/${feature}`, basicauth, router);
  });
};
