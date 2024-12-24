const express = require("express");
const mongoose = require("mongoose");
const Login = require("./schema");
const post = require("./schema/post");
const app = express();
app.use(express.json());
require("dotenv").config();
require("body-parser");
require("cors");

const db_uri = process.env.DATABASE_URL;

mongoose.connect(db_uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})  .then(() => {
  console.log("connection successfull");
})
.catch((err) => {
  console.log("error in connection",err);
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Fill all fields",
      });
    }

    const user = await Login.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/add-product", async (req, res) => {
  try {
    const { name, age, address, productname, productimage, detailsaboutproduct, priceofproduct } = req.body;

    if (!name || !age || !address || !productname || !detailsaboutproduct || !priceofproduct) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    const newProduct = {
      name,
      age,
      address,
      productname,
      productimage,
      detailsaboutproduct,
      priceofproduct,
    };

    await post.insertMany(newProduct);
    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const response = await Login.find();
    console.log("data:", response);

    if (response && response.length > 0) {
      res.json(response);
    } else {
      res.json("no data found");
    }
  } catch (err) {
    res.status(404).json("some error has occured");
  }
});

app.listen(5050,()=>{
  console.log("listening...");
})