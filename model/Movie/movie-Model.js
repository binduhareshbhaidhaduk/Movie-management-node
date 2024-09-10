const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: String,
  path:String,
  discription: String,
  year: Number
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports=Movie;