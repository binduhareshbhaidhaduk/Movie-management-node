const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/movie')
  .then(() => console.log('mongoose Connected!'))
  .catch((err)=>{console.log('err',err)});