import auth from 'basic-auth';
import compare from 'tsscmp';

const validate = (name, pass) => {
  var valid = true;
  valid = compare(name, process.env.AUTH_USER) && valid;
  valid = compare(pass, process.env.AUTH_PASSWORD) && valid;
  return valid;
};

const basicauth = (req, res, next) => {
  let credentials = auth(req);
  if (!credentials || !validate(credentials.name, credentials.pass)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.end('Access denied');
  } else {
    next();
  }
};

export default basicauth;
