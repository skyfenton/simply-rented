const express = require("express"); // import express
const cors = require("cors");

const app = express(); // make express instance
const port = 5000; // constant to listen on port 5000

app.use(express.json()); // process in json format
app.use(cors());

// temporary hard-coded values for user login attempts, will link to db when set up
const users = {
  users_list: [
    {
      email: "jxmurill@calpoly.edu",
      password: "test0",
    },
    {
      email: "test1@test.com",
      password: "tester1",
    },
    {
      email: "test2@test.com",
      password: "tester2",
    },
    {
      email: "test3@test.com",
      password: "test3",
    },
    {
      email: "simplyrented@gmail.com",
      password: "test4",
    },
  ],
};

// For sending users to database
// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/simply-rented");

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// var nameSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   username: String,
//   password: String
//  });

// var User = mongoose.model("User", nameSchema);

// app.post("/addedUser", (req, res) => {
//   var myData = new User(req.body);
//  myData.save()
//  .then(item => {
//  res.send("item saved to database");
//  })
//  .catch(err => {
//  res.status(400).send("unable to save to database");
//  });
// });

// setup get API endpoint to match url pattern '/' (root) and two json objects:
// req for incoming, res for outgoing response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

function findUserByEmailAndPw(email, password) {
  return users.users_list.filter(
    (user) => user.email === email && user.password === password
  );
}

// Verify login info with backend (right now just sends 200 if fields exist)
app.post("/login", (req, res) => {
  const { body } = req;
  if (body.email && body.password) {
    const result = findUserByEmailAndPw(body.email, body.password);
    if (result === undefined || result.length === 0) res.status(400).end();
    else res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.get("/users", (req, res) => {
  res.send(users);
});

function addUser(user) {
  users.users_list.push(user);
}

app.post("/signup", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

// make app listen to requests at port number
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
