var getConnection = require ('../dbcon.js')

exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artist', (err, rows) => {
            connection.release();
            if(!err){
                res.render('artist', { rows });
            }
           console.log(rows);
        });
    });
};