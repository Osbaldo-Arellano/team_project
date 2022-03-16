const getConnection = require ('../dbcon.js')

// View Addresses
exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Address', (err, rows) => {
            connection.release();
            if(!err){
                let removedAddress = req.query.removed;
                res.render('address', { rows, removedAddress });
            }
           console.log(rows);
        });
    });
};