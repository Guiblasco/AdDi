var db = require("../db/database");

class User {
  mydb = new db.Database();

  constructor() {}

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

  insertUser(username, password, full_name, callback) {
    let conn = this.mydb.getConnection();
    let sql =
      "INSERT INTO users(id,username, password, full_name) " + "VALUES (?,?,?)";

    this.getNewId(function (newID) {
      conn.query(
        sql,
        [newID, username, password, full_name],
        (err, results, fields) => {
          if (err) {
            console.log("Error inserint usuari");
          } else {
            conn.end();
            callback(results);
          }
        }
      );
    });
  }
  login(username, password, callback) {
    let conn = this.mydb.getConnection();
    let sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    conn.query(sql, [username, password], function (err, res) {
      if (err) {
        console.log(err);
      } else {
        conn.end();
        callback(res);
      }
    });
  }
}

module.exports = {
  User: User,
};
