const getConnection = require ('../dbcon.js')

// Edit Consumer
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Consumer WHERE consumerID = ?', [req.params.consumerID], (err, rows) => {
            connection.query('SELECT * FROM Artwork WHERE artworkID IN (SELECT artworkID FROM Artwork EXCEPT (SELECT artworkID FROM Consumer)); ', (err, artworkRows) => {
                connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Consumer)); ', (err, addressRows) => {
                    if(!err){
                        connection.release();
                        let failure = req.query.failed;
                        res.render('editConsumer', { rows, artworkRows, addressRows, failure });
                    }
                    console.log(rows);
                });
            });
        });
    });
};

// Update Consumer
exports.update = (req, res) => {
    const {ArtworkID, AddressID, ConsumerName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Consumer SET artworkID = ?, addressID = ?, consumerName = ?, email = ?, phoneNumber = ? WHERE consumerID = ?', [ArtworkID, AddressID, ConsumerName, Email, PhoneNumber, req.params.consumerID], (err, rows) => {
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Consumer WHERE consumerID = ?', [req.params.consumerID], (err, rows) => {
                        connection.query('SELECT * FROM Artwork WHERE artworkID IN (SELECT artworkID FROM Artwork EXCEPT (SELECT artworkID FROM Consumer)); ', (err, artworkRows) => {
                            connection.query('SELECT * FROM Address WHERE addressID IN (SELECT addressID FROM Address EXCEPT (SELECT addressID FROM Consumer)); ', (err, addressRows) => {
                                if(!err){
                                    connection.release();
                                    res.render('editConsumer', { rows, alert: `${ConsumerName} has been updated.`, artworkRows, addressRows});
                                }
                                console.log(artworkRows, addressRows);
                            });
                        });
                    });
                });
            } else {
                connection.release();
                let failed = encodeURIComponent('There was an error editing the database entry. Please try again.');
                res.redirect('/editConsumer/' + req.params.consumerID + '?failed=' + failed);
            }
           console.log(rows);
        });
    });
};