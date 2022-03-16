const getConnection = require ('../dbcon.js')

// Delete Gallery
exports.delete = (req, res) => {
    getConnection((err, connection) => {
        connection.query('DELETE FROM Gallery WHERE galleryID = ?', [req.params.galleryID], (err, rows) => {
            connection.release();
            if(!err){
                let removedGallery = encodeURIComponent('Gallery successfully removed.');
                res.redirect('/allGalleries?removed=' + removedGallery);
            }
           console.log(rows);
        });
    });
};