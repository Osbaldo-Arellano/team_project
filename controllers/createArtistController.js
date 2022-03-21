const getConnection = require ('../dbcon.js')

// View available Galleries and Addresses
exports.view = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Artist)); ', (err, galleryRows) => {
            connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Artist)); ', (err, addressRows) => {
                connection.release();
                if(!err){
                    let failure = req.query.failed;
                    res.render('createArtist', { galleryRows, addressRows, failure });
                }
                console.log(galleryRows, addressRows);
            });
        });
    });
};

// Add new artist
exports.form = (req, res) =>{
    getConnection((err, connection) => {
        if(!err){
            let failure = req.query.failed;
            res.render('createArtist', { failure });
        }
    });
};
exports.create = (req, res) =>{
    const {GalleryID, AddressID, ArtistName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Artist SET galleryID = ?, addressID = ?, artistName = ?, email = ?, phoneNumber = ? ',[GalleryID, AddressID, ArtistName, Email, PhoneNumber], (err, rows) => {
            if(!err){
                connection.query('SELECT * FROM Gallery WHERE galleryID IN (SELECT galleryID FROM Gallery EXCEPT (SELECT galleryID FROM Artist)); ', (err, galleryRows) => {
                    connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Artist)); ', (err, addressRows) => {
                        connection.release();
                        if(!err){
                            res.render('createArtist', { alert: `${ArtistName} has been added to the database.`, galleryRows, addressRows});
                        }
                        console.log(galleryRows, addressRows);
                    });
                });
            } else{
                connection.release();
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createArtist?failed=' + failed);
            }
        });
    });
};