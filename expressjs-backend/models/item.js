const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
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
  },
  { collection: "items_list" }
);

module.exports = ItemSchema;
