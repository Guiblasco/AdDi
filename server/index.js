const express = require("express");
const https = require("https");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
let app = express();
const PORT = 8888;
app.use(bodyParser.json());
const accessTokenSecret = "toro";


https
  .createServer(
    {
      key: fs.readFileSync("app_cert.key"),
      cert: fs.readFileSync("app_cert.crt"),
    },
    app
  )
  .listen(PORT, function () {
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
