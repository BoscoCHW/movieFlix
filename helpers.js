const fs = require("fs").promises;

const getMovies = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("movieDescriptions.txt")
            .then((data) => {
                const movieData = data.toString().split("\n");
                const movies = movieData.map(movie => {
                    const [title, description] = movie.split(":");
                    return {title, description};
                });
                resolve(movies);                
            })
            .catch(err => reject(err))

    });
};

module.exports = {getMovies};