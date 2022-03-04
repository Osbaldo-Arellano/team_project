var getConnection = require ('../dbcon.js')

exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artwork', (err, rows) => {
            connection.release();
            if(!err){
                res.render('artwork', { rows });
            }
           console.log(rows);
        });
    });
};