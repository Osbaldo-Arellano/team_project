const getConnection = require ('../dbcon.js')

// View Galleries
exports.view = (req, res) => {
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Gallery', (err, rows) => {
            connection.release();
            if(!err){
                let removedGallery = req.query.removed;
                res.render('gallery', { rows, removedGallery });
            }
           console.log(rows);
        });
    });
};