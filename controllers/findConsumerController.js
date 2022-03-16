const getConnection = require ('../dbcon.js')

// Find Consumer
exports.findConsumer = (req, res) =>{
    let search = req.body.Search;
    getConnection((err, connection) =>{
        connection.query('SELECT * FROM Consumer WHERE consumerName LIKE ?', ['%' + search + '%'], (err, rows) => {
            connection.release();
            if(!err){
                res.render('consumer', { rows });
            }
           console.log(rows);
        });
    });
};