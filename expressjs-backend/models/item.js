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

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
