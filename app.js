const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// routes
const books = require("./routes/api/books");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// API Routes
app.use("/api/books", books);

// Frontend build Route
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));