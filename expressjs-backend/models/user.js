const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    listings: {
      type: Map,
      of: String,
      default: {},
    },
    rentals: {
      type: Map,
      of: String,
      default: {},
    },
    // zip_code: {
    //   type: Number,
    //   required: true,
    //   trim: true,
    // },
    /*listings: {
      type: Object,
      required: true,
      trim: true,
    },
    rentals: {
      type: Object,
      required: true,
      trim: true,*/
  },
  { collection: "users_list" }
);

module.exports = UserSchema;
//const User = mongoose.model("User", UserSchema);

//module.exports = User;
