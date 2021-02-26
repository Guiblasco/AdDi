var db = require("./../db/db");


class Notes {
  mydb = new db.Database();
  constructor() {}

  getNotes(id, role, res) {
    if (role == "alumno") {
      let conn = this.mydb.getConnection();
      let sql =
        " SELECT * FROM notes, assignatura WHERE notes.id_alumne = ? AND notes.id_assig = assignatura.id_assig ";
      console.log(id);
      conn.query(sql, [id], (err, results) => {
        if (err) {
          console.log(err);
          res.status(401).send({
            OK: false,
            error: "Error al buscar notes",
          });
        } else {
          var notes = [];
          results.forEach((coses) => {
            notes.push({
              nota: coses.nota,
              id_assig: coses.id_assig,
              cod_assig: coses.cod_assig,
              links: {
                get:
                  " GET https://localhost:8888/assignatures/" + coses.id_assig,
              },
            });
          }),
            res.status(201).send({
              notes,
            });
        }
      });
    } else {
      res.status(401).send({
        OK: false,
        error: "usuari no autoritzat",
      });
    }
  }
  getNota(id, id_assig,role, res) {
    
    if (role == "alumno") {
      let conn = this.mydb.getConnection();
      let sql = " SELECT * FROM notes as n, assignatura as a WHERE (n.id_alumne = ? AND n.id_assig = a.id_assig AND n.id_assig = ?) ";
      conn.query(sql, [id, id_assig], (err, results) => {
        if (err) {
          res.status(401).send({
            OK: false,
            error: "Erro al buscar la nota de l'assignatura indicada",
          });
        } else {
          if (results.length == 0) {
            // esta vacio, no esta matriculado
            res.status(401).send({
              OK: false,
              error: "L'alumne no esta matriuculat d'aquesta assignatura",
            });
          } else {
            var nota = [];
            results.forEach(coses => {
              nota.push({
                nota: coses.nota,
                id_assig: coses.id_assig,
                cod_assig: coses.cod_assig,
                link: {
                  get:
                    "GET https://localhost:8888/assignatura/" + coses.id_assig,
                },
              });
            });
            res.status(201).send({OK:true, notes:nota});
          }
          
        }
      });
    } else {
      res.status(401).send({
        OK: false,
        error: "Usuari no autoritzat",
      });
    }
  }
  setNota(id_profe,id_assig,id_alu,role,nota,res){
    if(role=="profe"){
      let conn = this.mydb.getConnection()
      let sql = "UPDATE notes SET nota=? WHERE id_alumne = ? AND id_profe = ? AND id_assig = ?"
      conn.query(sql,[nota,id_alu,id_profe,id_assig],(err)=>{
        if(err){
          res.status(400).send({
            OK:false,
            error:"Error al modificar les notes"
          })
        }
        else{
          res.status(200).send({
            OK:true
          })
        }
      })
    }
    else{
      res.status(400).send({
        OK:false,
        error:"Usuari no autoritzat"
      })
    }
  }
}

module.exports = {
  Notes: Notes,
};
