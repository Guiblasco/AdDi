var db = require("./../db/db");

class Assignatures {
  mydb = new db.Database();

  constructor() {}

  getAssignaturaId(id, res) {
    let conn = this.mydb.getConnection();
    let sql = " SELECT * FROM assignatura WHERE id_assig = ? ";
    conn.query(sql, [id], (err, results) => {
      if (err) {
        res.status(401).send({
          OK: false,
          error: " No he trobat l'assignatura",
        });
      } else {
        res.status(201).send({ OK: true, results });
      }
    });
  }
}
module.exports = {
  Assignatures: Assignatures
};
