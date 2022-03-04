/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);


PORT        = 7305;                 // Set a port number at the top so it's easy to change in the future

app.use('/', express.static('public'));

// Routes to display all entires from each table
const showroomRouter = require('./routes/showroom');
const galleryRouter = require ('./routes/gallery');
const artworkRouter = require ('./routes/artwork');
const artistRouter = require ('./routes/artist');
const addressRouter = require ('./routes/address');
const consumerRouter = require ('./routes/consumer');


app.use('/allGalleries', galleryRouter);
app.use('/allShowrooms', showroomRouter);
app.use('/allArtworks', artworkRouter);
app.use('/allArtists', artistRouter);
app.use('/allAddresses', addressRouter);
app.use('/allCustomers', consumerRouter);

//Routes for creating new entires 
const createShowroomRouter = require ('./routes/createShowroom');
const createGalleryRouter = require ('./routes/createGallery');
app.use('/createShowroom', createShowroomRouter);
app.use('/createGallery', createGalleryRouter);


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});