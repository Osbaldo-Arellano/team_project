const getConnection = require ('../dbcon.js')

// Edit Artwork
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artwork WHERE artworkID = ?', [req.params.artworkID], (err, rows) => {
            connection.release();
            if(!err){
                res.render('editArtwork', { rows });
            }
           console.log(rows);
        });
    });
};

// Update Artwork
exports.update = (req, res) => {
    const {ArtistID, ConsumerID, GalleryID, Price, SellStatus, ArtworkName} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Artwork SET artistID = ?, consumerID = ?, galleryID = ?, price = ?, sellStatus = ?, artworkName = ? WHERE artworkID = ?', [ArtistID, ConsumerID, GalleryID, Price, SellStatus, ArtworkName, req.params.artworkID], (err, rows) => {
            connection.release();
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Artwork WHERE artworkID = ?', [req.params.artworkID], (err, rows) => {
                        connection.release();
                        if(!err){
                            res.render('editArtwork', { rows, alert: `Artwork "${ArtworkName}" has been updated.`});
                        } else{
                            res.render('404');
                        }
                       console.log(rows);
                    });
                });
            } else{
                res.render('404');
            }
           console.log(rows);
        });
    });
};