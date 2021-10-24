/*
 Authors: Heung Wai Chan (Bosco), Adel Kuanysheva
 Your name and student #: Heung Wai Chan (Bosco) A01258687
 Your Partner's Name and student #: Adel Kuanyshiva A01258780
 (Make sure you also specify on the Google Doc) 
*/
const express = require("express");
const { getMovies } = require("./helpers")

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  getMovies().then(movies => {
    res.render("pages/index", {movies})
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
  // Add your implementation here
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});