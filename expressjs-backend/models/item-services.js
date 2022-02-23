const mongoose = require('mongoose');

var uri = "mongodb://ZachLofquist:kutpu1-jovbab-nucwIq@cluster0-shard-00-00.z7xan.mongodb.net:27017,cluster0-shard-00-01.z7xan.mongodb.net:27017,cluster0-shard-00-02.z7xan.mongodb.net:27017/items?ssl=true&replicaSet=atlas-141dkl-shard-0&authSource=admin&retryWrites=true&w=majority";
const conn = mongoose.createConnection(uri);

//const ItemModel = require('./item');

conn.model('ItemModel', require('./item'));



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
  return ItemModel.find({ item });
}

async function findItemByIDAndDelete(id) {
  try {
    return await ItemModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getItems(item) {
  let result;
  if (item === undefined) {
    result = await ItemModel.find();
  } else if (item) {
    result = await findItemByName(item);
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

exports.getItems = getItems;
exports.findItemById = findItemById;
exports.finditemByIDAndDelete = findItemByIDAndDelete;
exports.findItemByName = findItemByName;
exports.addItem = addItem;
