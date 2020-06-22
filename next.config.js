module.exports = {
  sassLoaderOptions: {
    sourceMap: true
  },
  postcssLoaderOptions: {
    sourceMap: true
  },
  publicRuntimeConfig: {
    DMPENV: process.env.DMPENV,
    ISDEVMODE: process.env.ISDEVMODE,
    baseUrl: process.env.BASE_URL,
    title: process.env.TITLE_PROJECT,
    baseApiUrl: `${process.env.BASE_URL}${process.env.PROXY_PATH}`,
    baseAuth: {
      username: process.env.AUTH_USER,
      password: process.env.AUTH_PASSWORD
    }
  }
};
