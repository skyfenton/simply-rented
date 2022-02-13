const express = require('express'); //import express
const cors = require('cors');
const app = express(); //make express instance
const port = 5000; //constant to listen on port 5000

const users = { 
	users_list :
	[]
}

app.use(express.json()); //process in json format
app.use(cors());

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
app.get('/', (req, res) => { 
  res.send('Hello World!');
});

// Verify login info with backend (right now just sends 200 if fields exist)
app.post('/login', (req, res) => {
  let body = req.body;
  if(body.email && body.password){
    res.end();
  }else{
    res.status(400).end();
  }
})

app.get('/users', (req, res) => {
	 res.send(users);
});

app.post('/signup', (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

function addUser(user){
  users['users_list'].push(user);
}

// make app listen to requests at port number
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});