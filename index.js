// index.js

/*** Required External Modules ***/
const express = require("express");
const path = require("path");

/*** App Variables ***/
const app = express();
const port = process.env.PORT || "8000";

/***  App Configuration ***/
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
  extended: true
}))

/*** Routes Definitions ***/
app.get("/", (req, res) => {
  //res.status(200).send("ASSESS ME");
  res.render('index');
});


app.get("/search", (req, res) => {

  let term = "";

  let movies = [
    {Title: "Princess Bride"},
    {Title: "Lord of the Rings"}
  ];

  res.render("movies/search", {movies: movies, term: term});
});

app.post("/search", (req, res) => {

  let term = req.body.term;

  console.log(req.params);
  console.log(req.body);

  let movies = [
    {Title: "Princess Bride"},
    {Title: "Lord of the Rings"}
  ];

  let url = 

  fetch(url).then(function(response) {
    response.text().then(function(text) {
      poemDisplay.textContent = text;
    });
  });


  res.render("movies/search", {movies: movies, term: term});

});

/*** Server Activation ***/
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
