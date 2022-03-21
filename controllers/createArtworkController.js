const getConnection = require ('../dbcon.js')

// View available Artists, Consumers, and Galleries
exports.view = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artist WHERE artistID IN (SELECT artistID FROM Artist EXCEPT (SELECT artistID FROM Artwork)); ', (err, artistRows) => {
            connection.query('SELECT * FROM Consumer WHERE consumerID IN (SELECT consumerID FROM Consumer EXCEPT (SELECT consumerID FROM Artwork)); ', (err, consumerRows) => {
                connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Artwork)); ', (err, galleryRows) => {
                    connection.release();
                    if(!err){
                        let failure = req.query.failed;
                        res.render('createArtwork', { artistRows, consumerRows, galleryRows, failure });
                    }
                    console.log(artistRows, consumerRows, galleryRows);
                });
            });
        });
    });
};

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
    const {ArtistID, ConsumerID, GalleryID, Price, ArtworkName, SellStatus} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Artwork SET artistID = ?, consumerID = ?, galleryID = ?, price = ?, artworkName = ?, sellStatus = ? ',[ArtistID, ConsumerID, GalleryID, Price, ArtworkName, SellStatus], (err, rows) => {
            if(!err){
                connection.query('SELECT * FROM Artist WHERE artistID IN (SELECT artistID FROM Artist EXCEPT (SELECT artistID FROM Artwork)); ', (err, artistRows) => {
                    connection.query('SELECT * FROM Consumer WHERE consumerID IN (SELECT consumerID FROM Consumer EXCEPT (SELECT consumerID FROM Artwork)); ', (err, consumerRows) => {
                        connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Artwork)); ', (err, galleryRows) => {
                            connection.release();
                            if(!err){
                                res.render('createArtwork', { alert: `${ArtworkName} has been added to the database.`, artistRows, consumerRows, galleryRows});
                            } 
                            console.log(artistRows, consumerRows, galleryRows)
                        });
                    });
                });
            } else{
                connection.release();
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createArtwork?failed=' + failed);
            }
        });
    });
};