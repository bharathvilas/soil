const mongoose = require("mongoose");

const login = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
  },
})

const Login = mongoose.model("user",login);

module.exports = Login;