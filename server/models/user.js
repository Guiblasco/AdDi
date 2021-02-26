var db = require('./../db/db');
const jwt = require("jsonwebtoken");
const accessTokenSecret = "toro";




class User {
  mydb = new db.Database();

  constructor() {}
//funcio que certifica si es profesor o no 
  isProfe(id,callback) {
    let conn = this.mydb.getConnection();
    let sql = "SELECT count(*) FROM docencia.alumne where id_alumne = ?"
    conn.query(sql,[id],(err,results)=>{
      if(err){
        res.status(401).send({
          OK:false,
          error:"no s'ha pogut executar"
        })
      }else{
         callback(results[0]["count(*)"] == 1)
      }
    })
  }

  getNewId(callback) {
    let conn = this.mydb.getConnection();
    let sql = "SELECT max(id)+1 as newID FROM users";
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err);
      } else {
        conn.end();
        callback(results[0].newID);
      }
    });
  }  

  insertUser(username, password, full_name,dni,avatar,res,req) {
    let conn = this.mydb.getConnection();
    let sql = "INSERT INTO users (username, password, full_name,avatar) " + "VALUES (?,?,?,?)";

    conn.query(sql,[username,password,full_name,avatar],(err,results)=>{
      if(err){
        console.log(err);
        res.status(401).send({
          OK:false,
          error:"Error inserint dades " + err
        });
      }else{
        sql="SELECT * FROM dni_profe WHERE dni = ?"
        let id= results["insertId"]
        conn.query(sql,[dni],(err,results)=>{
          if (results.length > 0){
            sql = "INSERT INTO professor (id_professor) VALUES (?)"
            conn.query(sql,[id],(err,results)=>{
              if(err){
                res.status(401).send({
                  OK:false,
                  error:"Error al inserir un professor" + err
                })
              }else{
                let autToken = jwt.sign({
                  id:id,
                  username:req.body.username,
                  full_name:req.body.full_name,
                  role:"profe"
                },accessTokenSecret,{expiresIn:'2h'})
                res.status(200).send({
                  OK:true,
                  result:"Profressor inserit amb exit",
                  token:autToken
                })
              }
            })
          }else{
            sql="INSERT INTO alumne (id_alumne) VALUES (?)"
            conn.query(sql,[id],(err,results)=>{
              if(err){
                res.status(401).send({
                  OK:false,
                  error:"Error al inserir un alumne" + err
                })
              }else{
                let autToken = jwt.sign({
                  id:id,
                  username:req.body.username,
                  full_name:req.body.full_name,
                  role:"alumne"
                },accessTokenSecret)
                res.status(200).send({
                  OK:true,
                  result:"Alumne inserit amb exit",
                  token:autToken
                })
              }
            })
          }
        })
      }
    })
  }
  
  login(username, password,req,res) {
    let conn = this.mydb.getConnection();
    let sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    conn.query(sql, [username, password],(err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          OK:false,
          error:"Error en execucio de la consulta"
        })
      } else {
        if(results.length == 0){
          res.status(404).send({
            OK:false,
            error:"Usuari  no existeix"
          })
        }else {
          sql = "SELECT id FROM users WHERE id = ?"
          let id = results[0].id
          conn.query(sql,[id],(err,results)=>{
            if(err){
              res.status(401).send({
                OK:false,
                error:"Error amb l'usuari"
              })
            }else{
              new User().isProfe(id, (pro)=> {
                let autToken = jwt.sign({
                  id:id,
                  username:req.body.username,
                  role: pro == 0 ? "profe": "alumno",
                },accessTokenSecret,{expiresIn:'2h'})
                res.status(200).send({
                  OK:true,
                  result:"Usuari Logejat",
                  token:autToken
              });
            });
          }
       })
      }
    }
  })
}

  getAlumne(id,res){
    let conn = this.mydb.getConnection()
    let sql = "SELECT * FROM alumne WHERE id_alumne = ? "
    conn.query(sql,[id],(err,results)=>{
      if(err){
        res.status(400).send({
          OK:false,
          erro: "l'alumno no existeix"
        })
      }else{
        
        res.status(201).send({
          OK:true,
          results})
      }
    })
  }
}
      


module.exports = {
  User:User
};
