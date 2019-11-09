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

app.use(express.static(__dirname + "/client", {
  extensions: ['html', 'htm']
}));
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

    app.get("/api/send", function(req, res) {
      res.send(result[0].username);
    });
  });
app.get("/api/posts", function(req, res) {
  conn.query("SELECT * FROM posts", function(err, result, fields) {
    if(err) throw err;
    let distArr = [];
    for(i=0; i < result.length; i++) {
      distArr.push(result[i]);
    }
    res.json(distArr);
  });
});


app.post("/api/question", function(req, res) {
  let q = req.body.question,
    d = req.body.desc;
  if(req == undefined) {
    res.send("Error: no content added!");
  } else {
    conn.query("INSERT INTO posts(question, description, madeBy) VALUES(" + conn.escape(q) + ", " + conn.escape(d) + " , 'ameer hamoodi')", function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.sendFile(__dirname + "/client/index.html");
    });
  }
});
app.post("/api/page", function(req, res) {
  let id = req.body.id;
  console.log(id);
  let distArr = [];
  conn.query("SELECT * FROM posts WHERE id=" + conn.escape(id), function(err, result, fields) {
    for(i=0; i < result.length; i++) {
      distArr.push(result[i]);
    }
    res.json(distArr);
  });
})
