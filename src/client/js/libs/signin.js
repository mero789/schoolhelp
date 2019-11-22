exports.sendSign = (email, username, password) => {
  let request = new XMLHttpRequest(),
    url = "/api/log";
  console.log("[CLIENT]: sending...");
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify({mail: email, uid: username, psw: password, type: 1}));
  request.onload = () => {
    document.cookie = "username=" + request.response;
    location.href = "/"
  }
}

exports.sendLog = (email, password) => {
  let request = new XMLHttpRequest(),
    url = "/api/log";
  console.log("[CLIENT]: sending...");
  console.log(password);
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(JSON.stringify({mail: email, psw: password, type: 0}));
  request.onload = () => {
    console.log("[CLIENT]: recieved");
    if(request.response == "ERROR") {
      alert("ERROR");
    } else {
      document.cookie = "username=" + request.response;
      location.href = "/"
    }
  }
}
