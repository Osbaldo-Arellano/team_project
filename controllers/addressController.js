var getConnection = require ('../dbcon.js')

exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Address', (err, rows) => {
            connection.release();
            if(!err){
                res.render('address', { rows });
            }
           console.log(rows);
        });
    });
};
