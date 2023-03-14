const mysql = require('mysql')
const bcrypt = require('bcrypt');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'togggle'
});

const generatePassword = async (password) => {
    return await new Promise((res, rej) => {
        // Your hash logic
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) rej(err);
            res(hash);
        });
    });
};



const createDbSql = 'CREATE DATABASE IF NOT EXISTS togggle'
const createTableSql = 'CREATE TABLE IF NOT EXISTS books(id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255) NOT NULL,description VARCHAR(2000) NOT NULL,author VARCHAR(255) NOT NULL, year INT(4) NOT NULL CHECK (year BETWEEN 0 AND 2023 AND year > 0),cover VARCHAR(1000) NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)'
const createTableSqlUsers = 'CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL,email VARCHAR(2000) NOT NULL,password VARCHAR(255) NOT NULL, access_token VARCHAR(255),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)'

const value = [
   ['Madonna in Fur Coat','A love story','Sabahattin Ali',1943,'https://example.com/kurkmantolumadonna.jpg'],
   ['White Fang', 'A wolf story', 'Jack London', 1906, 'https://example.com/beyazdis.jpg'],
   ['Les Misérables', 'A French detective novel', 'Victor Hugo', 1862, 'https://example.com/sefiller.jpg'],
   ['One Hundred Years of Solitude', 'A familys story','Gabriel Garcia Marquez', 1967, 'https://example.com/yuzyillikyalnizlik.jpg'],
   ['Red Monday', 'Diary of a madman', 'Gabriel Garcia Marquez', 1981, 'https://example.com/kirmizipazartesi.jpg']
]

const valueUsers = [
    ['User1','user@gmail.com', '123456', '$2a$12$rqLycDLfsdeW6mTKjqQrPOs8PFVQu9QEfYoFwCdi5JEMtabscRyC6'],
    ['User2','user2@gmail.com', '1234567', '$2a$12$5voAewq7HQ3tcT4pHVyy0eWHKUHcfL4.pzUa/2XKlzqyeHSfb1x0e'],
    ['User3','user3@gmail.com', '12345678', '$2a$12$8DmH1eAsLxgulGBrtNVXa.1H6Ftygc7YcgzlqWgd8AcbVKYgEQVB6'],
]

const createInsertSql = 'INSERT INTO books (title,description,author,year,cover) VALUES ?'
const createInsertSqlUser = 'INSERT INTO users (name,email,password,access_token) VALUES ?'

/*connection.connect((err) =>{
    if (err) {
        console.log('There is error!', err)
    }
    connection.query(createDbSql,(err,result) =>{
        if (err) {
        console.log('There is error!', err)
        } else {
            connection.query(createTableSql,(err,result) => {
                if (err) {
                    console.log('There is error!', err)
                    }else {

                        connection.query(createInsertSql,[value],(err,result) => {
                            if(err){
                                console.log('There is error!', err)
                            }
                            console.log('result',result)
                            
                        })

                    }
            })
        }
    })
    console.log('Connect')
})

*/

  connection.connect((err) =>{
    if (err) {
        console.log('There is error!', err)
    }
      connection.query(createTableSqlUsers,(err,result) => {
          if (err) {
              console.log('There is error!', err)
          }else {
              connection.query(createInsertSqlUser,[valueUsers],(err,result) => {
                  if(err){
                      console.log('There is error!', err)
                  }
                  console.log('result',result)

              })
          }
      })
    console.log('Connect')
})
