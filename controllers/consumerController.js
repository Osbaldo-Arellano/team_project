var getConnection = require ('../dbcon.js')

exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Consumer', (err, rows) => {
            connection.release();
            if(!err){
                res.render('consumer', { rows });
            }
           console.log(rows);
        });
    });
};