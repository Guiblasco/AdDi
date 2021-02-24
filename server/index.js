const express = require("express");
const https = require("https");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
let app = express();
const PORT = 8888;
const User = require("./models/user");

app.use(bodyParser.json());
const accessTokenSecret = "toro";



https.createServer({
      key: fs.readFileSync("my_cert.key"),
      cert: fs.readFileSync("my_cert.crt"),
    },app).listen(PORT, function (){
    console.log("Servidor HTTPS escoltant al port" + PORT + "...");
  });

  const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split("")[1];
      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };



app.post('/register',(req,res)=>{
  var usuario = new User.User
  usuario.insertUser(
    req.body.username,
    req.body.password,
    req.body.full_name,
    req.body.dni,
    req.body.avatar,
    res,req)
})


app.post("/login",(req,res)=>{
  var usuario = new User.User
  usuario.login(
    req.body.username,
    req.body.password,
    req,res
  )
})

/*app.post("/login", (req, res) => {
  var user = new User.User();
  user.login(req.body.username, req.body.password, (resposta) => {
    if (resposta) {
      let autToken = jwt.sign(
        {
          username: req.body.username,
        },
        accessTokenSecret
      );
      res.status(200).json({ autToken });
    } else {
      res
        .status(400)
        .send({ ok: false, msg: "El usuario o password es incorrecto" });
    }
  });
});*/
