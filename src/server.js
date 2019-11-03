const express = require("express");
const app = express();
const server = require("http").Server(app);

server.listen(2000);

console.log("[SERVER]: begun...");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html")
});

app.use(express.static(__dirname + "/client"));
