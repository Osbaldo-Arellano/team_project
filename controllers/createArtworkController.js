const getConnection = require ('../dbcon.js')

// Add new artwork
exports.form = (req, res) =>{
    getConnection((err, connection) => {
        if(!err){
            let failure = req.query.failed;
            res.render('createArtwork', { failure });
        }
    });
};
exports.create = (req, res) =>{
    const {ArtistID, ConsumerID, GalleryID, Price, SellStatus, ArtworkName} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Artwork SET artistID = ?, consumerID = ?, galleryID = ?, price = ?, sellStatus = ?, artworkName = ? ',[ArtistID, ConsumerID, GalleryID, Price, SellStatus, ArtworkName], (err, rows) => {
            connection.release();
            if(!err){
                res.render('createArtwork', { alert: `${ArtworkName} has been added to the database.` });
            } else{
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createArtwork?failed=' + failed);
            }
        });
    });
};
