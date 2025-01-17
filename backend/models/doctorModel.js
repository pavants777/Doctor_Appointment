const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  line1: { type: String, required: true },
  line2: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false }
});


const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
    min: 0,
  },
  about: {
    type: String,
    required: true,
    trim: true,
  },
  fees: {
    type: Number,
    required: true,
    min: 0,
  },
  address: { type: addressSchema, required: false },
  date: {
    type: Date,
    default: Date.now,
  },
  available : {
    type : Boolean,
    required : false,
    default  : false,
  },
  slots_booked: {
    type: Map,
    of: [String], 
    default: {},
  },
});

module.exports = mongoose.model("doctor", doctorSchema);
