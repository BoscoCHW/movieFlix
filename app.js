/*
 Authors: Heung Wai Chan (Bosco), Adel Kuanysheva
 Your name and student #: Heung Wai Chan (Bosco) A01258687
 Your Partner's Name and student #: Adel Kuanysheva A01258780
 (Make sure you also specify on the Google Doc) 
*/
const express = require("express");
const { getMovies } = require("./helpers")

const NAME = 'Adel';

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  getMovies().then(movies => {
    res.render("pages/index", {
      name: NAME,
      movies
    })
  })
  .catch(err => console.log(err));
});

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  const formData = req.body;
  const movies = formData.myMovies.split(',').map(movieTitle => {
    const movie = {
      title: movieTitle
    };
    return movie;
  });
  res.render("pages/index", {movies});
});

app.get("/myListQueryString", (req, res) => {
  const query = req.query;
  let movies = []
  for (movieNum in query) {
    const movie = {title: query[movieNum]};
    movies.push(movie);
  }
  res.render("pages/index", { movies });
});

app.get("/search/:movieName", (req, res) => {
  const param = req.params.movieName;
  getMovies().then(movies => {
    for (item of movies) {
      let title = item.title.toLowerCase().replace(/ /g, "")
      if (title.includes(param)) {
        res.render('pages/searchResult', {
          found: true,
          item
        })
      } 
    } res.render("pages/searchResult", {found: false})
  })
  .catch(err => console.log(err));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});