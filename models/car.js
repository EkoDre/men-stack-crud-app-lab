// schema

import mongoose from "mongoose"; // imported from mongoose

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },         // e.g. Toyota
  model: { type: String, required: true },        // e.g. Corolla
  year: { type: Number, required: true },         // e.g. 2020
  color: String,                                  // e.g. Red
  horsepower: {type: Number},
});

const Car = mongoose.model('Car', carSchema);

export default Car;

