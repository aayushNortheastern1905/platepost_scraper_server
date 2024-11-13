const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/scraperRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the `temp` folder
app.use("/temp", express.static(path.join(__dirname, "../temp")));

// Routes
app.use("/api/scrape", routes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

module.exports = app;
