const getConnection = require ('../dbcon.js')

// Delete Address
exports.delete = (req, res) => {
    getConnection((err, connection) => {
        connection.query('DELETE FROM Address WHERE addressID = ?', [req.params.addressID], (err, rows) => {
            connection.release();
            if(!err){
                let removedAddress = encodeURIComponent('Address successfully removed.');
                res.redirect('/allAddresses?removed=' + removedAddress);
            }
           console.log(rows);
        });
    });
};