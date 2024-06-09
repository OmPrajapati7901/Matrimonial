const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

console.log("process.env.CORS_ORIGIN",process.env.CORS_ORIGIN)
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
const userRouter = require('./routes/user.routes.js');
const userprofileRouter = require('./routes/userProfile.routes.js');




app.use("/api/v1/users", userRouter)
app.use("/api/v1/userprofile", userprofileRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
module.exports = { app };