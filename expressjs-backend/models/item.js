/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    itemRate: {
      type: Number,
      required: true,
      trim: true,
    },
    itemDescription: {
      type: String,
      required: true,
      trim: true,
    },
    availability: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    renter: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "items_list" }
);

module.exports = ItemSchema;
