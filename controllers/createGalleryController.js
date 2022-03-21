const getConnection = require ('../dbcon.js')

// View available Addresses
exports.view = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Gallery)); ', (err, rows) => {
            connection.release();
            if(!err){
                let failure = req.query.failed;
                res.render('createGallery', { rows, failure });
            }
           console.log(rows);
        });
    });
};

// Add new gallery
exports.form = (req, res) =>{
    getConnection((err, connection) => {
        if(!err){
            let failure = req.query.failed;
            res.render('createGallery', { failure });
        }
    });
};
exports.create = (req, res) =>{
    const {AddressID, GalleryName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Gallery SET addressID = ?, galleryName = ?, email = ?, phoneNumber = ? ',[AddressID, GalleryName, Email, PhoneNumber], (err, rows) => {
            if(!err){
                connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Gallery)); ', (err, rows) => {
                    connection.release();
                    if(!err){
                        res.render('createGallery', { alert: `The ${GalleryName} gallery has been created.`, rows });
                    }
                    console.log(rows);
                });
            } else{
                connection.release();
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createGallery?failed=' + failed);
            }
            console.log(rows);
        });
    });
};