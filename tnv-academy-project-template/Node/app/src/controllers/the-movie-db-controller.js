import * as http from 'http'


var numero = 10;

function getElementsFromArray(arr, numero) {
  var result = [];
  while (result.length < numero) {
    var rand = arr[Math.round(Math.random() * arr.length)];
    if (!result.some(an => an === rand)) {
      result.push(rand);
    }
  }
  return result;
}

export const getRandomMovies = async (req, res) => {

  const options = {
    hostname: 'api.themoviedb.org',
    path: '/3/movie/popular?api_key=94dac72dbc411b43b664a6cf6202f2a2',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let data = '';

  const request = http.request(options, (response) => {
    // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
    response.setEncoding('utf8');

    // As data starts streaming in, add each chunk to "data"
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
      var selection = getElementsFromArray(((JSON.parse(data)).results), numero);
      res.send(selection);
    });
  });

  // Log errors if any occur
  request.on('error', (error) => {
    console.error(error);
    res.sendStatus(error);
  });
  // End the request
  request.end();

}

export const getMovie = async (req, res) => {
  
const options = {
  hostname: 'api.themoviedb.org',
  path: '/3/movie/'+req.params.id+'?api_key=94dac72dbc411b43b664a6cf6202f2a2',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

  let data = '';

  const request = http.request(options, (response) => {
    // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
    response.setEncoding('utf8');

    // As data starts streaming in, add each chunk to "data"
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
      res.send(data);
    });
  });

  // Log errors if any occur
  request.on('error', (error) => {
    console.error(error);
    res.sendStatus(error);
  });
  // End the request
  request.end();

}









