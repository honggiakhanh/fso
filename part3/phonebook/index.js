const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
//get all person
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
//get general info
app.get("/info", (request, response) => {
  const total = persons.length;
  response.send(
    `<div>Phonebook contains ${total} people</div>
    <div>${new Date()}</div>`
  );
});
//get 1 person
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  person ? response.json(person) : response.status(404).end();
});
//del 1 person
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});
//add 1 person
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  //check name
  if (!body.name) {
    console.log("name missing");
    return response.status(400).json({
      error: "name missing",
    });
  }
  //check number
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  //add person
  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });
  console.log(newPerson);
  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});
////
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
