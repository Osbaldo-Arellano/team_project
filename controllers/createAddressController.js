const getConnection = require ('../dbcon.js')

// Add new address
exports.form = (req, res) =>{
    getConnection((err, connection) => {
        if(!err){
            let failure = req.query.failed;
            res.render('createAddress', { failure });
        }
    });
};
exports.create = (req, res) =>{
    const {StreetAddress, City, State, Country} = req.body;
    getConnection((err, connection) => {
        connection.query('INSERT INTO Address SET streetAddress = ?, city = ?, state = ?, country = ? ',[StreetAddress, City, State, Country], (err, rows) => {
            connection.release();
            if(!err){
                res.render('createAddress', { alert: 'Address added successfully.' });
            } else{
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createAddress?failed=' + failed);
            }
        });
    });
};