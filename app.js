const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const books = require('./routes/api/books');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
connectDB();

mongoose
  .connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use('/api/books', books);
app.use(express.static("build"));

const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));