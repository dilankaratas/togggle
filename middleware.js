const mysql = require("mysql");

function middleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'unauthenticated.' });
    }

    const token = authHeader.split(' ')[1];

    var config = {
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'togggle',
        port:3306
    };

    const connection = mysql.createConnection(config);

    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected!');
    });

    const sql = "SELECT * FROM users WHERE access_token = ?";
    connection.query(sql, [token], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(401).json({ error: 'unauthenticated.' });
        }
        else
        {
           next();
        }
    });

}

module.exports = middleware;