const getConnection = require ('../dbcon.js')

// Edit Artist
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artist WHERE artistID = ?', [req.params.artistID], (err, rows) => {
            connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Artist)); ', (err, galleryRows) => {
                connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Artist)); ', (err, addressRows) => {
                    if(!err){
                        connection.release();
                        let failure = req.query.failed;
                        res.render('editArtist', { rows, galleryRows, addressRows, failure });
                    }
                    console.log(rows);
                });
            });
        });
    });
};

// Update Artist
exports.update = (req, res) => {
    const {GalleryID, AddressID, ArtistName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Artist SET galleryID = ?, addressID = ?, artistName = ?, email = ?, phoneNumber = ? WHERE artistID = ?', [GalleryID, AddressID, ArtistName, Email, PhoneNumber, req.params.artistID], (err, rows) => {
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Artist WHERE artistID = ?', [req.params.artistID], (err, rows) => {
                        connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Artist)); ', (err, galleryRows) => {
                            connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Artist)); ', (err, addressRows) => {
                                if(!err){
                                    connection.release();
                                    res.render('editArtist', { rows, alert: `${ArtistName}'s information has been updated.`, galleryRows, addressRows});
                                }
                                console.log(galleryRows, addressRows);
                            });
                        });
                    });
                });
            } else {
                connection.release();
                let failed = encodeURIComponent('There was an error editing the database entry. Please try again.');
                res.redirect('/editArtist/' + req.params.artistID + '?failed=' + failed);
            }
            console.log(rows);
        });
    });
};