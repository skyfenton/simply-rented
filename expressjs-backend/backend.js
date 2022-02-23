const express = require('express'); //import express
const app = express(); //make express instance
const port = 5000; //constant to listen on port 5000

app.use(express.json()); //process in json format

// setup get API endpoint to match url pattern '/' (root) and two json objects:
// req for incoming, res for outgoing response
app.get('/', (req, res) => { 
  res.send('Hello World!');
});

// make app listen to requests at port number
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

val = 7