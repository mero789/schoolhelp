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
app.use(express.json());

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
    let distArr = [];
    for(i=0; i < result.length; i++) {
      distArr.push(result[i]);
    }
    res.json(distArr);
  });
});

app.post("/question", function(req, res) {
  let q = req.body.question,
    d = req.body.desc;
  conn.query("INSERT INTO posts(question, description, madeBy) VALUES(" + conn.escape(q) + ", " + conn.escape(d) + " , 'ameer hamoodi')", function(err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.sendFile(__dirname + "/client/index.html");
  });
});
