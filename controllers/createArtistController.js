const getConnection = require ('../dbcon.js')

// Add new artist
exports.form = (req, res) =>{
    getConnection((err, connection) => {
        if(!err){
            let failure = req.query.failed;
            res.render('createArtist', { failure });
        }
    });
};
exports.create = (req, res) =>{
    const {GalleryID, AddressID, ArtistName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Artist SET galleryID = ?, addressID = ?, artistName = ?, email = ?, phoneNumber = ? ',[GalleryID, AddressID, ArtistName, Email, PhoneNumber], (err, rows) => {
            connection.release();
            if(!err){
                res.render('createArtist', { alert: `${ArtistName} has been added to the database.` });
            } else{
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createArtist?failed=' + failed);
            }
        });
    });
};