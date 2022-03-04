const mongoose = require("mongoose");
const uri =
  "mongodb://ZachLofquist:kutpu1-jovbab-nucwIq@cluster0-shard-00-00.z7xan.mongodb.net:27017,cluster0-shard-00-01.z7xan.mongodb.net:27017,cluster0-shard-00-02.z7xan.mongodb.net:27017/items?ssl=true&replicaSet=atlas-141dkl-shard-0&authSource=admin&retryWrites=true&w=majority";
const conn = mongoose.createConnection(uri);

const ItemModel = conn.model("ItemModel", require("./item"));

async function editItem(oldL, newL) {
  try {
    const old = new ItemModel(oldL);
    old.itemName = newL.itemName;
    old.itemRate = newL.itemRate;
    old.itemDescription = newL.itemDescription;
    old.availability = newL.availability;
    // items above should be the only ones available to be edited
    // by user
    old.rating = newL.rating;
    old.owner = newL.owner;
    old.renter = newL.renter;
    const saveditem = await old.save();
    return saveditem;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addItem(item) {
  try {
    const itemToAdd = new ItemModel(item);
    const saveditem = await itemToAdd.save();
    return saveditem;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findItemByName(item) {
  const result = await ItemModel.find({ itemName: item });
  return result;
}

async function findItemsByOwner(email) {
  const result = await ItemModel.find({ owner: email });
  return result;
}

async function findItemByIDAndDelete(id) {
  try {
    return await ItemModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getItems(itemName) {
  let result;
  if (itemName === undefined) {
    result = await ItemModel.find();
  } else if (itemName) {
    result = await findItemByName(itemName);
  }
  return result;
}

async function findItemById(id) {
  try {
    return await ItemModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.editItem = editItem;
exports.getItems = getItems;
exports.findItemById = findItemById;
exports.finditemByIDAndDelete = findItemByIDAndDelete;
exports.findItemByName = findItemByName;
exports.addItem = addItem;
exports.findItemsByOwner = findItemsByOwner;
