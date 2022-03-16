const getConnection = require ('../dbcon.js')

// Edit Consumer
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Consumer WHERE consumerID = ?', [req.params.consumerID], (err, rows) => {
            connection.release();
            if(!err){
                res.render('editConsumer', { rows });
            }
           console.log(rows);
        });
    });
};

// Update Consumer
exports.update = (req, res) => {
    const {ArtworkID, AddressID, ConsumerName, Email, PhoneNumber} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Consumer SET artworkID = ?, addressID = ?, consumerName = ?, email = ?, phoneNumber = ? WHERE consumerID = ?', [ArtworkID, AddressID, ConsumerName, Email, PhoneNumber, req.params.consumerID], (err, rows) => {
            connection.release();
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Consumer WHERE consumerID = ?', [req.params.consumerID], (err, rows) => {
                        connection.release();
                        if(!err){
                            res.render('editConsumer', { rows, alert: `${ConsumerName} has been updated.`});
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