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

// API to search for movies based on provided criteria
app.post('/api/searchMovies', (req, res) => {
	console.log(req.body);
	const connection = mysql.createConnection(config);
  
	const { movieTitle, actorName, directorName } = req.body;
  
	let sql = `
	  SELECT m.id, m.name AS movieTitle,
		  GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') AS DirectorNames,
		  GROUP_CONCAT(DISTINCT CONCAT(a.first_name, ' ', a.last_name) SEPARATOR ', ') AS ActorsNames,
		  GROUP_CONCAT(DISTINCT CONCAT('Review: ', r.reviewContent)) AS reviews,
		  AVG(r.reviewScore) AS avg_review_score
	  FROM movies m
	  LEFT JOIN movies_directors md ON m.id = md.movie_id
	  LEFT JOIN directors d ON md.director_id = d.id
	  LEFT JOIN roles rl ON m.id = rl.movie_id
	  LEFT JOIN actors a ON rl.actor_id = a.id
	  LEFT JOIN reviews r ON m.id = r.movie_id`;
  
	const queryData = [];
  
	if (movieTitle) {
	  sql += ` WHERE m.name LIKE ?`;
	  queryData.push(`%${movieTitle}%`);
	}
  
	if (actorName) {
	  if (queryData.length === 0) {
		sql += ` WHERE CONCAT(a.first_name, ' ', a.last_name) LIKE ?`;
	  } else {
		sql += ` AND CONCAT(a.first_name, ' ', a.last_name) LIKE ?`;
	  }
	  queryData.push(`%${actorName}%`);
	}
  
	if (directorName) {
	  if (queryData.length === 0) {
		sql += ` WHERE CONCAT(d.first_name, ' ', d.last_name) LIKE ?`;
	  } else {
		sql += ` AND CONCAT(d.first_name, ' ', d.last_name) LIKE ?`;
	  }
	  queryData.push(`%${directorName}%`);
	}
  
	sql += ` GROUP BY m.id, m.name`;
  
	connection.query(sql, queryData, (error, results) => {
        if (error) {
            console.error(error.message);
            // return a JSON error response
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // return a JSON response with the results
        res.json({ results });
    });

    connection.end();
});
  








app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version