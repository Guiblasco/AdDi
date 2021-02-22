var db=require('../db/database');

class User{

    mydb=new db.Database();

    constructor(){}

    getAllPeople(callback){
        let conn=this.mydb.getConnection();
        let sql="SELECT name,height,eye_color,birth_year from people";
        conn.query(sql,function(err,results,fields){
            if(err){
                console.log(err);
            }
            else{
                conn.end();
                callback(results,fields);
            }
        })


    }

    getOneByID(id,callback){
        let conn=this.mydb.getConnection();
        let sql="SELECT name,height,eye_color,birth_year "+
                "from people where id=?";
        conn.query(sql,[id],function(err,results,fields){
            if(err){
                console.log(err);
            }
            else{
                conn.end();
                callback(results,fields);
            }
        })

    }

    getNewId(callback){
        let conn=this.mydb.getConnection();
        let sql="SELECT max(id)+1 as newID from people";
        conn.query(sql, (err,results,fields)=>{
            if (err){
                console.log(err)
            }
            else{
                conn.end();
                callback(results[0].newID);
            }
        });
    }

    insertUser(name,height,eye_color,birth_year,callback){
        let conn=this.mydb.getConnection();
        let sql="INSERT INTO people(id,name,height,eye_color,birth_year) "+
                "VALUES (?,?,?,?,?)"
        
        this.getNewId(function(newID){
            conn.query(sql,[newID,name,height,eye_color,birth_year],(err,results,fields)=>{
                if (err){
                    console.log("Error inserint dades");
                }
                else{
                    conn.end();
                    callback(results);
                }
            })
        });


    }

    updateUser(id,name,height,eye_color,birth_year,callback){
        let conn=this.mydb.getConnection();
        let sql="UPDATE people SET name=?,height=?,eye_color=?,birth_year=? "+
                "WHERE id=?";
        conn.query(sql,[name,height,eye_color,birth_year,id],(err,results,fields)=>{
            if(err){
                console.log(err);
            }
            else{
                conn.end();
                callback(results);
            }
        })
    }

    

    deleteUser(id,callback){

    }


}

module.exports={
    User:User
}