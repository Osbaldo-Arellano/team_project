var getConnection = require ('../dbcon.js')

exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Showroom', (err, rows) => {
            connection.release();
            if(!err){
                res.render('showroom', { rows });
            }
           console.log(rows);
        });
    });
};

// Add new showroom
exports.form = (req, res) =>{
    getConnection((err, connection) => {
        res.render('createShowroom');

    });
};


exports.create = (req, res) =>{
    const {GalleryID, ArtistID, RoomNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Showroom SET galleryID = ?, artistID = ?, roomNumber = ? ',[GalleryID, ArtistID, RoomNumber], (err, rows) => {
            connection.release();
            if(!err){
                res.render('createShowroom');
            }

        });
    });
};