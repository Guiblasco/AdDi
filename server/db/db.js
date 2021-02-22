var mysql=require('mysql');

class Database{
    constructor(){}

    getConnection(){
        // Retorna una connexió a la BD MySQL
        return mysql.createConnection(
            {
            insecureAuth : true, 
            host     : '127.0.0.1',
            port     : '3306',
            user     : 'root',
            password : 'root',
            database : 'docencia'
          }); 
    }
}

module.exports = {
    Database:Database
}