/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/
const express = require('express');
const mysql = require('./dbcon.js');
const bodyParser = require('body-parser');
const app = express();
const handlebars = require('express-handlebars').create({
        defaultLayout:'app',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

PORT        = 7305;                 // Set a port number at the top so it's easy to change in the future

app.use('/', express.static('public'));

// Routes to display all entries from each table
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
app.use('/allConsumers', consumerRouter);

// Routes for creating new entries
const createShowroomRouter = require ('./routes/createShowroom');
const createGalleryRouter = require ('./routes/createGallery');
const createArtistRouter = require ('./routes/createArtist');
const createArtworkRouter = require ('./routes/createArtwork');
const createAddressRouter = require ('./routes/createAddress');
const createConsumerRouter = require ('./routes/createConsumer');
app.use('/createShowroom', createShowroomRouter);
app.use('/createGallery', createGalleryRouter);
app.use('/createArtist', createArtistRouter);
app.use('/createArtwork', createArtworkRouter);
app.use('/createAddress', createAddressRouter);
app.use('/createConsumer', createConsumerRouter);

// Routes for searching entries
const findShowroomRouter = require ('./routes/findShowroom');
const findGalleryRouter = require ('./routes/findGallery');
const findArtistRouter = require ('./routes/findArtist');
const findArtworkRouter = require ('./routes/findArtwork');
const findAddressRouter = require ('./routes/findAddress');
const findConsumerRouter = require ('./routes/findConsumer');
app.use('/allShowrooms', findShowroomRouter);
app.use('/allGalleries', findGalleryRouter);
app.use('/allArtists', findArtistRouter);
app.use('/allArtworks', findArtworkRouter);
app.use('/allAddresses', findAddressRouter);
app.use('/allConsumers', findConsumerRouter);

// Routes for updating entries
const editShowroomRouter = require ('./routes/editShowroom');
const editGalleryRouter = require ('./routes/editGallery');
const editArtistRouter = require ('./routes/editArtist');
const editArtworkRouter = require ('./routes/editArtwork');
const editAddressRouter = require ('./routes/editAddress');
const editConsumerRouter = require ('./routes/editConsumer');
app.use('/editShowroom', editShowroomRouter);
app.use('/editGallery', editGalleryRouter);
app.use('/editArtist', editArtistRouter);
app.use('/editArtwork', editArtworkRouter);
app.use('/editAddress', editAddressRouter);
app.use('/editConsumer', editConsumerRouter);

// Routes for deleting entries
const deleteShowroomRouter = require ('./routes/deleteShowroom');
const deleteGalleryRouter = require ('./routes/deleteGallery');
const deleteArtistRouter = require ('./routes/deleteArtist');
const deleteArtworkRouter = require ('./routes/deleteArtwork');
const deleteAddressRouter = require ('./routes/deleteAddress');
const deleteConsumerRouter = require ('./routes/deleteConsumer');
app.use('/deleteShowroom', deleteShowroomRouter);
app.use('/deleteGallery', deleteGalleryRouter);
app.use('/deleteArtist', deleteArtistRouter);
app.use('/deleteArtwork', deleteArtworkRouter);
app.use('/deleteAddress', deleteAddressRouter);
app.use('/deleteConsumer', deleteConsumerRouter);


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