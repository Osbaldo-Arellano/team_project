const getConnection = require ('../dbcon.js')

// Edit Artwork
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artwork WHERE artworkID = ?', [req.params.artworkID], (err, rows) => {
            connection.query('SELECT * FROM Artist WHERE artistID IN (SELECT artistID FROM Artist EXCEPT (SELECT artistID FROM Artwork)); ', (err, artistRows) => {
                connection.query('SELECT * FROM Consumer WHERE consumerID IN (SELECT consumerID FROM Consumer EXCEPT (SELECT consumerID FROM Artwork)); ', (err, consumerRows) => {
                    connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Artwork)); ', (err, galleryRows) => {
                        if(!err){
                            connection.release();
                            let failure = req.query.failed;
                            res.render('editArtwork', { rows, artistRows, consumerRows, galleryRows, failure });
                        }
                        console.log(rows);
                    });
                });
            });
        });
    });
};

// Update Artwork
exports.update = (req, res) => {
    const {ArtistID, ConsumerID, GalleryID, Price, SellStatus, ArtworkName} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Artwork SET artistID = ?, consumerID = ?, galleryID = ?, price = ?, sellStatus = ?, artworkName = ? WHERE artworkID = ?', [ArtistID, ConsumerID, GalleryID, Price, SellStatus, ArtworkName, req.params.artworkID], (err, rows) => {
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Artwork WHERE artworkID = ?', [req.params.artworkID], (err, rows) => {
                        connection.query('SELECT * FROM Artist WHERE artistID IN (SELECT artistID FROM Artist EXCEPT (SELECT artistID FROM Artwork)); ', (err, artistRows) => {
                            connection.query('SELECT * FROM Consumer WHERE consumerID IN (SELECT consumerID FROM Consumer EXCEPT (SELECT consumerID FROM Artwork)); ', (err, consumerRows) => {
                                connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Artwork)); ', (err, galleryRows) => {
                                    if(!err){
                                        connection.release();
                                        res.render('editArtwork', { rows, alert: `Artwork "${ArtworkName}" has been updated.`, artistRows, consumerRows, galleryRows});
                                    }
                                    console.log(artistRows, consumerRows, galleryRows);
                                });
                            });
                        });
                    });
                });
            } else {
                connection.release();
                let failed = encodeURIComponent('There was an error editing the database entry. Please try again.');
                res.redirect('/editArtwork/' + req.params.artworkID + '?failed=' + failed);
            }
           console.log(rows);
        });
    });
};