const getConnection = require ('../dbcon.js')

// View Artworks
exports.view = (req, res) =>{
    getConnection((err, connection) => {
        connection.query('SELECT * FROM Artwork', (err, rows) => {
            connection.release();
            if(!err){
                let removedArtwork = req.query.removed;
                res.render('artwork', { rows, removedArtwork });
            }
           console.log(rows);
        });
    });
};