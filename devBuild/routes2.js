const express = require('express');
const api = express.Router();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html")
});

module.exports = api;
