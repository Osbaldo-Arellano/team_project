var getConnection = require ('../dbcon.js')

exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Gallery', (err, rows) => {
            connection.release();
            if(!err){
                res.render('gallery', { rows });
            }
           console.log(rows);
        });
    });
};