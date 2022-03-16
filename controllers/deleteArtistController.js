const getConnection = require ('../dbcon.js')

// Delete Artist
exports.delete = (req, res) => {
    getConnection((err, connection) => {
        connection.query('DELETE FROM Artist WHERE artistID = ?', [req.params.artistID], (err, rows) => {
            connection.release();
            if(!err){
                let removedArtist = encodeURIComponent('Artist successfully removed.');
                res.redirect('/allArtists?removed=' + removedArtist);
            }
           console.log(rows);
        });
    });
};