const getConnection = require ('../dbcon.js')

// Edit Showroom
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Showroom WHERE showRoomID = ?', [req.params.showRoomID], (err, rows) => {
            connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Showroom)); ', (err, galleryRows) => {
                connection.query('SELECT * FROM Artist WHERE artistID IN (SELECT artistID FROM Artist EXCEPT (SELECT artistID FROM Showroom)); ', (err, artistRows) => {
                    if(!err){
                        connection.release();
                        let failure = req.query.failed;
                        res.render('editShowroom', { rows, galleryRows, artistRows, failure });
                    }
                    console.log(rows);
                });
            });
        });
    });
};

// Update Showroom
exports.update = (req, res) => {
    const {GalleryID, ArtistID, RoomNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Showroom SET galleryID = ?, artistID = ?, roomNumber = ? WHERE showRoomID = ?', [GalleryID, ArtistID, RoomNumber, req.params.showRoomID], (err, rows) => {
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Showroom WHERE showRoomID = ?', [req.params.showRoomID], (err, rows) => {
                        connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Showroom)); ', (err, galleryRows) => {
                            connection.query('SELECT * FROM Artist WHERE artistID IN (SELECT artistID FROM Artist EXCEPT (SELECT artistID FROM Showroom)); ', (err, artistRows) => {
                                if(!err){
                                    connection.release();
                                    res.render('editShowroom', { rows, alert: `The showroom has been updated.`, galleryRows, artistRows});
                                }
                                console.log(rows, galleryRows, artistRows);
                            });
                        });
                    });
                });
            } else {
                connection.release();
                let failed = encodeURIComponent('There was an error editing the database entry. Please try again.');
                res.redirect('/editShowroom/' + req.params.showRoomID + '?failed=' + failed);
            }
           console.log(rows);
        });
    });
};