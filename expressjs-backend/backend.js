const express = require('express'); //import express
const cors = require('cors');
const app = express(); //make express instance
const port = 5000; //constant to listen on port 5000

app.use(express.json()); //process in json format
app.use(cors());

// setup get API endpoint to match url pattern '/' (root) and two json objects:
// req for incoming, res for outgoing response
app.get('/', (req, res) => { 
  res.send('Hello World!');
});

app.post('/login', (req, res) => {
  if(req.query){
    res.send({
      token: 'test123'
    });
  }else{
    res.status(400).end();
  }
})

// make app listen to requests at port number
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});