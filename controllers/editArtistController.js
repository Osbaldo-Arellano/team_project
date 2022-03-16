const getConnection = require ('../dbcon.js')

// Edit Artist
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artist WHERE artistID = ?', [req.params.artistID], (err, rows) => {
            connection.release();
            if(!err){
                res.render('editArtist', { rows });
            }
           console.log(rows);
        });
    });
};

// Update Artist
exports.update = (req, res) => {
    const {GalleryID, AddressID, ArtistName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Artist SET galleryID = ?, addressID = ?, artistName = ?, email = ?, phoneNumber = ? WHERE artistID = ?', [GalleryID, AddressID, ArtistName, Email, PhoneNumber, req.params.artistID], (err, rows) => {
            connection.release();
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Artist WHERE artistID = ?', [req.params.artistID], (err, rows) => {
                        connection.release();
                        if(!err){
                            res.render('editArtist', { rows, alert: `${ArtistName}'s information has been updated.`});
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