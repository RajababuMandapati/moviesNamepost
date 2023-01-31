const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "moviesData.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `
    SELECT
      *
    FROM
        movie
      
    ORDER BY
      movie_id;`;
  const moviesArray = await db.all(getMoviesQuery);
  response.send(moviesArray);
});

// post movie id

app.post("/movies/", async (request, response) => {
  const movieDetails = request.body;
  const { movie_id, director_id, movie_name, lead_actor } = moviesDetails;

  const addMovieName = `
    INSERT INTO movie(movie_id,director_id,movie_name,lead_actor)
    VALUES (movie_id,6,'Jurassic Park','Jeff Goldblum')
    ;`;
  const dbResponse = await db.run(addMovieName);
  const movieId = dbResponse.lastID;
  response.send({ movieId: movieId });
});
