const { query } = require('express');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
  res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req, res) => {
  res.send(`We don't serve that here. Never call again!`);
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
      Route: ${req.route}
    `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if (!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if (!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response
  res.send(greeting);
});

app.get('/sum', (req, res) => {
  let { a, b } = req.query;

  if (!a) {
    res.send('Insert the value of a');
  } else {
    a = Number(a);
    if (isNaN(a) === true) {
      res.send(`'a' should be a number`);
    }
  }

  if (!b) {
    res.send('Insert the value of b');
  } else {
    b = Number(b);
    if (isNaN(b) === true) {
      res.send(`'b' should be a number`);
    }
  }

  res.send(`The sum of ${a} and ${b} is ${a + b}`);
});

app.get('/cipher', (req, res) => {
  let { text, shift } = req.query;
  let cipher = '';
  if (!text) {
    res.send('Insert the value of text');
  }
  if (!shift) {
    res.send('Insert the value of shift');
  }
  if (isNaN(shift) === true) {
    res.send('Shift should be a number');
  }
  text = text.toUpperCase();
  shift = Number(shift);
  for (i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) < 65 || text.charCodeAt(i) > 90) {
      res.send('Text should only contains letters');
    }
    console.log((text.charCodeAt(i) + shift - 65) % 26);
    cipher += String.fromCharCode(
      ((text.charCodeAt(i) + shift - 65) % 26) + 65
    );
  }
  res.send(cipher);
});

app.get('/lotto', (req, res) => {
  const { numbers } = req.query;
  let lotto = [];
  let match = 0;
  if (!numbers) {
    res.send('You should insert numbers');
  }
  if (numbers.length < 6) {
    res.send('You should insert 6 numbers');
  }
  for (i = 0; i < 6; i++) {
    lotto.push(Math.ceil(Math.random() * Math.floor(20)));
  }
  numbers.forEach((number) => {
    number = Number(number);
    if (isNaN(number) === true) {
      res.send('Each numbers value should be of number type');
    }
    if (number < 1 || number > 20) {
      res.send('Number should be between 1 and 20');
    }
    if (lotto.includes(number)) match++;
  });
  if (match < 4) {
    res.send('Sorry, you lose');
  } else if (match === 4) {
    res.send('Congratulations, you win a free ticket');
  } else if (match === 5) {
    res.send('Congratulations! You win $100!');
  } else {
    res.send('Wow! Unbelievable! You could have won the mega millions!');
  }
});
app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});
