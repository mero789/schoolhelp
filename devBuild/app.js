const express = require("express");
const app = express();
const server = require("http").Server(app);
const sql = require("mysql");
const nodemailer = require('nodemailer');
const boards = [
  "hwdsb",
  "hwcdsb",
  "ndsb",
  "ncdsb"
];
const serverEmail = "cramoverflow@gmail.com",
  servermailPass = "Pricey_31";

//initilization code

const conn = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "schoolHelp"
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "cramoverflow@gmail.com",
    pass: "Pricey_31"
  }
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

function addAnswer(id) {
  let anum = 0;
  conn.query("SELECT * FROM posts WHERE id=" + conn.escape(id), function(err, result, fields) {
    anum = results[0].answer;
  });
  conn.query("UPDATE posts SET answer=" + conn.escape(anum) + " WHERE id=" + conn.escape(id), function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
}

function initUser(username, email) {
  let pfp = "profileplaceholder_" + (Math.floor(Math.random() * 7) + 1),
    desc = "This user likes to keep a sense of mystery in the air ...",
    boardsplit = email.split("@")[1],
    board = boardsplit.split(".")[0];
    pfp.replace("0", "");
    let bigBoard = boards.indexOf(board) > -1 ? board : "not in trusted board";
  conn.query("INSERT INTO profiles(username, pfp, descrip, board) VALUES("+ conn.escape(username) + ", "
  + conn.escape(pfp) + "," + conn.escape(desc) + ", " + conn.escape(board) + ")", function(err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

function sendVerifToUser (username, email, vid) {
  let link = "http://localhost:2000/verify?vid=" + vid;
  let mailOptions = {
    from: serverEmail,
    to: email,
    subject: 'Verify',
    text: "Hey stranger, CramOverflow dev here. Just want to confirm that you're not a robot. Please click this link if you just signed up and you're not a robot. Thanks :)" +link
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
    console.log('Email sent: ' + info.response);
    }
  });
}

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
      username = req.body.uid,
      vid = Math.floor(Math.random() * 999999) + 100000;
    console.log(email);
    conn.query("INSERT INTO users(email, username, password, vid) VALUES(" + conn.escape(email) + ", "
    + conn.escape(username) + ", "
    + conn.escape(psw) + "," + conn.escape(vid) + ")", function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(username);
      initUser(username, email);
      sendVerifToUser(username, email, vid);
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
        addAnswer(id);
      });
    }
});

app.post("/api/giveAnswers", function(req, res) {
  let id = req.body.id;

  conn.query("SELECT * FROM answers WHERE id = " + conn.escape(id), function(err, results, fields) {
    res.json(results);
  })
})

app.post("/api/profileget", function(req, res) {
  let name = req.body.id;
  conn.query("SELECT * FROM profiles WHERE username=" + conn.escape(name), function(err, results, fields) {
    res.json(results[0]);
  })
})

app.post("/api/verif", function(req, res) {
  let vid = req.body.vid;
  console.log(vid);
  conn.query("SELECT * FROM users WHERE vid=" + conn.escape(vid), function(err, results, fields) {
    console.log(results);
    if(typeof results == "undefined") {
      console.log("So");
    } else if(results[0].vid == vid) {
      res.send("Good to go");
    } else {
      res.send("Failed");
    }
  })
})

module.exports = server;
