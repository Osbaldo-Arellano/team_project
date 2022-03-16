const getConnection = require ('../dbcon.js')

// Find Showroom
exports.findShowroom = (req, res) =>{
    let search = req.body.Search;
    getConnection((err, connection) =>{
        connection.query('SELECT * FROM Showroom WHERE roomNumber = ?', [search], (err, rows) => {
            connection.release();
            if(!err){
                res.render('showroom', { rows });
            }
           console.log(rows);
        });
    });
};