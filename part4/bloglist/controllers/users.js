const usersRouter = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (body.username && body.password) {
    if (body.username.length <= 3 || body.password.length <= 3) {
      return response.status(400).send(
        "Username or password must be at least 3 characters"
      );
    }
  } else {
    return response.send("Both username and password must be given");
  }
  
  const passwordHash = await bcrypt.hash(body.password, 10);
  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  newUser
    .save()
    .then((savedUser) => response.json(savedUser))
    .catch((err) => next(err));
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users);
});

module.exports = usersRouter;
