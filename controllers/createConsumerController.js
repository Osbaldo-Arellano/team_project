const getConnection = require ('../dbcon.js')

// View available Artworks and Addresses
exports.view = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artwork WHERE artworkID IN (SELECT artworkID FROM Artwork EXCEPT (SELECT artworkID FROM Consumer)); ', (err, artworkRows) => {
            connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Consumer)); ', (err, addressRows) => {
                connection.release();
                if(!err){
                    let failure = req.query.failed;
                    res.render('createConsumer', { artworkRows, addressRows, failure });
                }
                console.log(artworkRows, addressRows);
            });
        });
    });
};

// Add new consumer
exports.form = (req, res) =>{
    getConnection((err, connection) => {
        if(!err){
            let failure = req.query.failed;
            res.render('createConsumer', { failure });
        }
    });
};
exports.create = (req, res) =>{
    const {ArtworkID, AddressID, ConsumerName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Consumer SET artworkID = ?, addressID = ?, consumerName = ?, email = ?, phoneNumber = ? ',[ArtworkID, AddressID, ConsumerName, Email, PhoneNumber], (err, rows) => {
            if(!err){
                connection.query('SELECT * FROM Artwork WHERE artworkID IN (SELECT artworkID FROM Artwork EXCEPT (SELECT artworkID FROM Consumer)); ', (err, artworkRows) => {
                    connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Consumer)); ', (err, addressRows) => {
                        connection.release();
                        if(!err){
                            res.render('createConsumer', { alert: `${ConsumerName} has been added to the database.`, artworkRows, addressRows});
                        }
                        console.log(artworkRows, addressRows);
                    });
                });
            } else{
                connection.release();
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createConsumer?failed=' + failed);
            }
        });
    });
};