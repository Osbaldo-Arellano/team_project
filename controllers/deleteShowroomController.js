const getConnection = require ('../dbcon.js')

// Delete Showroom
exports.delete = (req, res) => {
    getConnection((err, connection) => {
        connection.query('DELETE FROM Showroom WHERE showRoomID = ?', [req.params.showRoomID], (err, rows) => {
            connection.release();
            if(!err){
                let removedShowroom = encodeURIComponent('Showroom successfully removed.');
                res.redirect('/allShowrooms?removed=' + removedShowroom);
            }
           console.log(rows);
        });
    });
};