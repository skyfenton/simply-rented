const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  rate: {
    type: Number,
    required: true,
    trim: true,
  },
  image: {
    type: Number,
    required: true,
    trim: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // available: {
  //   type: Boolean,
  //   required: true,
  //   trim: true,
  // },
  // rating: {
  //   type: Number,
  //   required: true,
  //   trim: true,
  // },
  // owner: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // renter: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
}, { collection: 'items_list' });

const Item = mongoose.model('Item', ItemSchema);

module.exports = ItemSchema;
