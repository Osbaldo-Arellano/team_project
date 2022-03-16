const getConnection = require ('../dbcon.js')

// Edit Gallery
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Gallery WHERE galleryID = ?', [req.params.galleryID], (err, rows) => {
            connection.release();
            if(!err){
                res.render('editGallery', { rows });
            }
           console.log(rows);
        });
    });
};

// Update Gallery
exports.update = (req, res) => {
    const {AddressID, GalleryName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Gallery SET addressID = ?, galleryName = ?, email = ?, phoneNumber = ? WHERE galleryID = ?', [AddressID, GalleryName, Email, PhoneNumber, req.params.galleryID], (err, rows) => {
            connection.release();
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Gallery WHERE galleryID = ?', [req.params.galleryID], (err, rows) => {
                        connection.release();
                        if(!err){
                            res.render('editGallery', { rows, alert: `The ${GalleryName} gallery has been updated.`});
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