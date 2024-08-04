const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection string
const uri = process.env.MONGO_URI;

// User model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

// Connect to MongoDB and count users
const countUsers = async () => {
  try {
    await mongoose.connect(uri);
    const userCount = await User.countDocuments();
    console.log(`Number of registered users: ${userCount}`);
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

countUsers();
