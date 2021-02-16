const http = require('http');
const htmlHandler = require('./htmlResponses');
const jsonHandler = require('./jsonResponses');

const url = require('url');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/random-joke' : jsonHandler.getRandomJokeResponse,
  notFound : htmlHandler.get404Response,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);