const genKey = length => {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const genEncryptKey = () => {
  return genKey(16);
};

const genEncryptKeyName = () => {
  return '_' + genKey(2);
};

export { genKey, genEncryptKey, genEncryptKeyName };
