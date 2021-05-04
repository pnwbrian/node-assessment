// @@@ TODO: return the number of pages to the UI from the total movies JSON API data
// @@@ TODO: 

// index.js

/*** Required External Modules ***/
const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

require('dotenv').config()

/*** App Variables ***/
const app = express();
const port = process.env.PORT || "8000";
const OMDB_API_KEY = process.env.OMDB_API_KEY;

/***  App Configuration ***/
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
  extended: true
}))

let my_media_library = {};

/*** Routes Definitions ***/
app.get("/", (req, res) => {
  //res.status(200).send("ASSESS ME");
  res.render('index');
});

app.get("/movie/:movieId", (req, res) => {

  let movieId = req.params.movieId;

  let url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieId}&type=movie`;

  let commentary = { notes: "", favorite: false };

  if (Object.keys(my_media_library).includes(movieId)) {
    commentary = {
      ...my_media_library[movieId],
      notes:decodeURIComponent(my_media_library[movieId].notes)
    };
  }

  fetch(url).then(function(response) {
    response.json().then(function(data) {
      // console.log("DATA", data);
      res.render("movies/movie", {
        movie: data,
        imdbID: movieId,
        notes: commentary.notes,
        favorite: commentary.favorite
      });
    });
  });

});

app.post("/fav-notes", (req, res) => {

  const movieId = req.body.movieId || null;

  if (movieId) {

    const notes = req.body.notes || "";
    
    my_media_library[movieId] = {
      notes:encodeURIComponent(notes),
      favorite:"favorite" in req.body
    };

    res.redirect(`/movie/${movieId}`);

  } else {

    res.redirect(`/search`);

  }

});

app.get("/search", (req, res) => {

  let term = "";

  let movies = [];

  res.render("movies/search", {movies: movies, term: term});
});

app.post("/search", (req, res) => {

  let term = req.body.term;

  const page_num = req.body.page || 1;

  const page_requested = Number.isInteger(page_num) ? Math.min(parseInt(page_num, 10),1) : 1;

  // console.log(req.params);
  // console.log(req.body);

  let movies = [];

  let url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${term}&type=movie&page=${page_requested}`;

  fetch(url).then(function(response) {
    response.json().then(function(data) {
      // console.log("DATA", data);
      res.render("movies/search", {movies: data['Search'], term: term});
    });
  });

  //res.render("movies/search", {movies: movies, term: term});

});

/*** Server Activation ***/
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
