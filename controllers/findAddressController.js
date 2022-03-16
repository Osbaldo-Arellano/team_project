const getConnection = require ('../dbcon.js')

// Find Address
exports.findAddress = (req, res) =>{
    let search = req.body.Search;
    getConnection((err, connection) =>{
        connection.query('SELECT * FROM Address WHERE streetAddress LIKE ?', ['%' + search + '%'], (err, rows) => {
            connection.release();
            if(!err){
                res.render('address', { rows });
            }
           console.log(rows);
        });
    });
};