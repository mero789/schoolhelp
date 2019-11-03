const express = require("express");
const app = express();
const server = require("http").Server(app);
const sql = require("mysql");
const conn = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "schoolHelp"
});

server.listen(2000);

console.log("[SERVER]: begun...");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html")
});

app.use(express.static(__dirname + "/client"));

//db stuff

conn.connect(function(err) {
  if(err) {
    console.log("-------[SERVER-DB]: {ERROR}: " + err + " --------");
    throw err;
  } else {
    console.log("[SERVER-DB]: Connected");
    set = true;
  }
});

conn.query("SELECT username FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result[0]);

    app.get("/send", function(req, res) {
      res.send(result[0].username);
    });
  });

conn.query("SELECT * FROM posts", function(err, result, fields) {
  if(err) throw err;

  app.get("/posts", function(req, res) {
    for(i=0; i < result.length; i++) {
      res.send(result[i]);
    }
  });
});
