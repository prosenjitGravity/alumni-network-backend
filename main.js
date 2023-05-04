const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser=require('cookie-parser')
const cors=require('cors')
const PORT = 3000;

app.get("/", (req, res) => {
  console.log(req.url)
  res.send("Hello im express js");
});


const userRouters=require('./routes/userRouter');//   Router imports
const studentRouters=require('./routes/studentRoutes');
const alumniRouters=require('./routes/alumniRoutes');
const postRouters=require('./routes/postRoutes');
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors("*"));
app.use(cookieParser());

//Routes Middleware

app.use("/user",userRouters)
app.use("/student",studentRouters);
app.use('/alumni', alumniRouters);
app.use('/post',postRouters);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
    });
  })
  .catch((exception) => {
    console.error(exception);
  });
