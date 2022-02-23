const mongoose = require('mongoose');
const UserModel = require('./user');
const dotenv = require("dotenv");

dotenv.config();


val = 7


var uri = "mongodb://ZachLofquist:kutpu1-jovbab-nucwIq@Cluster0-shard-00-00.z7xan.mongodb.net:27017,cluster0-shard-00-01.z7xan.mongodb.net:27017,cluster0-shard-00-02.z7xan.mongodb.net:27017/users?ssl=true&replicaSet=atlas-141dkl-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri).catch((error) => console.log(error));

async function findUserByName(firstName) {
  return UserModel.find({ firstName });
}

async function findUserByEmail(email) {   
  return UserModel.find({ email });
}

async function getUsers(email) {      // Look at example of job and name to check for both so can get users by any field
  let result;
  if (email === undefined) {
    result = await UserModel.find();
  } else if (email) {
    result = await findUserByName(email);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await UserModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new UserModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByIDAndDelete(id) {
  try {
    return UserModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.findUserByIDAndDelete = findUserByIDAndDelete;
exports.findUserByName = findUserByName;
exports.addUser = addUser;
