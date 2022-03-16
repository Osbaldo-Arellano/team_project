const getConnection = require ('../dbcon.js')

// Find Artwork
exports.findArtwork = (req, res) =>{
    let search = req.body.Search;
    getConnection((err, connection) =>{
        connection.query('SELECT * FROM Artwork WHERE artworkName LIKE ?', ['%' + search + '%'], (err, rows) => {
            connection.release();
            if(!err){
                res.render('artwork', { rows });
            }
           console.log(rows);
        });
    });
};