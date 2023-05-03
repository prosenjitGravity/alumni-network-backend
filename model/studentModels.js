const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentTable = mongoose.Schema({
  first_name: {
    type: String,
    require: [true, "please provide the first name"],
    trim: true,
  },
  last_name: {
    type: String,
    require: [true, "please provide the last name"],
  },
  email: {
    type: String,
    rewuire: [true, "please provide the email address"],
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    require: [true, "please provide the phone number"],
    trim: true,
    unique: true,
  },
  course_type: {
    type: String,
    require: [true, "please provide the course type UG or PG"],
    trim: true,
  },
  department: {
    type: String,
    require: [true, "please provide the course department"],
    trim: true,
  },
  admission_year: {
    type: Number,
    require: [true, "please provide the admission year"],
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    require: [true, "please provide the password"],
    unique: true,
  },
});

// // Password Encryption
studentTable.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();  
  }
  // password Hashing
  const salt = await bcrypt.genSalt(13);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const Student = mongoose.model("student", studentTable);
module.exports = Student;
