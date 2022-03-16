const getConnection = require ('../dbcon.js')

// View Showrooms
exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Showroom', (err, rows) => {
            connection.release();
            if(!err){
                let removedShowroom = req.query.removed;
                res.render('showroom', { rows, removedShowroom });
            }
           console.log(rows);
        });
    });
};