const getConnection = require ('../dbcon.js')

// View Artists
exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artist', (err, rows) => {
            connection.release();
            if(!err){
                let removedArtist = req.query.removed;
                res.render('artist', { rows, removedArtist });
            }
           console.log(rows);
        });
    });
};