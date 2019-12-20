const express = require("express");
const app = express();
const server = require("http").Server(app);
const sql = require("mysql");
const routes = require('routes.js');

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

app.get("/api/posts", function(req, res) {
  conn.query("SELECT * FROM posts ORDER BY id DESC", function(err, result, fields) {
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
    d = req.body.desc,
    u = req.body.user;
  if(req == undefined) {
    res.send("Error: no content added!");
  } else {
    console.log(u);
    conn.query("INSERT INTO posts(question, description, madeBy) VALUES(" + conn.escape(q) + ", " + conn.escape(d) + " , " + conn.escape(u) + ")", function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.sendFile(__dirname + "/client/");
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
    console.log(distArr);
  });
  /*conn.query("SELECT * FROM answers WHERE id=" + conn.escape(id), function(err, result, fields) {
    for(i=0; i < result.length; i++) {
      distArr.push(result[i]);
    }
  });*/
})


app.post("/api/log", function(req, res) {
  let type = req.body.type;
  if(type == 0) {
    let email = req.body.mail,
      psw = req.body.psw;
    conn.query("SELECT * FROM users WHERE email=" + conn.escape(email), function(err, result, fields) {
      if (err) throw err;
      if (result.length > 0) {
        console.log(result[0].password + " " + psw);
        if(result[0].password == psw) {
          res.send(result[0].username);
        }
      } else {
        res.send("ERROR");
        console.log(result[0])
      }
      });
  } else if(type == 1) {
    let email = req.body.mail,
      psw = req.body.psw,
      username = req.body.uid;
    console.log(email);
    conn.query("INSERT INTO users(email, username, password) VALUES(" + conn.escape(email) + ", "
    + conn.escape(username) + ", "
    + conn.escape(psw) + ")", function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(username);
    });
  }
});

app.post("/api/vote", function(req, res) {
  let id = req.body.id,
  type = req.body.voteType;
  conn.query("SELECT * FROM posts WHERE id=" + conn.escape(id.id), function(err, results, fields) {
    let dbob = results[0];
    //queries
    if(type == 0) {
      let voteNum = dbob.upvotes + 1;
      conn.query("UPDATE posts SET upvotes="+ voteNum + " WHERE id="+ conn.escape(parseInt(id.id)),
    function(err, result) {
      console.log("Vote added to db")
    });
  } else if(type == 1) {
    let vn = dbob.downvotes + 1;
    conn.query("UPDATE posts SET downvotes="+ vn + " WHERE id=" + conn.escape(parseInt(id.id)), function(err, result) {
      console.log("Downvote added to db")
      console.log(vn);
  });
}
});
})

app.post("/api/answer", function(req, res) {
  let id = req.body.id,
    a = req.body.atitle,
    d = req.body.desc,
    u = req.body.user;

    if(req == undefined) {
      res.send("Error: no content added!");
    } else {
      console.log("User: " + u);
      conn.query("INSERT INTO answers(title, description, madeBy, id) VALUES(" + conn.escape(a) + ", " + conn.escape(d) + " , " + conn.escape(u) + " , " + conn.escape(id) + ")",
      function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    }
})
