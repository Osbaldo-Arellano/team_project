const getConnection = require ('../dbcon.js')

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
            connection.release();
            if(!err){
                res.render('createConsumer', { alert: `${ConsumerName} has been added to the database.` });
            } else{
                let failed = encodeURIComponent('There was an error adding to the database. Please try again.');
                res.redirect('/createConsumer?failed=' + failed);
            }
        });
    });
};