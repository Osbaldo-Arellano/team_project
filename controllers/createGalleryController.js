var getConnection = require ('../dbcon.js')

// Add new showroom
exports.form = (req, res) =>{
    getConnection((err, connection) => {
        res.render('createGallery');

    });
};

exports.create = (req, res) =>{
    const {AddressID, GalleryName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Gallery SET addressID = ?, galleryName = ?, email = ?, phoneNumber = ? ',[AddressID, GalleryName, Email, PhoneNumber], (err, rows) => {
            connection.release();
            if(!err){
                res.render('createGallery');
            }

        });
    });
};