const getConnection = require ('../dbcon.js')

// Find Artist
exports.findArtist = (req, res) =>{
    let search = req.body.Search;
    getConnection((err, connection) =>{
        connection.query('SELECT * FROM Artist WHERE artistName LIKE ?', ['%' + search + '%'], (err, rows) => {
            connection.release();
            if(!err){
                res.render('artist', { rows });
            }
           console.log(rows);
        });
    });
};