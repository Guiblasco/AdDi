const express = require("express");
const https = require("https");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
let app = express();
const PORT = 8888;
const User = require("./models/user");
const { notStrictEqual } = require("assert");
const Notes = require("./models/notes");
const Assignatures = require("./models/assignatures");
const Moduls = require("./models/moduls");


app.use(bodyParser.json());
const accessTokenSecret = "toro";

https.createServer({
      key: fs.readFileSync("my_cert.key"),
      cert: fs.readFileSync("my_cert.crt"),
    },app).listen(PORT, function () {
    console.log("Servidor HTTPS escoltant al port" + PORT + "...");
  });
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
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
app.post("/register", (req, res) => {
  var usuario = new User.User();
  if(!req.body.username || !req.body.password || !req.body.full_name || !req.body.dni){
    res.status(400).send({
      OK:false,
      error:"Variables mal definides"
    })
  }else{
    let { username,password,full_name,dni,avatar } = req.body;  
    usuario.insertUser(username,password,full_name,dni,avatar,res,req);
  }
});
app.post("/login", (req, res) => {
  var usuario = new User.User();

  if(!req.user.username || !req.user.password ){
    res.status(400).send({
      OK:false,
      error:"Variables mal definides"
    }) 
  }else {
    let {username,password} = req.body
    usuario.login(username ,password, req, res);
  }
  
});
app.get("/notes", authenticateJWT, (req, res) => {
  var notes = new Notes.Notes();
  let id = req.user.id;
  let role = req.user.role
  notes.getNotes(id,role,res);
});
app.get("/notes/:idAss", authenticateJWT, (req, res) => {
  var nota = new Notes.Notes();
  let idAssi = req.params.idAss;
  let idAlu = req.user.id;
  let role = req.user.role
  nota.getNota(idAlu, idAssi, role, res);
});
app.get("/assignatura/:id", authenticateJWT, (req, res) => {
  var ass = new Assignatures.Assignatures();
  let id_ass = req.params.id;
  ass.getAssignaturaId(id_ass, res);
});
app.get("/modul",authenticateJWT,(req,res)=>{
  var modul = new Moduls.Moduls()


  let id = req.user.id
  let role = req.user.role
  modul.getModuls(id,role,res)
})
app.get("/modul/:idM",authenticateJWT,(req,res)=>{
  var mod = new Moduls.Moduls()
  let id = req.user.id
  let idM = req.params.idM
  let role = req.user.role
  mod.getModulId(id,idM,role,res)
})
app.put("/moduls/:id_m/:id_al",authenticateJWT,(req,res)=>{
  let mod = new Notes.Notes()
  let idp = req.user.id
  let idm = req.params.id_m
  let ida = req.params.id_al
  let role = req.user.role
  let nota = req.body.nota
  mod.setNota(idp,idm,ida,role,nota,res)
})
app.get("/alumne/:ida",authenticateJWT,(req,res)=> {
var uss = new User.User()
let alu = req.params.ida
uss.getAlumne(alu,res)
})