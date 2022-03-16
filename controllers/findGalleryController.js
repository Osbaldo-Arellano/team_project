const getConnection = require ('../dbcon.js')

// Find Gallery
exports.findGallery = (req, res) =>{
    let search = req.body.Search;
    getConnection((err, connection) =>{
        connection.query('SELECT * FROM Gallery WHERE galleryName LIKE ?', ['%' + search + '%'], (err, rows) => {
            connection.release();
            if(!err){
                res.render('gallery', { rows });
            }
           console.log(rows);
        });
    });
};