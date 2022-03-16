const getConnection = require ('../dbcon.js')

// Add new showroom
exports.form = (req, res) =>{
    getConnection((err, connection) => {
        if(!err){
            let failure = req.query.failed;
            res.render('createShowroom', { failure });
        }
    });
};
exports.create = (req, res) =>{
    const {GalleryID, ArtistID, RoomNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Showroom SET galleryID = ?, artistID = ?, roomNumber = ? ',[GalleryID, ArtistID, RoomNumber], (err, rows) => {
            connection.release();
            if(!err){
                res.render('createShowroom', { alert: `Showroom with room number ${RoomNumber} has been created.`});
            } else{
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createShowroom?failed=' + failed);
            }
        });
    });
};
