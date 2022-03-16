const getConnection = require ('../dbcon.js')

// Edit Address
exports.edit = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Address WHERE addressID = ?', [req.params.addressID], (err, rows) => {
            connection.release();
            if(!err){
                res.render('editAddress', { rows });
            }
           console.log(rows);
        });
    });
};

// Update Address
exports.update = (req, res) => {
    const {StreetAddress, City, State, Country} = req.body;
    getConnection((err, connection) => {
        connection.query('UPDATE Address SET streetAddress = ?, city = ?, state = ?, country = ? WHERE addressID = ?', [StreetAddress, City, State, Country, req.params.addressID], (err, rows) => {
            connection.release();
            if(!err){
                getConnection((err, connection) => {
                    connection.query('SELECT * FROM Address WHERE addressID = ?', [req.params.addressID], (err, rows) => {
                        connection.release();
                        if(!err){
                            res.render('editAddress', { rows, alert: `The address has been updated.`});
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