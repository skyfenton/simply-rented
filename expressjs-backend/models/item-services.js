const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.CONNECTION;
const conn = mongoose.createConnection(uri);

const ItemModel = conn.model("ItemModel", require("./item"));

async function addItem(item) {
  try {
    const itemToAdd = new ItemModel(item);
    const savedItem = await itemToAdd.save();
    return savedItem;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function checkItem(item) {
  return (await ItemModel.find({ item }).count()) > 0;
}

async function parseItems(items, title) {
  const parsed = [];
  const lowered = title.toLowerCase();
  for (let step = 0; step < items.length; step += 1) {
    const loweredTitle = items[step].itemName.toLowerCase();
    if (loweredTitle.includes(lowered) === true) {
      parsed.push(items[step]);
    }
  }
  return parsed;
}

async function findItemByName(title) {
  const items = await ItemModel.find();
  const response = await parseItems(items, title);
  return response;
}

async function findItemsByOwner(email) {
  const result = await ItemModel.find({ owner: email });
  return result;
}

async function findItemsByRenter(email) {
  const result = await ItemModel.find({ renter: email });
  return result;
}

async function findItemByIDAndDelete(id) {
  return ItemModel.findByIdAndDelete(id);
}

async function getItems(itemName) {
  let result;
  if (itemName === undefined) {
    result = await ItemModel.find();
  } else {
    result = await findItemByName(itemName);
  }
  return result;
}

async function findItemById(id) {
  return ItemModel.findById(id);
}

async function updateItemById(filter, update) {
  const updatedItem = await ItemModel.findOneAndUpdate(filter, update);
  return updatedItem;
}

exports.getItems = getItems;
exports.findItemById = findItemById;
exports.findItemByIDAndDelete = findItemByIDAndDelete;
exports.findItemByName = findItemByName;
exports.addItem = addItem;
exports.findItemsByOwner = findItemsByOwner;
exports.checkItem = checkItem;
exports.findItemsByRenter = findItemsByRenter;
exports.updateItemById = updateItemById;
exports.parseItems = parseItems;
