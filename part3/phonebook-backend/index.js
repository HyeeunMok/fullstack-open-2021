require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('jsonBody', (req, res) => JSON.stringify(req.body));

const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    tokens['jsonBody'](req, res),
  ].join(' ');
});

app.use(logger);

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  Person.find({}).then(results => {
    response.send(
      `<p>Phonebook has info for ${
        results.length
      } people</p> <p>${new Date()}</p>`
    );
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    person ? response.json(person) : response.status(404).end();
  });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const randomId = Math.floor(Math.random() * 100000000 + 1);
  return randomId;
};

const isNameExist = name => {
  if (persons.find(person => person.name === name)) {
    return true;
  } else {
    return false;
  }
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    });
  }
  // if (isNameExist(body.name)) {
  //   return response.status(400).json({
  //     error: 'name must be unique',
  //   });
  // }
  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  });
  person.save().then(savedPerson => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
