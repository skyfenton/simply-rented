const express = require("express"); // import express
const cors = require("cors");
const bcrypt = require("bcrypt");

const userServices = require("./models/user-services");
const itemServices = require("./models/item-services");

const app = express();
require("dotenv").config();
const port = process.env.PORT ?? 5000;

app.use(express.json()); // process in json format
app.use(cors());

app.listen(port, () => {
  console.log(`REST API is listening at http://localhost:${port}`);
});

// setup get API endpoint to match url pattern '/' (root) and two json objects:
// req for incoming, res for outgoing response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const user = await userServices.getUsers(req.body.email);
  if (user === undefined || user === null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user[0].password)) {
      return res.sendStatus(200);
    } else {
      return res.status(400).end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

app.get("/users/:email", async (req, res) => {
  const email = req.params;
  try {
    const result = await userServices.findUserByEmail(email.email);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/users", async (req, res) => {
  const name = req.query.firstName;
  try {
    const result = await userServices.getUsers(name);
    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server");
  }
});

app.get("/items", async (req, res) => {
  const name = req.query.itemName;
  try {
    const result = await itemServices.getItems(name);
    res.send({ items_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/items/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await itemServices.findItemById(id);
    res.send({ items_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.post("/delete", async (req, res) => {
  const userToDeleteEmail = req.body.email;
  const check = await userServices.checkUserByEmail(userToDeleteEmail);
  if (check) {
    res.status(200).send("user does not exists");
  } else {
    const userToDelete = await userServices.findUserByEmail(userToDeleteEmail);
    const deletedUser = await userServices.findUserByIDAndDelete(
      userToDelete[0].id
    );
    if (deletedUser) {
      res.status(201).send(deletedUser);
    } else res.status(400).end();
  }
});

app.post("/deleteItem", async (req, res) => {
  console.log("BACKEND");
  const userEmail = req.body.email;
  const itemName = req.body.item;
  console.log(itemName);
  const check = await userServices.checkUserByEmail(userEmail);
  const check2 = await itemServices.checkItem(itemName);
  if (check && check2) {
    res.status(200).send("user or item does not exists");
  } else {
    console.log(userEmail);
    console.log(itemName);
    console.log(req.body);
    const itemToDelete = await itemServices.findItemByName(itemName);
    console.log(itemToDelete);
    const deletedItem = await itemServices.findItemByIDAndDelete(
      itemToDelete[0].id
    );
    if (deletedItem) {
      res.status(201).send(deletedItem);
    } else res.status(400).end();
  }
});

app.get("/searchItems", async (req, res) => {
  const query = {
    itemName: req.query["query"],
  };
  if (query.itemName === "undefined") {
    const result = await itemServices.getItems();
    res.send({ result });
  } else {
    try {
      const result = await itemServices.findItemByName(query.itemName);
      res.send({ result });
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    }
  }
});

app.post("/signup", async (req, res) => {
  const userToAdd = req.body;
  const check = await userServices.checkUserByEmail(userToAdd.email);
  if (check) {
    res.status(200).send("email exists");
  } else {
    const savedUser = await userServices.addUser(userToAdd);
    if (savedUser) {
      res.status(201).send(savedUser);
    } else res.status(400).end();
  }
});

app.post("/create-listing", (req, res) => {
  const itemToAdd = req.body;
  const savedItem = itemServices.addItem(itemToAdd);
  if (savedItem) res.status(201).send(savedItem);
  else res.status(500).end();
});

app.post("/listings", async (req, res) => {
  const userEmail = req.body;
  try {
    const result = await itemServices.findItemsByOwner(userEmail.email);
    res.send({ result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

app.post("/rentals", async (req, res) => {
  const userEmail = req.body;
  try {
    const result = await itemServices.findItemsByRenter(userEmail.email);
    res.send({ result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

app.post("/updateItemById", async (req, res) => {
  const userEmail = req.body;
  try {
    const result = await itemServices.updateItemById(
      { _id: userEmail.itemId },
      {
        itemName: userEmail.itemName,
        itemRate: userEmail.itemRate,
        itemDescription: userEmail.itemDescription,
        availability: userEmail.availability,
        rating: userEmail.rating,
        owner: userEmail.owner,
        renter: userEmail.renter,
        image: userEmail.image,
      }
    );
    res.send({ result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});
