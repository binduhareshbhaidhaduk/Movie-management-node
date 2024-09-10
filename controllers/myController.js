const movieModal = require('../model/Movie/movie-Model')
const fs = require('fs');
const path=require('path');

const defaultCon = async (req, res) => {
    let data = await movieModal.find({});
    console.log('default running')
    res.render('home', { data });
}

const createMovieCon = (req, res) => {
    res.render('addMovie'); 
};

const addMovieCon = async (req, res) => {
    console.log(' add Movie',req.body.title,req.file)

    const Movie = req.body.movie
    console.log(Movie)

    const newMovie = {
        title: req.body.title,
        year: req.body.year,
        discription: req.body.discription,
        path:req.file.path
    }

    let movieM = await new movieModal(newMovie);

    await movieM.save()

    res.redirect('/');
}

const singleMovieCon = async (req, res) => {
    const { id } = req.params

    console.log(id, 'edit id')

    let data = await movieModal.findOne({ _id: id })


    console.log(data, 'single record');
    res.render('editMovie', { data });
}

const updateMovieCon = async (req, res) => {
        console.log('update movie', req.params.id);
        const { id } = req.params;
        
        // Check if a file was uploaded
        let filePath = req.file ? req.file.path : undefined;

        // Update movie information
        const result = await movieModal.updateOne(
            { _id: id },
            {
                $set: {
                    title: req.body.title,
                    year: req.body.year,
                    discription: req.body.discription,
                    ...(filePath && { path: filePath }) // Only set path if filePath is defined
                }
            }
        );

        console.log(result, 'update data');

        res.redirect('/');
}


const deleteMovieCon =async (req, res) => {
    let {id} = req.params;
    
    const movie = await movieModal.findById(id);

    // Check if the todo has an associated image
    if (movie && movie.path) {
        const filePath = path.join(__dirname, '../', movie.path); // Construct the file path
        
        // Check if the file exists and delete it
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting image file:", err);
            } else {
                console.log("Image file deleted successfully:", filePath);
            }
        });
    }

    let data=await movieModal.deleteOne({_id:id});

    
    console.log(data,'delete')
    res.redirect('/')

}

const singleViewCon = async (req, res) => {
    const { id } = req.params;
    let data = await movieModal.findOne({ _id: id });

    console.log(data, 'single view');
    res.render('movieView', {  data });
};

module.exports = { defaultCon,createMovieCon, addMovieCon, singleMovieCon, updateMovieCon, deleteMovieCon ,singleViewCon}