var express = require("express");
const Joi = require('joi');
const bodyParser = require('body-parser');
const middleware = require('../togggle/middleware');
var app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));

let userScheme = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

app.post('/token', function (req, res) {
    const validation = userScheme.validate(req.body);
    if (validation.error) {
        res.status(400).json({ error: validation.error.details[0].message });
    } else {
        const { email, password } = req.body;
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        connection.query(sql, [email, password], (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                res.status(401).json({ error: 'Invalid name and password.' });
            }
            res.json(result);
        });
    }
});

app.use(middleware);


var mysql = require("mysql");
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

app.get('/books', function (req, res) {
    connection.query('SELECT * FROM books', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM books WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.string().required(),
});

app.post('/books', (req, res) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
        res.status(400).json({ error: validation.error.details[0].message });
    } else {
        const { title, description, author,year,cover } = req.body;
        const sql = 'INSERT INTO books (title, description, author,year,cover) VALUES (?, ?, ?)';
        connection.query(sql, [title, description, author,year,cover], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(201).json({ message: 'User registered successfully' });
            }
        });
    }
    const { title, description, author, year, cover } = req.body;
    const sql = `INSERT INTO books (title, description, author, year, cover) VALUES ('${title}', '${description}', '${author}', ${year}, '${cover}')`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send('New book added successfully!');
    });
});

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, description, author, year, cover } = req.body;
    const sql = `UPDATE books SET title='${title}', description='${description}', author='${author}', year=${year}, cover='${cover}' WHERE id=${bookId}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`Book ${bookId} updated successfully!`);
    });
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM books WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(`Book ${id} deleted successfully!`);
    });
});

app.listen(5001);