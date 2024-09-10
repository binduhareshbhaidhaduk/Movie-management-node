const express=require('express');
const controllers=require('../controllers/myController')
const uploads=require('../config/multer')

const router= express();

router.get('/',controllers.defaultCon);
router.get('/createMovie', controllers.createMovieCon);
router.post('/addMovie',uploads.single('poster'),controllers.addMovieCon);
router.get('/singleMovie/:id',controllers.singleMovieCon);
router.post('/update/:id',uploads.single('poster'),controllers.updateMovieCon);
router.get('/deleteMovie/:id',controllers.deleteMovieCon);
router.get('/selectMovie/:id',controllers.singleViewCon);





module.exports= router;