const express = require("express"); //import express
const cors = require("cors");
const app = express(); //make express instance
const port = 5000; //constant to listen on port 5000

app.use(express.json()); //process in json format
app.use(cors());

// temportary hard-coded values for user login attempts, will link to db when set up
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

// setup get API endpoint to match url pattern '/' (root) and two json objects:
// req for incoming, res for outgoing response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Verify login info with backend (right now just sends 200 if fields exist)
app.post("/login", (req, res) => {
  let body = req.body;
  if (body.email && body.password) {
    let result = findUserByEmailAndPw(body.email, body.password);
    if (result === undefined || result.length == 0) res.status(400).end();
    else res.status(200).end();
  } else {
    res.status(400).end();
  }
});

function findUserByEmailAndPw(email, password) {
  return users["users_list"].filter(
    (user) => user["email"] === email && user["password"] === password
  );
}

// make app listen to requests at port number
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
