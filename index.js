const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
  );


  app.get('/api/movies', (req, res) => {
    db.query(`SELECT * FROM movies`, (err, results) => {
        console.log(results);
        res.send(results);
    })
  });


app.post('/api/add-movie', ({ body }, res) => {
    db.query(`INSERT INTO movies (movie_name) VALUES (?)`, [body.movie_name], (err, results) => {
        res.json({
            message: 'success',
            data: body
        })
    })
});






  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });