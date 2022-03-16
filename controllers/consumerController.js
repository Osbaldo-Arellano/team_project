const getConnection = require ('../dbcon.js')

// View Consumers
exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Consumer', (err, rows) => {
            connection.release();
            if(!err){
                let removedConsumer = req.query.removed;
                res.render('consumer', { rows, removedConsumer });            }
           console.log(rows);
        });
    });
};