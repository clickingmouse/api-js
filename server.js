const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();

app.set("view engine", "ejs");

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
  console.log("connected to mongodb");
});

// set up routes
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("server now listening for request on port 3000");
});
