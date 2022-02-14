const mongoose = require('mongoose');
const UserModel = require('./user');

mongoose.connect(
  'mongodb://localhost:27017/users',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
).catch((error) => console.log(error));

async function findUserByName(firstName) {
  return UserModel.find({ firstName });
}

async function getUsers(firstName) {
  let result;
  if (firstName === undefined) {
    result = await UserModel.find();
  } else if (firstName) {
    result = await findUserByName(firstName);
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
