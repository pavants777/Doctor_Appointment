const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DB;

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database Connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Database Connection Error:', err);
    });

    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
