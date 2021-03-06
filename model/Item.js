const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    name: {
    type: String,
    required: true
  },
  rentPrice: {
    type: String,
    required: true
  },
  manufactureDate: {
    type: Date,
    default: Date.now()
  },
  price : {
 
    type: String,       
    required: true }
});

module.exports = mongoose.model("item", ItemSchema);


