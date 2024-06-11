require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const connectDB = require('./db/index.js');
const cors = require("cors");
const cookieParser = require("cookie-parser");

//routes import
const userRouter = require('./routes/user.routes.js');
const ApiError = require("./utils/ApiError.js");

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
  }));

  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));
  app.use(express.static("public"));
  app.use(cookieParser());

app.use("/api/v1/users", userRouter)
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors
             // ,stack:err.stack
        });
    } else {
        // Fallback for other types of errors
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
  });

connectDB()
.then(() => {
    app.listen(process.env.AUTH_PORT || 5000, () => {
        console.log(`🔐 Auth Server is running at port : ${process.env.AUTH_PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});

