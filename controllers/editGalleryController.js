const getConnection = require ('../dbcon.js')

// Edit Gallery
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Gallery WHERE galleryID = ?', [req.params.galleryID], (err, rows) => {
            connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Gallery)); ', (err, addressRows) => {
                if(!err){
                    connection.release();
                    let failure = req.query.failed;
                    res.render('editGallery', { rows, addressRows, failure });
                }
                console.log(rows);
            });
        });
    });
};

// Update Gallery
exports.update = (req, res) => {
    const {AddressID, GalleryName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Gallery SET addressID = ?, galleryName = ?, email = ?, phoneNumber = ? WHERE galleryID = ?', [AddressID, GalleryName, Email, PhoneNumber, req.params.galleryID], (err, rows) => {
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Gallery WHERE galleryID = ?', [req.params.galleryID], (err, rows) => {
                        connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Gallery)); ', (err, addressRows) => {
                            if(!err){
                                connection.release();
                                res.render('editGallery', { rows, alert: `The ${GalleryName} gallery has been updated.`, addressRows});
                            }
                            console.log(addressRows);
                        });
                    });
                });
            } else {
                connection.release();
                let failed = encodeURIComponent('There was an error editing the database entry. Please try again.');
                res.redirect('/editGallery/' + req.params.galleryID + '?failed=' + failed);
            }
           console.log(rows);
        });
    });
};