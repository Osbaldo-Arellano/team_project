const getConnection = require ('../dbcon.js')

// Delete Artwork
exports.delete = (req, res) => {
    getConnection((err, connection) => {
        connection.query('DELETE FROM Artwork WHERE artworkID = ?', [req.params.artworkID], (err, rows) => {
            connection.release();
            if(!err){
                let removedArtwork = encodeURIComponent('Artwork successfully removed.');
                res.redirect('/allArtworks?removed=' + removedArtwork);
            }
           console.log(rows);
        });
    });
};