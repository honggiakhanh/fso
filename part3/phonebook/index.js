const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Person = require("./models/person");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

//get general info
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`<div>Phonebook contains ${persons.length} people</div>
    <div>${new Date()}</div>`);
  });
});
//get all person
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error()));
});
//get 1 person
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
//del 1 person
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});
//add 1 person
app.post("/api/persons", (request, response, next) => {
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
  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});
//edit person number
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const editedPerson = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, editedPerson, { runValidators: true, new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});
////error middleware
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
