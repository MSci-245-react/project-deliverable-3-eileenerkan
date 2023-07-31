import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));



// API to read movies from the database
app.post('/api/getMovies', (req, res) => {
    let connection = mysql.createConnection(config);

    const sql = `SELECT id, name, year, quality FROM movies`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        let string = JSON.stringify(results);
        res.send({ express: string });
    });
    connection.end();
});

//API for search functionlaity
// Backend API for Movie Search
app.post('/api/searchMovies', (req, res) => {
    console.log("Search called");
    const { query } = req.body;
    console.log("Search query:", query);
  
    let connection = mysql.createConnection(config);
  
    const sql = `SELECT m.name AS movieTitle,
    GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') AS directorNames,
    GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name) SEPARATOR ', ') AS actorNames,
    GROUP_CONCAT(DISTINCT CONCAT(IFNULL(Review.reviewContent, 'No review available'))) AS reviews,
    AVG(Review.reviewScore) AS avg_review_score
FROM movies m
LEFT JOIN movies_directors md ON m.id = md.movie_id
LEFT JOIN directors d ON md.director_id = d.id
LEFT JOIN roles r ON m.id = r.movie_id
LEFT JOIN actors a ON r.actor_id = a.id
LEFT JOIN Review ON m.id = Review.movieID
WHERE
    m.name LIKE '%${query.title}%' AND
    CONCAT(d.first_name, ' ', d.last_name) LIKE '%${query.director || ''}%' AND
    CONCAT(a.first_name, ' ', a.last_name) LIKE '%${query.actor || ''}%'
GROUP BY m.id, m.name;`;

    console.log("Search SQL:", sql);
  
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Error fetching movies from the database" });
      }
      let string = JSON.stringify(results);
      console.log("Search results:", string);
  
      res.send({ express: string });
    });
  
    connection.end();
  });
  

// API to add a review to the database
app.post('/api/addReview', (req, res) => {
    const { userID, movieID, reviewTitle, reviewContent, reviewScore } = req.body;

    let connection = mysql.createConnection(config);

    const sql = `INSERT INTO Review (userID, movieID, reviewTitle, reviewContent, reviewScore) 
                 VALUES (?, ?, ?, ?, ?)`;

    const data = [userID, movieID, reviewTitle, reviewContent, reviewScore];

    connection.query(sql, data, (error, results, fields) => {
        if (error) {
            console.error("Error adding review:", error.message);
            return res.status(500).json({ error: "Error adding review to the database" });
        }

        return res.status(200).json({ success: true });
    });
    connection.end();
});

app.get('/api/movieRecommendation', (req, res) => {
    let connection = mysql.createConnection(config);
  
    const sql = `
      SELECT m.id, m.name, m.year, m.quality, AVG(Review.reviewScore) AS avg_review_score
      FROM movies m
      LEFT JOIN Review ON m.id = Review.movieID
      GROUP BY m.id, m.name, m.year, m.quality
      ORDER BY avg_review_score DESC
      LIMIT 5;
    `;
  
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Error fetching movie recommendations from the database" });
      }
  
      res.json(results); // Send the recommendations as a JSON response
    });
  
    connection.end();
  });

  app.get('/api/randomMovie', (req, res) => {
    let connection = mysql.createConnection(config);
  
    const sql = `
      SELECT id, name, year, quality
      FROM movies
      ORDER BY RAND() -- Randomly order the movies
      LIMIT 1;  -- Retrieve only one random movie
    `;
  
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Error fetching a random movie from the database" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "No movies found in the database" });
      }
  
      res.json(results[0]); // Send the random movie as a JSON response
    });
  
    connection.end();
  });
  
  app.post('/api/watchedMovie', (req, res) => {
    const { watched, movieName } = req.body;
    let connection = mysql.createConnection(config);
  
    const query = 'INSERT INTO watched_movies (watched, movieName) VALUES (?, ?)';
    connection.query(query, [watched, movieName], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server Error');
      } else {
        res.status(200).send('Successfully added to the database');
      }
    });
    connection.end();
  });

app.listen(port, () => console.log(`Listening on port ${port}`));