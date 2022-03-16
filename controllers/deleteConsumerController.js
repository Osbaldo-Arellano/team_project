const getConnection = require ('../dbcon.js')

// Delete Consumer
exports.delete = (req, res) => {
    getConnection((err, connection) => {
        connection.query('DELETE FROM Consumer WHERE consumerID = ?', [req.params.consumerID], (err, rows) => {
            connection.release();
            if(!err){
                let removedConsumer = encodeURIComponent('Consumer successfully removed.');
                res.redirect('/allConsumers?removed=' + removedConsumer);
            }
           console.log(rows);
        });
    });
};