var db = require("./../db/db");


class Moduls {
  mydb = new db.Database();

  constructor() {}

  getModuls(id,role,res) {
    if (role == "profe") {

      let conn = this.mydb.getConnection();
      let sql =" SELECT DISTINCT * FROM notes as n, assignatura as a WHERE n.id_profe = ? AND n.id_assig = a.id_assig ";
      conn.query(sql,[id],(err,results)=>{
          if(err){
              res.status(401).send({
                  OK:false,
                  error:"Aquest profesor no te modul"
              })
          }else{
              var modul = []
              console.log(results)
              results.forEach(re => {
                  modul.push({

                      id_assig: re.id_assig,
                      cod_assig: re.cod_assig,
                      nom_assig: re.nom_assig,
                      modul: re.modul,
                      curs: re.curs,
                      hores: re.hores
                  })
                  
              })
              res.status(200).send({modul})
            }
      })
    }else{
        res.status(401).send({
            OK:false,
            error:"Usuari no autoritzat"
        })
    }
  }
  getModulId(id_P,id_A,role,res){
      if(role=="profe"){

        let conn = this.mydb.getConnection()
        let sql = " SELECT n.id_alumne,alu.full_name,n.id_assig,a.cod_assig,n.nota FROM notes as n, assignatura as a,users as alu "+
                  " WHERE n.id_alumne = alu.id AND n.id_profe = ? AND n.id_assig = ? AND n.id_assig = a.id_assig "
        conn.query(sql,[id_P,id_A],(err,results)=>{
            if(err){
                res.status(404).send({
                    OK:false,
                    error:"No s'han trobat les dades"
                })
            }else{
                var atributs = []
                results.forEach(element => {
                    
                    element.links = {
                        assig:"GET https://localhost:8888/assignatura/"+ element.id_assig,
                        alumne:"GET https://localhost:8888/alumne/"+element.id_alumne,
                        nota: "PUT https://localhost:8888/moduls/"+element.id_assig +"/"+ element.id_alumne
                        
                    }
                    atributs.push(element)
                    
                });
            }
            if(atributs.length > 0){
                res.status(200).send({ OK:true,atributs})    
            }else{
                res.status(200).send({OK:true, results:"Aquest profesor no dona aquest modul",atributs })
            }
            
        })
      }
      else{
          res.status(401).send({
              OK:false,
              error:"Usuari no autoritzat"
          })
      }
  }
}
module.exports = {
  Moduls: Moduls,
};
