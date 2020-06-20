import fs from 'fs';
import dotenv from 'dotenv';
import { genEncryptKey, genEncryptKeyName } from './keyGen';

const defaultenv = () => {
  let path = `.env`.trim();
  if (fs.existsSync(path)) {
    let envConfig = dotenv.parse(fs.readFileSync(path));
    for (var k in envConfig) {
      process.env[k] = envConfig[k];
    }
  }
};

const loaddotenv = () => {
  if (process.env.DMPENV) {
    let path = `.env.${process.env.DMPENV}`.trim();
    if (fs.existsSync(path)) {
      let envConfig = dotenv.parse(fs.readFileSync(path));
      for (var k in envConfig) {
        process.env[k] = envConfig[k];
      }
    } else {
      defaultenv();
    }
  } else {
    defaultenv();
  }

  // encrypt req/res
  process.env['DATA_ENCRYPT_KEY'] = genEncryptKey();
  process.env['DATA_ENCRYPT_KEY_NAME'] = genEncryptKeyName();
};

export { loaddotenv };
