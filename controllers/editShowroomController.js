const getConnection = require ('../dbcon.js')

// Edit Showroom
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Showroom WHERE showRoomID = ?', [req.params.showRoomID], (err, rows) => {
            connection.release();
            if(!err){
                res.render('editShowroom', { rows });
            }
           console.log(rows);
        });
    });
};

// Update Showroom
exports.update = (req, res) => {
    const {GalleryID, ArtistID, RoomNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Showroom SET galleryID = ?, artistID = ?, roomNumber = ? WHERE showRoomID = ?', [GalleryID, ArtistID, RoomNumber, req.params.showRoomID], (err, rows) => {
            connection.release();
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Showroom WHERE showRoomID = ?', [req.params.showRoomID], (err, rows) => {
                        connection.release();
                        if(!err){
                            res.render('editShowroom', { rows, alert: `The showroom has been updated.`});
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