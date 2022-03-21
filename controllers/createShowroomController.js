const getConnection = require ('../dbcon.js')

// View available Galleries and Artists
exports.view = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Showroom)); ', (err, galleryRows) => {
            connection.query('SELECT * FROM Artist WHERE artistID IN (SELECT artistID FROM Artist EXCEPT (SELECT artistID FROM Showroom)); ', (err, artistRows) => {
                connection.release();
                if(!err){
                    let failure = req.query.failed;
                    res.render('createShowroom', { galleryRows, artistRows, failure });
                }
                console.log(galleryRows, artistRows);
            });
        });
    });
};

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
            if(!err){
                connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Showroom)); ', (err, galleryRows) => {
                    connection.query('SELECT * FROM Artist WHERE artistID IN (SELECT artistID FROM Artist EXCEPT (SELECT artistID FROM Showroom)); ', (err, artistRows) => {
                        connection.release();
                        if(!err){
                            res.render('createShowroom', { alert: `Showroom with room number ${RoomNumber} has been created.`, galleryRows, artistRows});
                        }
                        console.log(galleryRows, artistRows);
                    });
                });
            } else{
                connection.release();
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createShowroom?failed=' + failed);
            }
        });
    });
};