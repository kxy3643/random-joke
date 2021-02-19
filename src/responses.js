const _ = require('underscore');

const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me.' },
  { q: 'Can February March?', a: 'No, but April May' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
  { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire.' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved.' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite' },
];

const getRandomJokes = (_limit = 1, type) => {
  let limit = 1;
  limit = Number(_limit);
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  if (limit > jokes.length) {
    limit = jokes.length;
  }

  const shuffledJokes = _.shuffle(jokes);

  if (type === 'xml') {
    if (limit === 1) {
      const responseXML = `<?xml version="1.0" ?>
        <joke>
          <q>${shuffledJokes[0].q}</q>
          <a>${shuffledJokes[0].a}</a>
        </joke>`;

      return responseXML;
    }
    let responseXML = `<?xml version="1.0" ?>
        <jokes>
      `;

    for (let i = 0; i < limit; i += 1) {
      responseXML += `<joke>
          <q>${shuffledJokes[i].q}</q>
          <a>${shuffledJokes[i].a}</a>
        </joke>`;
    }

    responseXML += `</jokes>
      `;

    return responseXML;
  }
  const responseArray = [];

  for (let i = 0; i < limit; i += 1) {
    responseArray.push(shuffledJokes[i]);
  }

  return JSON.stringify(responseArray);
};

const getRandomJokeResponse = (request, response, params, acceptedTypes, httpMethod) => {
  // Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
  // Refactored to an arrow function by ACJ
  const getBinarySize = string => Buffer.byteLength(string, 'utf8');

  if (acceptedTypes.includes('text/xml')) {
    if(httpMethod === 'GET'){
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getRandomJokes(params.limit, 'xml'));
    }
    else{
      response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length' : getBinarySize(getRandomJokes(params.limit, 'xml')) });
    }
  } else {
    if(httpMethod === 'GET'){
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(getRandomJokes(params.limit, 'json'));
    }
    else{
      response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length' : getBinarySize(getRandomJokes(params.limit, 'json')) });
    }
    
  }
  response.end();
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
